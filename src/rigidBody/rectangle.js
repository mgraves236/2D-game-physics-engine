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
    }
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
Rectangle.prototype.collisionTest = function (otherShape, collisionInfo) {
    let status = false;
    if (otherShape.type === "circle") {
        status = false;
    } else {
        status = this.collidedRectRect(this, otherShape, collisionInfo);
    }
    return status;
};

/**
 * Object to keep information about a support point
 * @type {{supportPoint: null, supportPointDist: number}}
 */
let tmpSupport = {
    supportPoint: null,
    supportPointDist: 0
};

/**
 * Compute a support point based on dir (find a support point for any face normal)
 * @param {Vector} dir Negated face normal direction
 * @param {Vector} ptOnEdge A position on the given edge (e.g. a vertex)
 */
Rectangle.prototype.findSupportPoint = function (dir, ptOnEdge) {
    let vToEdge;
    let projection;

    tmpSupport.supportPointDist = -9999999;
    tmpSupport.supportPoint = null;
    for (let i = 0; i < this.vertex.length; i++) {
        vToEdge = this.vertex[i].subtract(ptOnEdge);
        projection = vToEdge.dot(dir);

        if ((projection > 0) && (projection > tmpSupport.supportPointDist)) {
            tmpSupport.supportPoint = this.vertex[i];
            tmpSupport.supportPointDist = projection;
        }
    }
};

/**
 * Find the axis of the least penetration
 * based on the support point with the least support point distant
 * @param {Rectangle} otherRect
 * @param collisionInfo
 * @return {boolean} hasSupport
 */
Rectangle.prototype.findAxisLeastPenetration = function (otherRect, collisionInfo) {

    let n;
    let supportPoint;

    let bestDistance = 999999;
    let bestIndex = null;

    let hasSupport = true;
    let i = 0;

    while ((hasSupport) && (i < this.faceNormal.length)) {
        n = this.faceNormal[i];

        let dir = n.copy();
        dir.mult(-1);
        let ptOnEdge = this.vertex[i];
        otherRect.findSupportPoint(dir, ptOnEdge);
        hasSupport = (tmpSupport.supportPoint !== null);

        if ((hasSupport) && (tmpSupport.supportPointDist < bestDistance)) {
            bestDistance = tmpSupport.supportPointDist;
            bestIndex = i;
            supportPoint = tmpSupport.supportPoint;
        }
        i = i + 1;
    }
    if (hasSupport) {
        let bestVec = this.faceNormal[bestIndex].copy();
        bestVec.mult(bestDistance);
        let point = supportPoint.copy();
        point.add(bestVec)
        collisionInfo.setInfo(bestDistance, this.faceNormal[bestIndex].copy(), point);
    }
    return hasSupport;
};

let collisionInfoR1 = new CollisionInfo();
let collisionInfoR2 = new CollisionInfo();

/**
 * Compute the axis of lest penetration and choose smaller of the two results
 * @param {Rectangle} r1
 * @param {Rectangle}   r2
 * @param collisionInfo
 * @return {boolean}
 */
Rectangle.prototype.collidedRectRect = function (r1, r2, collisionInfo) {

    var status1 = false;
    var status2 = false;

    status1 = r1.findAxisLeastPenetration(r2, collisionInfoR1);

    if (status1) {
        status2 = r2.findAxisLeastPenetration(r1, collisionInfoR2);
        if (status2) {
            if (collisionInfoR1.depth < collisionInfoR2.depth) {
                let depthVec = collisionInfoR1.normal.copy();
                depthVec.mult(collisionInfoR1.depth);
                collisionInfo.setInfo(collisionInfoR1.depth, collisionInfoR1.normal, collisionInfoR1.start.subtract(depthVec));
            } else {
                let normal = collisionInfoR2.normal.copy();
                normal.mult(-1);
                collisionInfo.setInfo(collisionInfoR2.depth, normal, collisionInfoR2.start);
            }
        }
    }
    return status1 && status2;
};

