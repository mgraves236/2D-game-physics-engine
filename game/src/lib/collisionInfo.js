import {Vector} from "./vector.js";
import {screen} from "../engineCore/screen.js";

/**
 * Class that represents collision info
 * @class CollisionInfo
 */
export class CollisionInfo {
    /**
     * Construct a new CollisionInfo object
     */
    constructor () {
        this.depth = 0;
        this.normal = new Vector();
        this.start = new Vector();
        this.end = new Vector();
    }

    /**
     * Set collision info
     * @param {number} d collision depth
     * @param {Vector} n collision normal
     * @param {Vector} s collision vector start
     */
    setInfo (d, n, s) {
        this.depth = d;
        this.normal = n;
        this.start = s;
        this.end = s.add(n.scale(d));
    }

    /**
     * Change direction of the normal so that it points in the opposite direction
     */
    changeDirection() {
        this.normal = this.normal.scale(-1);
        let n = this.start;
        this.start = this.end;
        this.end = n;
    }

    /**
     * Display collision vector
     */
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