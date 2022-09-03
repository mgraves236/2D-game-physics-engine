import {RigidShape} from "./rigidShape.js";
import {Vector} from "../lib/vector.js";
import {screen} from "../engineCore/screen.js";
import {CollisionInfo} from "../lib/collisionInfo.js";

/***
 * Base class for triangle shape rigid objects
 * @class Triangle
 */
export class Triangle extends RigidShape {
    /**
     *
     * @param mass
     * @param center
     * @param width
     * @param height
     * @param angle
     */
    constructor(mass, center, width, height, angle= 0) {
        super(center, mass, angle);
        this.type = "triangle";
        // triangle base
        this.width = width;
        this.height = height;
        let area = 1 / 2 * this.width * this.height;
        let c = Math.sqrt(this.width * this.width / 4 + this.height * this.height);
        this.boundsRadius = c * c * c / (4 * area);
        /**
         * Array to store vertex positions of the triangle
         * @type {Vector[]}
         */
        this.vertex = [];
        /**
         * Array to store the face normal vectors
         * @type {Vector[]}
         */
        this.faceNormal = [];

        // compute vertex positions
        this.computeVertex();

        // compute the face normal vectors
        this.computeFaceNormal();
        this.updateInertia();
    }

    computeVertex() {
        this.vertex[0] = new Vector(this.massCenter.x,
            this.massCenter.y - this.height / 2);
        this.vertex[1] = new Vector(this.massCenter.x + this.width / 2,
            this.massCenter.y + this.height / 2);
        this.vertex[2] = new Vector(this.massCenter.x - this.width / 2,
            this.massCenter.y + this.height / 2);
        this.rotate(this.angle);
    }

    computeFaceNormal () {
        this.faceNormal[0] = this.vertex[0].subtract(this.vertex[2]);
        let faceTemp = this.faceNormal[0].copy();
        this.faceNormal[0] = new Vector(faceTemp.y, -faceTemp.x)
        this.faceNormal[1] = this.vertex[0].subtract(this.vertex[1]);
        faceTemp = this.faceNormal[1].copy();
        this.faceNormal[1] = new Vector(-faceTemp.y, +faceTemp.x)
        this.faceNormal[2] = this.vertex[1].subtract(this.vertex[2]);
        faceTemp = this.faceNormal[2].copy();
        this.faceNormal[2] = new Vector(-faceTemp.y, +faceTemp.x)

        for (let i = 0; i < this.faceNormal.length; i++) {
            this.faceNormal[i] = this.faceNormal[i].normalize();
        }
    }

    rotate (angle) {
        for (let i = 0; i < this.vertex.length; i++) {
            this.vertex[i] = this.vertex[i].rotate(angle, this.massCenter);
        }
        // compute the face normal vectors
        this.computeFaceNormal();
    }

    displayBounds() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.strokeStyle = 'red';

        // ctx.rotate(this.angle);
        ctx.beginPath();
        // ctx.moveTo(0, - this.height / 2);
        // ctx.lineTo(this.width / 2, this.height / 2)
        // ctx.lineTo(- this.width / 2, this.height / 2)
        // ctx.lineTo(0, - this.height / 2);
        ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
        ctx.lineTo(this.vertex[1].x, this.vertex[1].y)
        ctx.lineTo(this.vertex[2].x, this.vertex[2].y)
        ctx.lineTo(this.vertex[0].x, this.vertex[0].y);
        ctx.stroke();
        ctx.closePath();
        ctx.translate(this.massCenter.x, this.massCenter.y);
        this.faceNormal.forEach(item => item.draw('yellow'));
        ctx.restore();
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        this.displayBounds();
        ctx.restore();
    }

    updateInertia() {
        super.updateInertia();
        if (this.massInverse === 0) {
            this.inertia = 0;
        } else {
            // inertia = mass * (2 * height * width^3) / 12
            const value = 12;
            this.inertia = this.mass *
                (2 * this.height * this.width * this.width * this.width) / value;
            this.inertia = 1 / this.inertia; // wtf??
        }
    }

    // Collision detection
    collisionTest (otherShape, collisionInfo) {
        let status;
        if (otherShape.type === "circle") {
            status = this.collidedTrianCirc(otherShape, collisionInfo);
        } else {
            status = this.collidedTrianTrianRect(this, otherShape, collisionInfo);
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
        let support = { supportPointDist: -9999999,
            supportPoint: null}
        // loop through all the vertices
        for (let i = 0; i < this.vertex.length; i++) {
            vToEdge = this.vertex[i].subtract(ptOnEdge);
            projection = vToEdge.dot(dir);
            // find the longest distance with the given edge
            // (the furthest vertex position)
            // dir is -n direction thus the distance will be positive
            // if all distances are negative, all vertices are in front of input dir and a support point does not exist, i.e. two rectangles do not collide
            if ((projection > 0) &&
                (projection > support.supportPointDist)) {
                support.supportPoint = this.vertex[i].copy();
                support.supportPointDist = projection;
            }
        }
        return support;
    }

    /**
     * Find the axis of the least penetration
     * based on the support point with the least support point distant
     * @param otherShape
     * @param collisionInfo
     * @return {boolean} hasSupport
     */
    findAxisLeastPenetration(otherShape, collisionInfo) {
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
            // retrieve a face normal from shape A
            n = this.faceNormal[i].copy();
            // use -n as direction and the vertex on edge i as point on edge
            let dir = n.scale(-1);
            let ptOnEdge = this.vertex[i].copy();
            // find the support point on B
            //the point has the longest distance with edge i
            support = otherShape.findSupportPoint(dir, ptOnEdge);
            hasSupport = (support.supportPoint !== null);
            // get the shortest support point depth
            if ((hasSupport) && (support.supportPointDist < bestDistance)) {
                bestDistance = support.supportPointDist;
                bestIndex = i;
                supportPoint = support.supportPoint;
            }
            i = i + 1;
        }
        if (hasSupport) {
            // // all four directions have support point
            let bestVec = this.faceNormal[bestIndex].scale(bestDistance);
            collisionInfo.setInfo(bestDistance,
                this.faceNormal[bestIndex].copy(), supportPoint.add(bestVec));
        }
        return hasSupport;
    }

    /**
     * Compute the axis of lest penetration and choose smaller of the two results
     * @param {Triangle} r1
     * @param {Triangle || Rectangle} r2
     * @param {CollisionInfo} collisionInfo
     * @return {boolean}
     */
    collidedTrianTrianRect (r1, r2, collisionInfo) {
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
        if (status1) {
            status2 = r2.findAxisLeastPenetration(r1, collisionInfoR2);
            if (status2) {
                if (collisionInfoR1.depth < collisionInfoR2.depth) {
                    let depthVec = collisionInfoR1.normal.scale(collisionInfoR1.depth);
                    collisionInfo.setInfo(collisionInfoR1.depth, collisionInfoR1.normal, collisionInfoR1.start.subtract(depthVec));
                } else {
                    collisionInfo.setInfo(collisionInfoR2.depth, collisionInfoR2.normal.scale(-1), collisionInfoR2.start);
                }
            }
        }
        return status1 && status2;
    }

    collidedTrianCirc (otherCirc, collisionInfo) {
        // compute the nearest edge
        // compute perpendicular distances between circle center to each of the edges of the rectangle
        // i.e. project vector created from subtracting vertex from circle center onto each of the face normals
        let inside = true;
        let bestDistance = -999999;
        let nearestEdge;
        let circLoc = otherCirc.massCenter.copy();
        /**
         * @type {Vector}
         */
        let normal;

        for (let i = 0; i < this.vertex.length; i++) {
            // find the nearest face for the center of the circle
            let v = circLoc.subtract(this.vertex[i]);
            let projection = v.dot(this.faceNormal[i]);

            if (projection > 0) {
                // if the center of the circle is outside the rectangle
                bestDistance = projection;
                nearestEdge = i;
                inside = false;
                break;
                // rectangle difference - no break
            }
            if (projection > bestDistance) {
                bestDistance = projection;
                nearestEdge = i;
            }
        }

        if(!inside) {
            // if vector v1 between circle center and edge vertex is in the opposite direction of the edge direction v2
            // -- dot product of these two vectors is negative -- circle center is in R1 region
            // collision occurs when the length of v1 is less than the circle radius
            // v1 is from left vertex of face to center of circle
            // v2 is from left vertex of face to right vertex of face

            let v1 = circLoc.subtract(this.vertex[nearestEdge]);
            let v2 = this.vertex[(nearestEdge + 1) % this.vertex.length].subtract(this.vertex[nearestEdge]);
            let dot = v1.dot(v2);
            if (dot < 0) { // region R1
                // the center of circle is in corner region of vertex[nearestEdge]
                let distance = v1.mag();
                // compare distance with radius
                if (distance > otherCirc.height) {
                    return false;
                }
                normal = v1.normalize();
                let radiusVec = normal.scale(-otherCirc.height);
                collisionInfo.setInfo(otherCirc.height - distance, normal, circLoc.add(radiusVec));

            } else {  // R2

                // the center of circle is in corner region of vertex[nearestEdge+1]
                // v1 is from right vertex of face to center of circle
                // v2 is from right vertex of face to left vertex of face
                v1 = circLoc.subtract(this.vertex[(nearestEdge + 3) % this.vertex.length]); // rectangle difference - nearestEdge + 3
                v2 = v2.scale(-1);
                let dot = v1.dot(v2);
                if (dot > 0) {

                    let distance = v1.mag();
                    // compare distance with radius
                    if (distance > otherCirc.height) {
                        // return false; rectangle difference
                    }
                    normal = v1.normalize();
                    let radiusVec = normal.scale(-otherCirc.height);

                    collisionInfo.setInfo(otherCirc.height - distance,
                        normal, circLoc.add(radiusVec));
                } else {
                    // the center of circle is in face region of face[nearestEdge]
                    if (bestDistance < otherCirc.height) {
                        let radiusVec = this.faceNormal[nearestEdge].scale(otherCirc.height);
                        collisionInfo.setInfo(otherCirc.height - bestDistance, this.faceNormal[nearestEdge].copy(), circLoc.subtract(radiusVec));
                    } else {
                        return false;
                    }
                }
            }
        } else {
            // if center is inside
            // vertex-to-center vectors will be in opposite directions of their corresponding face normal
            // projected length will be negative, best distance is the one with lest negative value
            let radiusVec = this.faceNormal[nearestEdge].scale(otherCirc.height);
            collisionInfo.setInfo(otherCirc.height - bestDistance, this.faceNormal[nearestEdge].copy(), circLoc.subtract(radiusVec));
        }
        return true;
    }
}