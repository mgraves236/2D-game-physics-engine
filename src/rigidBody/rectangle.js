import {RigidShape} from "./rigidShape.js";
import {Vector} from "../lib/vector.js";
import {screen} from "../engineCore/screen.js";
import {CollisionInfo} from "../lib/collisionInfo.js";
import {Circle} from "./circle.js";

/***
 * Base class for rectangle shape rigid objects
 * @class Rectangle
 */
export class Rectangle extends RigidShape {
    /**
     * Constructor of a Rectangle object
     * @param {number} mass Mass of a Rectangle object
     * @param {Vector} center Mass center of a Rectangle object
     * @param {number} width Width of a Rectangle object
     * @param {number} height Height of a Rectangle object
     * @param {number} angle Angle in radians of a Rectangle object axis to global (canvas) x-axis
     * @param {number} friction Rectangle friction
     * @param {number} restitution Rectangle restitution (bounciness) (how much energy is preserved after collision)
     * @param {boolean} gravity consider the Rectangle when applying gravity
     * @param {string} info additional info
     */
    constructor(mass, center, width, height, angle= 0, friction = 0, restitution = 0, gravity = true, info ="") {
        super(center, mass, angle, friction, restitution, gravity, info);
        this.type = "rectangle";
        this.width = width;
        this.height = height;
        this.boundsRadius = Math.sqrt(this.width * this.width + this.height * this.height) / 2;
        /**
         * Array to store vertex positions of the rectangle
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

    /**
     * Compute Rectangle vertices
     */
    computeVertex() {
        this.vertex[0] = new Vector(this.massCenter.x - this.width / 2,
            this.massCenter.y - this.height / 2);
        this.vertex[1] = new Vector(this.massCenter.x + this.width / 2,
            this.massCenter.y - this.height / 2);
        this.vertex[2] = new Vector(this.massCenter.x + this.width / 2,
            this.massCenter.y + this.height / 2);
        this.vertex[3] = new Vector(this.massCenter.x - this.width / 2,
            this.massCenter.y + this.height / 2);
        this.rotate(this.angle);
    }

    /**
     * Compute face normal vectors
     */
    computeFaceNormal() {
        this.faceNormal[0] = this.vertex[1].subtract(this.vertex[2]);
        this.faceNormal[1] = this.vertex[2].subtract(this.vertex[3]);
        this.faceNormal[2] = this.vertex[3].subtract(this.vertex[0]);
        this.faceNormal[3] = this.vertex[0].subtract(this.vertex[1]);
        for (let i = 0; i < this.faceNormal.length; i++) {
            this.faceNormal[i] = this.faceNormal[i].normalize();
        }
    }

    /**
     * Rotate Rectangle
     * @param {number} angle Angle in radians
     */
    rotate (angle) {
        this.angle += angle;
        for (let i = 0; i < this.vertex.length; i++) {
            this.vertex[i] = this.vertex[i].rotate(angle, this.massCenter);
        }
        // compute the face normal vectors
        this.computeFaceNormal();
    }

    displayBounds() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
        ctx.lineTo(this.vertex[1].x, this.vertex[1].y)
        ctx.lineTo(this.vertex[2].x, this.vertex[2].y)
        ctx.lineTo(this.vertex[3].x, this.vertex[3].y);
        ctx.lineTo(this.vertex[0].x, this.vertex[0].y);
        ctx.closePath();

        if (this.additionalInfo === "terrain") {
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'black';
            ctx.fill();

        } else {
            ctx.strokeStyle = 'white';
        }
        ctx.stroke();
        ctx.restore();
        // draw the face normal vectors
        // ctx.translate(this.massCenter.x, this.massCenter.y);
        // this.faceNormal.forEach(item => item.draw('yellow'));
        ctx.restore();
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        this.displayBounds();
        ctx.restore();
    }

    /**
     * Set and update inertia
     */
    updateInertia() {
        super.updateInertia();
        if (this.massInverse === 0) {
            this.inertia = 0;
        } else {
            // inertia = mass * (width^2 + height^2) / 12
            const value = 12;
            this.inertia = this.mass *
                (this.height * this.height + this.width * this.width) / value;
            this.inertia = 1 / this.inertia; // wtf??
        }
    }

    // Collision detection
    // Separating Axis Theorem - Support Points
    // An Efficient SAT Algorithm
    /**
     *
     * @param otherShape
     * @param collisionInfo
     * @return {boolean}
     */
    collisionTest (otherShape, collisionInfo) {
        let status;
        if (otherShape.type === "circle") {

            // status = false;
            status = this.collidedRectCirc(otherShape, collisionInfo);
        } else if (otherShape.type === "triangle") {
           status =  otherShape.collidedTrianTrianRect(otherShape, this, collisionInfo);
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
     * @param {Rectangle} otherRect other Rectangle with which collision occurs
     * @param collisionInfo collision info
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
            // retrieve a face normal from shape A
            n = this.faceNormal[i].copy();
            // use -n as direction and the vertex on edge i as point on edge
            let dir = n.scale(-1);
            let ptOnEdge = this.vertex[i].copy();
            // find the support point on B
            //the point has the longest distance with edge i
            support = otherRect.findSupportPoint(dir, ptOnEdge);
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
     * @param {Rectangle} r1 Rectangle that called the method
     * @param {Rectangle} r2 Rectangle with which collision occurs
     * @param {CollisionInfo} collisionInfo collision info
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

    /**
     * Detect collision according to the relative position of the circle's center with respect to the rectangle
     * @param {Circle} otherCir collided Circle
     * @param {CollisionInfo} collisionInfo collision info
     */
    collidedRectCirc(otherCir, collisionInfo) {
        // compute the nearest edge
        // compute perpendicular distances between circle center to each of the edges of the rectangle
        // i.e. project vector created from subtracting vertex from circle center onto each of the face normals
        let inside = true;
        let bestDistance = -99999;
        let nearestEdge = 0;
        let i, v;
        let circ2Pos, projection;
        for (i = 0; i < 4; i++) {
            //find the nearest face for center of circle
            circ2Pos = otherCir.massCenter;
            v = circ2Pos.subtract(this.vertex[i]);
            projection = v.dot(this.faceNormal[i]);
            if (projection > 0) {
                //if the center of circle is outside of rectangle
                bestDistance = projection;
                nearestEdge = i;
                inside = false;
                break;
            }
            if (projection > bestDistance) {
                bestDistance = projection;
                nearestEdge = i;
            }
        }
        var dis;
        /**
         * @type {Vector}
         */
        let radiusVec, normal;
        if (!inside) {
            //the center of circle is outside of rectangle

            //v1 is from left vertex of face to center of circle
            //v2 is from left vertex of face to right vertex of face
            var v1 = circ2Pos.subtract(this.vertex[nearestEdge]);
            var v2 = this.vertex[(nearestEdge + 1) % 4].subtract(this.vertex[nearestEdge]);

            var dot = v1.dot(v2);

            if (dot < 0) {
                //the center of circle is in corner region of mVertex[nearestEdge]
                dis = v1.mag();
                //compare the distance with radium to decide collision
                if (dis > otherCir.height) {
                    return false;
                }

                normal = v1.normalize();
                radiusVec = normal.scale(-otherCir.height);
                collisionInfo.setInfo(otherCir.height - dis, normal, circ2Pos.add(radiusVec));
            } else {
                //the center of circle is in corner region of mVertex[nearestEdge+1]

                //v1 is from right vertex of face to center of circle
                //v2 is from right vertex of face to left vertex of face
                v1 = circ2Pos.subtract(this.vertex[(nearestEdge + 1) % 4]);
                v2 = v2.scale(-1);
                dot = v1.dot(v2);
                if (dot < 0) {
                    dis = v1.mag();
                    //compare the distance with radium to decide collision
                    if (dis > otherCir.height) {
                        return false;
                    }
                    normal = v1.normalize();
                    radiusVec = normal.scale(-otherCir.height);
                    collisionInfo.setInfo(otherCir.height - dis, normal, circ2Pos.add(radiusVec));
                } else {
                    //the center of circle is in face region of face[nearestEdge]
                    if (bestDistance < otherCir.height) {
                        radiusVec = this.faceNormal[nearestEdge].scale(otherCir.height);
                        collisionInfo.setInfo(otherCir.height - bestDistance, this.faceNormal[nearestEdge], circ2Pos.subtract(radiusVec));
                    } else {
                        return false;
                    }
                }
            }
        } else {
            //the center of circle is inside of rectangle
            radiusVec = this.faceNormal[nearestEdge].scale(otherCir.height);
            collisionInfo.setInfo(otherCir.height - bestDistance, this.faceNormal[nearestEdge], circ2Pos.subtract(radiusVec));
        }
        return true;
    }
}

