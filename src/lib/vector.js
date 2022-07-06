/**
 * A class that represents a vector
 * using Cartesian coordinates
 */
class Vector {

    /**
     * Constructor of the Vector class
     * @param x x coordinate of a vector
     * @param y y coordinate of a vector
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Method to add two vectors
     * @param a vector added to a vector that called the method
     */
    add(a) {
        this.x = this.x + a.x;
        this.y = this.y + a.y;
    }

    /**
     * Method to subtract two vectors
     * @param a vector subtracted from a vector that called the method
     */
    sub(a) {
        this.x = this.x - a.x;
        this.y = this.y - a.y;
    }

    /**
     * Method to multiply (scale) a vector by a scalar n
     * @param n scalar by which the vector is multiplied
     */
    mult(n) {
        this.x = n * this.x;
        this.y = n * this.y;
    }

    /**
     * Method to calculate the magnitude of a vector
     * @returns {number} the magnitude of a vector that called it
     */
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Method to normalize the vector that called it,
     * i.e. multiply the vector by a factor so that
     * its magnitude is equal to 1
     */
    normalize() {
        let mag = this.mag();
        this.mult(1 / mag);
    }
}
