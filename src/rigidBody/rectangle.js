import {RigidShape} from "./rigidShape.js";
import {Vector} from "../lib/vector";

export class Rectangle extends RigidShape {
    constructor(mass, center, width, height) {
        super(center);
        this.type = "rectangle";
        this.width = width;
        this.height = height;
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
            this.massCenter.y - this.height / 2);
        this.vertex[2] = new Vector(this.massCenter.x + this.width / 2,
            this.massCenter.y + this.height / 2);
        this.vertex[3] = new Vector(this.massCenter.x - this.width / 2,
            this.massCenter.y + this.height / 2);

        // compute the face normal vectors
        this.faceNormal[0] = this.vertex[1].sub(this.vertex[2]);
        this.faceNormal[0] = this.faceNormal[0].normalize();
        this.faceNormal[1] = this.vertex[2].sub(this.vertex[3]);
        this.faceNormal[1] = this.faceNormal[1].normalize();
        this.faceNormal[2] = this.vertex[3].sub(this.vertex[0]);
        this.faceNormal[2] = this.faceNormal[2].normalize();
        this.faceNormal[3] = this.vertex[0].sub(this.vertex[1]);
        this.faceNormal[3] = this.faceNormal[3].normalize();
    }

    display() {

    }

}