import { _engineCore as engineCore } from "../engineCore/core.js";
import {map, screen} from "../engineCore/screen.js";

/**
 * A class that represents a vector using Cartesian coordinates
 * @class Vector
 */


class Vector {

    /**
     * Constructor of the Vector class
     * @param x x coordinate of a vector
     * @param y y coordinate of a vector
     * @param x0 optional parameter, x coordinate of the vector origin
     * @param y0 optional parameter, y coordinate of the vector origin
     */
    constructor(x, y, x0, y0) {
        this.x = x;
        this.y = map(y);
        this.x0 = x0 || 0;
        this.y0 = map(y0) || 0;
    }

    /**
     * Method to add two vectors
     * @param a {Vector} vector added to a vector that called the method
     * @returns {Vector}
     */
    add(a) {
        this.x = this.x + a.x;
        this.y = this.y + map(a.y);
        //return new Vector(this.x + a.x, this.y + a.y)
    }

    /**
     * Method to subtract two vectors
     * @param a vector subtracted from a vector that called the method
     * @returns {Vector}
     */
    sub(a) {
        // this.x = this.x - a.x;
        // this.y = this.y - a.y;
        return new Vector(this.x - a.x, this.y - a.y)
    }

    /**
     * Method to multiply (scale) a vector by a scalar n
     * @param n scalar by which the vector is multiplied
     */
    mult(n) {
        this.x = n * this.x;
        let yTemp = map(this.y);
        yTemp = n * yTemp;
        this.y = map(-yTemp);
        // return new Vector(n * this.x, n * this.y)
    }

    /**
     * Method to calculate the magnitude of a vector
     * @returns {number} the magnitude of a vector that called it
     */
    mag() {
        return Math.sqrt((this.x - this.x0) * (this.x - this.x0)
            + (this.y - this.y0) * (this.y - this.y0));
    }

    /**
     * Method to normalize the vector that called it,
     * i.e. multiply the vector by a factor so that
     * its magnitude is equal to 1
     */
    normalize() {
        let mag = this.mag();
        if (mag !== 0)
            this.mult(1 / mag);
    }

    dot(a) {
        return this.x * a.x + this.y * a.y;
    }

    /**
     * Method to rotate a vector
     * @param deg
     * @return {Vector}
     */
    rotate(deg) {
        // switch to polar coordinates
        deg = Math.PI - deg * Math.PI / 180.0;
        let r = this.mag();
        let angle = Math.acos((this.x - this.x0) / r);
        let x = r * Math.cos(2 * Math.PI - angle + deg) + this.x0;
        let y = r * Math.sin(angle + deg) + this.y0;
        return new Vector(x, map(y), this.x0, map(this.y0));
    }

    draw(color) {
        screen.mContext.save();
        screen.mContext.beginPath();
        screen.mContext.moveTo(this.x0, this.y0);
        screen.mContext.lineTo(this.x, this.y);
        screen.mContext.strokeStyle = color;
        screen.mContext.lineWidth = 2;
        screen.mContext.stroke();
        screen.mContext.restore();
    }


}

export {Vector};