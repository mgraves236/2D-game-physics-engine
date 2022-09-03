import {Vector} from "./vector.js";
import {screen} from "../engineCore/screen.js";

export class CollisionInfo {
    constructor () {
        this.depth = 0;
        this.normal = new Vector();
        this.start = new Vector();
        this.end = new Vector();
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
        this.end = s.add(n.scale(d));
    }

    changeDirection () {
        this.normal = this.normal.scale(-1);
        let n = this.start;
        this.start = this.end;
        this.end = n;
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.moveTo(this.start.x, this.
            start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.moveTo(this.start.x, this.
            start.y);
        ctx.closePath();
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.restore();
    }

}