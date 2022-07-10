import { screen } from "../engineCore/screen.js";
import { Vector } from "../lib/vector.js";

export class Bullet {
    /**
     *
     * @param loc
     * @param vel
     */
    constructor(loc, vel) {
        this.location = loc;
        this.velocity = vel;
    }

    display() {
        let ctx = screen.mContext;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.fillStyle = '#B989D9'; /* TODO define global styles for the app */
        ctx.ellipse(this.location.x, this.location.y,
            3, 3, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    update() {
        let test  = new Vector(0,450)
        this.location.add(test);
     //   console.log(this.location);
    }
}
