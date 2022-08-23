import {map, screen} from "../engineCore/screen.js";

/**
 * A class that represents a vector using Cartesian coordinates
 * @class Vector
 */


export class Vector {

    /**
     * Constructor of the Vector class
     * @param x x coordinate of a vector
     * @param y y coordinate of a vector
     * @param x0 optional parameter, x coordinate of the vector origin
     * @param y0 optional parameter, y coordinate of the vector origin
     */
    constructor(x, y, x0, y0, doMap = true) {
        this.x = x;
        this.x0 = x0 || 0;
        this.doMap = doMap;
        if (this.doMap) {
            this.y = map(y);
            this.y0 = map(y0) || 0;
        } else {
            this.y = y;
            this.y0 = y0;
        }
    }

    /**
     * Method to add two vectors
     * @param a {Vector} vector added to a vector that called the method
     * @returns {Vector}
     */
    add(a) {
        this.x = this.x + a.x;
        if (this.doMap && a.doMap) {
            this.y = this.y + map(a.y);
        } else {
            this.y = this.y + a.y;
        }
        //return new Vector(this.x + a.x, this.y + a.y)
    }
    /**
     * Method to subtract two vectors
     * @param a vector subtracted from a vector that called the method
     * @returns {Vector} product of vector subtraction
     */
    subtract(a) {
         // this.x = this.x - a.x;
         // this.y = this.y - a.y;
        return new Vector(this.x - a.x, this.y - a.y, 0,0, false)
    }

    /**
     * Method to multiply (scale) a vector by a scalar n
     * @param n scalar by which the vector is multiplied
     */
    mult(n) {
        this.x = n * this.x;
        this.y = n * this.y;
        // let yTemp = map(this.y);
        // yTemp = n * yTemp;
        // this.y = map(-yTemp);
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
        if (mag !== 0) {
            let diffX = Math.abs(this.x - this.x0);
            let diffY = Math.abs(this.y - this.y0);
            if (this.x >= this.x0) {
                this.x = this.x0 + diffX / mag;
            } else {
                this.x = this.x0 - diffX / mag;

            }
            if (this.y <= this.y0) {
                this.y = this.y0 -  diffY / mag;
            } else {
                this.y = this.y0 + diffY / mag;

            }
            // this.x = this.x / mag;
            // this.y = this.y / mag;

        }
    }

    dot(a) {
        return this.x * a.x + this.y * a.y;
    }

    /**
     * Method to rotate a vector
     * @param deg
     * @param {Vector} center
     * @return {Vector}
     */
    rotate(deg, center) {
        let rotCenter = center || new Vector(0,0,0,0, false);
        // switch to polar coordinates
        deg = Math.PI - deg * Math.PI / 180.0;
        let r = [];
        let x = this.x - center.x;
        let y = this.y - center.y;
        r[0] = x * Math.cos(deg) - y * Math.sin(deg);
        r[1] = x * Math.sin(deg) + y * Math.cos(deg);

        r[0] += center.x;
        r[1] += center.y;
        // let r = this.mag();
        //
        // let x, y;
        //
        // let angle = this.angle();
        // x = r * Math.cos(Math.PI - angle - deg) + this.x0;
        // y = r * Math.sin(Math.PI - angle - deg) + this.y0;

        // rotation matrix
        // let xTemp = this.x;
        // console.log(this.x + "   " + map(this.x))
        // let x = this.x*Math.cos(deg) - this.y*Math.sin(deg);
        // let y = xTemp*Math.sin(deg) + map(this.y)*Math.cos(deg);

        // if (this.doMap) {
        //     return new Vector(x, map(y), this.x0, map(this.y0));
        // } else {
        //     return new Vector(x, y, this.x0, this.y0, false);
        //
        // }
        return new Vector(r[0], r[1], 0 , 0, false)
        // this.x = x;
        // this.y = y;
        // this.y0 = this.y0;
    }

    angle() {
        let r = this.mag();
        let arg = (this.x - this.x0) / r;
        let angle;
        if (map(this.y) <= map(this.y0)) {
            angle = 2 * math.PI - math.acos(arg);
        } else {
            angle = math.acos(arg);
        }

        return angle;
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

    copy() {
        let vector = new Vector(0,0);
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
        let vector = new Vector(0,0);
        vector.x = (this.x - this.x0);
        vector.y = (this.y - this.y0);
        return vector;
    }

    /**
     * Change the vector direction
     * @return {Vector} A vector with changed direction.
     */
   changeDir() {
        return new Vector(this.x0, this.y0, this.x, this.y);
   }
}

