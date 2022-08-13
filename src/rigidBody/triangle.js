import {RigidShape} from "./rigidShape.js";
import {Vector} from "../lib/vector.js";
import {screen, map} from "../engineCore/screen.js";

/***
 * Base class for triangle shape rigid objects
 * @class Triangle
 */
export class Triangle extends RigidShape {
    constructor(mass, center, width, height) {
        super(center);
        this.type = "triangle";
        // triangle base
        this.width = width;
        this.height = height;
        this.mass = mass;
        /**
         * Array to store vertex positions of the triangle
         * @type {*[]}
         */
        this.vertex = [];
        /**
         * Array to store the face normal vectors
         * @type {*[]}
         */
        this.faceNormal = [];

        // compute vertex positions
        this.vertex[0] = new Vector(0,
             - this.height / 2,0,0,false);
        this.vertex[1] = new Vector(this.width / 2,
            this.height / 2, 0,0,false);
        this.vertex[2] = new Vector(- this.width / 2,
            this.height / 2, 0,0,false);

        // compute the face normal vectors
        this.faceNormal[0] = this.vertex[1].subtract(this.vertex[2]);
        let faceTemp = this.faceNormal[0].copy();
        this.faceNormal[0] = new Vector(-faceTemp.y, faceTemp.x, 0, 0, false)
        this.faceNormal[1] = this.vertex[0].subtract(this.vertex[2]);
        faceTemp = this.faceNormal[1].copy();
        this.faceNormal[1] = new Vector(faceTemp.y, -faceTemp.x, 0, 0, false)
        this.faceNormal[2] = this.vertex[0].subtract(this.vertex[1]);
        faceTemp = this.faceNormal[2].copy();
        this.faceNormal[2] = new Vector(-faceTemp.y, +faceTemp.x, 0, 0, false)
        this.faceNormal.forEach(vector => vector.normalize());
    }

    displayBounds() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.translate(this.massCenter.x, this.massCenter.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
        ctx.lineTo(this.vertex[1].x, this.vertex[1].y)
        ctx.lineTo(this.vertex[2].x, this.vertex[2].y)
        ctx.lineTo(this.vertex[0].x, this.vertex[0].y)
        ctx.stroke();
        ctx.closePath();
        // this.faceNormal.forEach(item => item.draw('yellow'));
        ctx.restore();
    }

    update() {
        super.update();
    }

}