import {Vector} from "./vector";

export class CollisionInfo {
    constructor () {
        this.depth = 0;
        this.normal = new Vector(0,0,0,0, false);
        this.start = new Vector(0,0,0,0, false);
        this.end = new Vector(0,0,0,0, false);
    }

    /**
     *
     * @param {number} d
     * @param {Vector} n
     * @param {Vector} s
     */
    setInfo (d, n, s) {
        this.depth = d;
        this.normal = n;
        this.start = s;
        let nMultiplied = n.copy();
        nMultiplied.mult(d);
        this.end = s.add(nMultiplied);
    }

    changeDirection () {
        this.normal.mult(-1);
        let n = this.start.copy();
        this.start = this.end.copy();
        this.end = n;
    }

}