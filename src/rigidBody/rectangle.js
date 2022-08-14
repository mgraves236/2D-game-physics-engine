import {RigidShape} from "./rigidShape.js";
import {Vector} from "../lib/vector.js";
import {screen} from "../engineCore/screen.js";

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
    constructor(mass, center, width, height) {
        super(center);
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
         * @type {*[]}
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
}
