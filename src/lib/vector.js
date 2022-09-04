import {screen} from "../engineCore/screen.js";

/**
 * A class that represents a vector using Cartesian coordinates
 * @class Vector
 */


export class Vector {

    /**
     * Constructor of the Vector class
     * @param {number} x x coordinate of a vector
     * @param {number} y y coordinate of a vector
     * @param {number} x0 optional parameter, x coordinate of the vector origin
     * @param {number} y0 optional parameter, y coordinate of the vector origin
     */
    constructor(x = 0, y = 0, x0 = 0, y0 = 0) {
        this.x = x;
        this.y = y;
        this.x0 = x0;
        this.y0 = y0;
    }

    /**
     * Method to add two vectors
     * @param a {Vector} vector added to a vector that called the method
     * @returns {Vector} kk
     */
    add(a) {
       // this.x = this.x + a.x;
        //this.y = this.y + a.y;
        return new Vector(this.x + a.x, this.y + a.y)
    }
    /**
     * Method to subtract two vectors
     * @param a vector subtracted from a vector that called the method
     * @return {Vector} product of vector subtraction
     */
    subtract(a) {
         // this.x = this.x - a.x;
         // this.y = this.y - a.y;
        return new Vector(this.x - a.x, this.y - a.y)
    }

    /**
     * Method to multiply (scale) a vector by a scalar n
     * @param n scalar by which the vector is multiplied
     * @return
     */
    scale(n) {
        // this.x = n * this.x;
        // this.y = n * this.y;
        // let yTemp = map(this.y);
        // yTemp = n * yTemp;
        // this.y = map(-yTemp);
         return new Vector(n * this.x, n * this.y)
    }

    /**
     * Method to calculate the magnitude of a vector
     * @return {number} the magnitude of a vector that called it
     */
    mag() {
        return Math.sqrt((this.x - this.x0) * (this.x - this.x0)
            + (this.y - this.y0) * (this.y - this.y0));
    }

    /**
     * Method to normalize the vector that called it,
     * i.e. multiply the vector by a factor so that
     * its magnitude is equal to 1
     * @return
     */
    normalize() {
        let mag = this.mag();
        let x, y;
        if (mag !== 0) {
            let diffX = Math.abs(this.x - this.x0);
            let diffY = Math.abs(this.y - this.y0);
            if (this.x >= this.x0) {
                x = this.x0 + diffX / mag;
            } else {
                x = this.x0 - diffX / mag;

            }
            if (this.y <= this.y0) {
                y = this.y0 -  diffY / mag;
            } else {
                y = this.y0 + diffY / mag;

            }
            // this.x = this.x / mag;
            // this.y = this.y / mag;
        }
        return new Vector(x,y);
    }

    /**
     *
     * @param a
     * @return {number}
     */
    dot(a) {
        return this.x * a.x + this.y * a.y;
    }

    /**
     *
     * @param a
     * @returns {number}
     */
    cross(a) {
        return (this.x * a.y - this.y * a.x);
    }

    /**
     * Method to rotate a vector
     * @param angle
     * @param {Vector} center
     * @return {Vector}
     */
    rotate(angle, center) {
        let rotCenter = center ||  new Vector();
        // switch to polar coordinates
        let r = [];
        let x = this.x - rotCenter.x;
        let y = this.y - rotCenter.y;
        r[0] = x * Math.cos(angle) - y * Math.sin(angle);
        r[1] = x * Math.sin(angle) + y * Math.cos(angle);

        r[0] += rotCenter.x;
        r[1] += rotCenter.y;

       return new Vector(r[0], r[1])

    }

    draw(color) {
        screen.mContext.save();
        screen.mContext.beginPath();
        screen.mContext.moveTo(this.x0, this.y0);
        screen.mContext.lineTo(this.x, this.y);
        screen.mContext.closePath();
        screen.mContext.strokeStyle = color;
        screen.mContext.lineWidth = 2;
        screen.mContext.stroke();
        screen.mContext.restore();
    }

    /**
     *
     * @return {Vector}
     */
    copy() {
        let vector = new Vector();
        vector.x = this.x;
        vector.y = this.y;
        vector.x0 = this.x0;
        vector.y0 = this.y0;
        vector.doMap = this.doMap;
        return vector;
    }

    /**
     * Get a vector with origin other than (0,0)
     * @return {Vector}
     */
    get() {
        let vector = new Vector();
        vector.x = (this.x - this.x0);
        vector.y = (this.y - this.y0);
        return vector;
    }

    /**
     * Change the vector direction
     * @return {Vector} A vector with changed direction
     */
   changeDir() {
        return new Vector(this.x0, this.y0, this.x, this.y);
   }
}

