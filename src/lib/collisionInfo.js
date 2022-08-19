import {Vector} from "./vector.js";
import {screen} from "../engineCore/screen.js";

export class CollisionInfo {
    constructor () {
        this.depth = 0;
        this.normal = new Vector(0,0,0,0, false);
        this.start = {x: 0, y:0};
        this.end = {x: 0, y:0};
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
        this.start = {x: s.x, y: s.y};
        let nMultiplied = new Vector(n.x - n.x0,
            n.y - n.y0,0,0,false);
        nMultiplied.mult(d);
        console.log(nMultiplied)
        this.end = {x: nMultiplied.x + s.x , y: nMultiplied.y + s.y }
    }

    changeDirection () {
        this.normal.mult(-1);
        let n = this.start.copy();
        this.start = this.end.copy();
        this.end = n;
    }

    display() {
        let ctx = screen.mContext;
        ctx.moveTo(this.start.x, this.
            start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.closePath();
        ctx.strokeStyle = "orange";
        ctx.stroke();
    }

}