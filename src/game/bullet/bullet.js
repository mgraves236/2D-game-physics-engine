import { screen } from "../../engineCore/screen.js";
import { Vector } from "../../lib/vector.js";
import data from '../../engineCore/config.json' assert {type: 'json'};
import {Circle} from '../../rigidBody/circle.js'
import {sleep} from "../../lib/sleep.js";

/**
 * Class that represents a bullet
 * @class
 */
export class Bullet extends Circle {
    /**
     * Constructor of the Bullet object
     * @param loc bullet spawn location
     * @param vel bullet velocity
     * @param info additional info for verification
     * @param r bullet radius
     * @param m bullet mass
     * @param acc bullet acceleration
     * @param delay waiting time to shoot the bullet after calling update
     */
    constructor(loc, vel, info = "bullet", r = 3, m = data.bulletMass, acc =  new Vector(), delay = 0) {
        super(m, loc, r);
        // initialize types
        this.mass = m || data.bulletMass ;
        // this.location = new Vector(0, 0);
        this.velocity = new Vector();
        /**
         * @type {Vector}
         */
        this.acceleration = this.acceleration.add(acc);
        // this.location = loc;
        this.velocity = vel;
        this.delay = delay;
        this.additionalInfo = info;
    }

    display() {
        if (this.massCenter !== null) {
            let ctx = screen.mContext;
            ctx.save();
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.ellipse(this.massCenter.x, this.massCenter.y,
                this.height, this.height, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
            ctx.save();
            // this.displayBounds();
            ctx.restore();
        }
    }

    update() {
        sleep(this.delay).then(() => {
            if (this.massCenter !== null && ((this.massCenter.x > screen.mWidth + 2) ||
                (this.massCenter.y - this.height > screen.mHeight + 2))) {
                this.massCenter =  new Vector(-100, -100);
            } else if (this.massCenter !== null){
                super.updateDrag();
                super.update();
            }
        });
    }
}
