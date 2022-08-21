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

        this.vertexRemapped = [];
        for (let i = 0; i < this.vertex.length; i++) {
            this.vertexRemapped[i] = new Vector(this.vertex[i].x, map(this.vertex[i].y), 0, 0, false);
        }

        this.support = { supportPointDist: -9999999,
            supportPoint: null};
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
        // initialize the computed results
        // let tmpSupport = { supportPointDist: -9999999,
        //                     supportPoint: null}
        this.support = { supportPointDist: -9999999,
                                supportPoint: null}
        // loop through all the vertices
        for (let i = 0; i < this.vertex.length; i++) {
            vToEdge = this.vertexRemapped[i].subtract(ptOnEdge);
            projection = vToEdge.get().dot(dir.get());
            // find the longest distance with the given edge
            // (the furthest vertex position)
            // dir is -n direction thus the distance will be positive
            // if all distances are negative, all vertices are in front of input dir and a support point does not exist, i.e. two rectangles do not collide
            if ((projection > 0) &&
                (projection > this.support.supportPointDist)) {
                this.support.supportPoint = this.vertex[i].copy();
                this.support.supportPoint.draw('green')
                this.support.supportPointDist = projection;
            }
        }
        return this.support;
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
        let i = 0;
        // loop through the four face normals, find the corresponding
        // support point and support point distance and record the shortest distance
        // if a support point is not defined for any of the face normals, then the loops stops and the two rectangles do not collide
        while ((hasSupport) && (i < this.faceNormal.length)) {
            // retrieve a face normal from shape A
            n = this.faceNormal[i].copy();
            // use -n as direction and the vertex on edge i as point on edge
            let dir = n.changeDir();
            let ptOnEdge = this.vertexRemapped[i];
            // find the support point on B
            //the point has the longest distance with edge i
            this.support = otherRect.findSupportPoint(dir, ptOnEdge);
            hasSupport = (this.support.supportPoint !== null);
            // get the shortest support point depth
            if ((hasSupport) && (this.support.supportPointDist < bestDistance)) {
                bestDistance = this.support.supportPointDist;
                bestIndex = i;
                supportPoint = this.support.supportPoint;
            }
            i = i + 1;
        }
        if (hasSupport) {
            // // all four directions have support point
            let bestVec = this.faceNormal[bestIndex].copy();
            let x = bestVec.x - bestVec.x0;
            x = x * bestDistance;
            let y = bestVec.y - bestVec.y0;
            y = y * bestDistance;
            bestVec.x = x;
            bestVec.y = y;
            let s = supportPoint.copy();
            s.add(bestVec);
            collisionInfo.setInfo(bestDistance,
                this.faceNormal[bestIndex], s);
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
                if (collisionInfoR1.depth < collisionInfoR2.depth) {
                    let depthVec = collisionInfoR1.normal.copy();
                    let x = depthVec.x - depthVec.x0;
                    x = x * collisionInfoR1.depth;
                    let y = depthVec.y - depthVec.y0;
                    y = y * collisionInfoR1.depth;
                    depthVec.x = x;
                    depthVec.y = y;
                    let s = new Vector(collisionInfoR1.start.x - depthVec.x, collisionInfoR1.start.y- depthVec.y, 0, 0, false);
                    collisionInfo.setInfo(collisionInfoR1.depth,
                        collisionInfoR1.normal, s)
                } else {
                    let s = new Vector(collisionInfoR2.start.x, map(collisionInfoR2.start.y),0, 0, false);
                    collisionInfo.setInfo(collisionInfoR2.depth,
                        collisionInfoR2.normal, s)
                }
            }
        }
        return status1 && status2;
    }

}
