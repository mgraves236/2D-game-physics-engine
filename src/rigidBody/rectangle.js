import {RigidShape} from "./rigidShape.js";
import {Vector} from "../lib/vector.js";
import {screen, map} from "../engineCore/screen.js";
import {CollisionInfo} from "../lib/collisionInfo.js";

/***
 * Base class for rectangle shape rigid objects
 * @class Rectangle
 */
export class Rectangle extends RigidShape {
    /**
     *
     * @param mass
     * @param center
     * @param width
     * @param height
     */
    constructor(mass, center, width, height, angle=0) {
        super(center, angle);
        this.type = "rectangle";
        this.width = width;
        this.height = height;
        this.mass = mass;
        this.boundsRadius = Math.sqrt(this.width * this.width + this.height * this.height) / 2;
        /**
         * Array to store vertex positions of the rectangle
         * @type {*[]}
         */
        this.vertex = [];
        /**
         * Array to store the face normal vectors
         * @type {Vector[]}
         */
        this.faceNormal = [];

        // compute vertex positions
        this.vertex[0] = new Vector(this.massCenter.x - this.width / 2,
            this.massCenter.y - this.height / 2, 0, 0, false);
        this.vertex[1] = new Vector(this.massCenter.x + this.width / 2,
            this.massCenter.y - this.height / 2, 0, 0, false);
        this.vertex[2] = new Vector(this.massCenter.x + this.width / 2,
            this.massCenter.y + this.height / 2, 0, 0, false);
        this.vertex[3] = new Vector(this.massCenter.x - this.width / 2,
            this.massCenter.y + this.height / 2, 0, 0, false);

        // compute the face normal vectors
        this.faceNormal[0] = this.vertex[1].subtract(this.vertex[2]);
        this.faceNormal[1] = this.vertex[2].subtract(this.vertex[3]);
        this.faceNormal[2] = this.vertex[3].subtract(this.vertex[0]);
        this.faceNormal[3] = this.vertex[0].subtract(this.vertex[1]);
        this.faceNormal.forEach(vector => vector.normalize());

        this.rotate(0, this.massCenter);
    }

    rotate (angle) {
        this.angle += angle;
        // console.log(this.angle)
        for (let i = 0; i < this.vertex.length; i++) {
            this.vertex[i] = this.vertex[i].rotate(angle, this.massCenter);
        }
        // compute the face normal vectors
        this.faceNormal[0] = this.vertex[1].subtract(this.vertex[2]);
        this.faceNormal[1] = this.vertex[2].subtract(this.vertex[3]);
        this.faceNormal[2] = this.vertex[3].subtract(this.vertex[0]);
        this.faceNormal[3] = this.vertex[0].subtract(this.vertex[1]);
        this.faceNormal.forEach(vector => vector.normalize());

    }

    displayBounds() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.translate(this.massCenter.x, this.massCenter.y);
        ctx.rotate(this.angle);
        ctx.strokeRect(-this.width / 2, - this.height / 2, this.width, this.height);
        ctx.restore();
        // draw the face normal vectors
        ctx.translate(this.massCenter.x, this.massCenter.y);
        ctx.rotate(this.angle);
        this.faceNormal.forEach(item => item.draw('yellow'));
        ctx.restore();
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        this.displayBounds();
        ctx.restore();
        // console.log(this.faceNormal);
    }

    // Collision detection
    // Separating Axis Theorem - Support Points
    // An Efficient SAT Algorithm
    /**
     *
     * @param {Rectangle} otherShape
     * @param collisionInfo
     * @return {boolean}
     */
    collisionTest (otherShape, collisionInfo) {
        let status;
        if (otherShape.type === "circle") {
            status = false;
        } else {
            status = false;
           status = this.collidedRectRect(this, otherShape, collisionInfo);
        }
        return status;
    }

    /**
     * Compute a support point based on dir (find a support point for any face normal)
     * @param {Vector} dir Negated face normal direction
     * @param {Vector} ptOnEdge A position on the given edge (e.g. a vertex)
     * @return {{ supportPoint: Vector, supportPointDist: number}}
     */
    findSupportPoint (dir, ptOnEdge) {
        // vector from vertices to ptOnEdge; it will be projected on dir
        let vToEdge;
        let projection;
        // console.log(dir)
        // console.log(ptOnEdge)
        // console.log(ptOnEdge)
        // initialize the computed results
        let support = { supportPointDist: -9999999,
                                supportPoint: null}
        // loop through all the vertices
        for (let i = 0; i < this.vertex.length; i++) {
            // this.vertex[i].draw('purple')
            vToEdge = this.vertex[i].subtract(ptOnEdge);
            // console.log(vToEdge)
            vToEdge.x0 = ptOnEdge.x;
            vToEdge.y0 = ptOnEdge.y;
            vToEdge.x = vToEdge.x + vToEdge.x0;
            vToEdge.y = vToEdge.y + vToEdge.y0;
            // vToEdge.draw('#ffffff')
            projection = vToEdge.get().dot(dir.get());
            // console.log(projection)
            // find the longest distance with the given edge
            // (the furthest vertex position)
            // dir is -n direction thus the distance will be positive
            // if all distances are negative, all vertices are in front of input dir and a support point does not exist, i.e. two rectangles do not collide
            if ((projection > 0) &&
                (projection > support.supportPointDist)) {
                support.supportPoint = this.vertex[i].copy();
                support.supportPointDist = projection;
                // console.log('--')
                // console.log(support)

            }
        }
        // console.log(support)
        return support;
    }

    /**
     * Find the axis of the least penetration
     * based on the support point with the least support point distant
     * @param {Rectangle} otherRect
     * @param collisionInfo
     * @return {boolean} hasSupport
     */
    findAxisLeastPenetration(otherRect, collisionInfo) {
        // collision between shape A and shape B (both are rectangles)
        let n;
        /**
         * @type {Vector}
         */
        let supportPoint;
        let bestDistance = 999999;
        let bestIndex = null;
        let hasSupport = true;
        let support;
        let i = 0;
        // loop through the four face normals, find the corresponding
        // support point and support point distance and record the shortest distance
        // if a support point is not defined for any of the face normals, then the loops stops and the two rectangles do not collide
        while ((hasSupport) && (i < this.faceNormal.length)) {
            // console.log('next')
            // retrieve a face normal from shape A
            n = this.faceNormal[i].copy();
            // use -n as direction and the vertex on edge i as point on edge
            let dir = n.copy()
            // dir.changeDir();
            dir.mult(-1);
            // dir.x0 = this.massCenter.x;
            // dir.y0 = this.massCenter.y;
            // dir.x = dir.x + dir.x0;
            // dir.y = dir.y + dir.y0;
            // dir.draw('black')
            let ptOnEdge = this.vertex[i];
            // ptOnEdge.draw('green')
            // find the support point on B
            //the point has the longest distance with edge i
            support = otherRect.findSupportPoint(dir, ptOnEdge);
            // console.log('SUPPORT')
            // console.log(support.supportPointDist)
            // console.log(bestDistance)
            hasSupport = (support.supportPoint !== null);
            // get the shortest support point depth
            if ((hasSupport) && (support.supportPointDist < bestDistance)) {
                // console.log('in')
                bestDistance = support.supportPointDist;
                bestIndex = i;
                // console.log('########')
                // console.log(this.faceNormal[i])
                // console.log(support)
                // console.log('----########----')
                supportPoint = support.supportPoint;
            }
            i = i + 1;
        }
        supportPoint.draw('blue')
        if (hasSupport) {
            // // all four directions have support point
            let bestVec = this.faceNormal[bestIndex].copy();
            let x = bestVec.x - bestVec.x0;
            x = x * bestDistance;
            let y = bestVec.y - bestVec.y0;
            y = y * bestDistance;
            bestVec.x = x;
            bestVec.y = y;
            // bestVec.mult(-bestDistance)
            // bestVec.draw('yellow')

            let s = supportPoint.copy();
            // s.draw('orange')
            // this.support.supportPoint.draw('green')
            s.add(bestVec);
            s.draw('green')
            // console.log(this.faceNormal[bestIndex])
            // console.log(bestIndex)
            collisionInfo.setInfo(bestDistance,
                this.faceNormal[bestIndex].copy(), s);
        }
        return hasSupport;
    }

    /**
     * Compute the axis of lest penetration and choose smaller of the two results
     * @param {Rectangle} r1
     * @param {Rectangle}   r2
     * @param collisionInfo
     * @return {boolean}
     */
    collidedRectRect (r1, r2, collisionInfo) {
        let status1;
        let status2;
        /**
         * @type {CollisionInfo}
         */
        let collisionInfoR1 = new CollisionInfo();
        /**
         * @type {CollisionInfo}
         */
        let collisionInfoR2 = new CollisionInfo();
        // find axis of separation for both rectangles
        status1 = r1.findAxisLeastPenetration(r2, collisionInfoR1);
        // console.log(collisionInfoR1)
        if (status1) {
            status2 = r2.findAxisLeastPenetration(r1, collisionInfoR2);
            if (status2) {
                // choose shorter normal as the normal of the collision
                console.log(collisionInfoR1.depth)
                console.log(collisionInfoR2.depth)
                if (collisionInfoR1.depth <= collisionInfoR2.depth) {
                    console.log('R1 smaller')
                    let depthVec = collisionInfoR1.normal.copy();
                    // let x = depthVec.x - depthVec.x0;
                    // x = x * collisionInfoR1.depth;
                    // let y = depthVec.y - depthVec.y0;
                    // y = y * collisionInfoR1.depth;
                    // depthVec.x = x;
                    // depthVec.y = y;
                    depthVec.mult(collisionInfoR1.depth)
                    depthVec.draw('yellow')

                    let s = new Vector(collisionInfoR1.start.x - depthVec.x, collisionInfoR1.start.y - depthVec.y, 0, 0, false);
                    collisionInfo.setInfo(collisionInfoR1.depth,
                        collisionInfoR1.normal, s)
                } else {
                    let s = new Vector(collisionInfoR2.start.x, collisionInfoR2.start.y,0, 0, false);
                    collisionInfo.setInfo(collisionInfoR2.depth,
                        collisionInfoR2.normal, s)
                }
            }
        }
        return status1 && status2;
    }

}
