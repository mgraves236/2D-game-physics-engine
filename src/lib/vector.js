/**
 * A class that represents a vector
 * using Cartesian coordinates
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
        this.y = y;
        this.x0 = x0 || 0;
        this.y0 = y0 || 0;
    }

    /**
     * Method to add two vectors
     * @param a vector added to a vector that called the method
     * @returns {Vector}
     */
    add(a) {
        // this.x = this.x + a.x;
        // this.y = this.y + a.y;
        return new Vector(this.x + a.x, this.y + a.y)
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
     * @returns {Vector}
     */
    mult(n) {
        // this.x = n * this.x;
        // this.y = n * this.y;
        return new Vector(n * this.x, n * this.y)
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
        if(mag !== 0)
            this.mult(1 / mag);
    }

    dot(a) {
        return this.x * a.x + this.y * a.y;
    }

    rotate(deg) {
        // switch to polar coordinates
        deg = deg * Math.PI / 180.0;
        // console.log(deg);
        // let r = this.mag();
        // let angle = Math.acos((this.x - this.x0) / r);
        // console.log(Math.acos((this.x - this.x0) / r) * 180 / Math.PI);
        // angle = Math.PI / 2 - angle - deg;
        // let x = r * Math.cos(angle);
        // let y = r * Math.sin(angle);
        // return new Vector(x, y, this.x0, this.y0);
        let xTemp = this.x;
        let x = this.x*Math.cos(deg) - this.y*Math.sin(deg);
        let y = xTemp*Math.sin(deg) + this.y*Math.cos(deg);
        return new Vector(x, y, this.x0, this.y0);
    }

    draw() {
        _engine.Core.mContext.strokeStyle = 'black';
        _engine.Core.mContext.lineWidth = 2;
        _engine.Core.mContext.beginPath();

        _engine.Core.mContext.moveTo(this.x0, this.y0);
        _engine.Core.mContext.lineTo(this.x, this.y);
        _engine.Core.mContext.stroke();

    }

}
