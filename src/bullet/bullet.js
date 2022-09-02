import { screen, map } from "../engineCore/screen.js";
import { Vector } from "../lib/vector.js";
import { gEngine } from "../engineCore/core.js";
import data from './../engineCore/config.json' assert {type: 'json'};
import {Circle} from '../rigidBody/circle.js'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class Bullet extends Circle {
    /**
     *
     * @param {Vector} loc
     * @param {Vector} vel
     * @param {Vector} acc
     * @param {number} delay
     * @param {number} r
     * @param {number} m
     */
    constructor(loc, vel,r = 3, m = data.bulletMass, acc, delay) {
        super(m, loc, r);
        // initialize types
        this.mass = m || data.bulletMass ;
        // this.location = new Vector(0, 0);
        this.velocity = new Vector(0, 0, 0,0,false);
        this.acceleration = acc || new Vector(0, 0, 0,0,false);
        // this.location = loc;
        this.velocity = vel;
        let gravity = gEngine.Core.mGravity.copy();
        gravity.mult(data.bulletMass);
        this.acceleration.add(gravity);
        this.accelerationDrag = new Vector(0, 0,0,0, false);
        this.delay = delay || 0;
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
                this.massCenter =  null;
            } else if (this.massCenter !== null){
                super.updateDrag();
                super.update();
                // this.massCenter.add(this.velocity);
            }
            // this.acceleration.mult(0);
            // this.accelerationDrag.mult(0);
        });

    }


}
