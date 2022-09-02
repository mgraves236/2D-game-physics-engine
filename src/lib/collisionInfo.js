import {Vector} from "./vector.js";
import {screen} from "../engineCore/screen.js";

export class CollisionInfo {
    constructor () {
        this.depth = 0;
        this.normal = new Vector();
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
            n.y - n.y0);
        nMultiplied.scale(d);
        // nMultiplied.draw('black')
        this.end = {x: nMultiplied.x + s.x , y: nMultiplied.y + s.y }
    }

    changeDirection () {
        this.normal.scale(-1);
        let n = {x: this.start.x, y: this.start.y};
        this.start = {x: this.end.x, y: this.end.y};
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