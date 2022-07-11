import { screen } from "../engineCore/screen.js";
import { Vector } from "../lib/vector.js";
import { drawLevel } from "../game/level.js";
import { _engineCore as engineCore} from "../engineCore/core.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export class Bullet {
    /**
     *
     * @param loc
     * @param vel
     */
    constructor(loc, vel, acc, delay) {
        // initialize types
        this.location = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.acceleration = acc || new Vector(0, 0);
        this.location = loc;
        this.velocity = vel;
        this.acceleration.add(engineCore.mGravity) ;
        this.delay = delay || 0;
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.fillStyle = 'black'; /* TODO define global styles for the app */
        ctx.beginPath();
        ctx.ellipse(this.location.x, this.location.y,
            3, 3, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        sleep(this.delay).then(() => {
            if ((this.location.x > screen.mWidth + 2) ||
                (this.location.y > screen.mHeight + 2)) {
            } else {
                this.velocity.add(this.acceleration);
                this.location.add(this.velocity);
            }
        });

       //console.log(this.location);
    }
}
