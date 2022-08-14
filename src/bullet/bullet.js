import { screen, map } from "../engineCore/screen.js";
import { Vector } from "../lib/vector.js";
import { gEngine } from "../engineCore/core.js";
import data from './../engineCore/config.json' assert {type: 'json'};
import {Circle} from '../rigidBody/circle.js'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class Bullet extends Circle{
    /**
     *
     * @param loc
     * @param vel
     */
    constructor(loc, vel, acc, delay) {
        super(data.bulletMass, loc, 3);
        // initialize types
        this.mass = data.bulletMass;
        // this.location = new Vector(0, 0);
        this.velocity = new Vector(0, 0, 0,0,false);
        this.acceleration = acc || new Vector(0, 0, 0,0,false);
        // this.location = loc;
        this.velocity = vel;
        this.acceleration.add(gEngine.Core.mGravity);
        this.accelerationDrag = new Vector(0, 0,0,0, false);
        this.delay = delay || 0;
    }

    // applyForce(force) {
    //     let f = force;
    //     f.mult(1 / this.mass);
    //     console.log(f)
    //     this.acceleration.add(f);
    // }

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
            this.displayBounds();
            ctx.restore();
        }
    }

    update() {
        sleep(this.delay).then(() => {
            if (this.massCenter !== null && ((this.massCenter.x > screen.mWidth + 2) ||
                (this.massCenter.y > screen.mHeight + 2))) {
                this.massCenter =  null;
            } else if (this.massCenter !== null){
                for (let i = 0; i < gEngine.Core.mDragAreas.length; i++) {
                    let area = gEngine.Core.mDragAreas[i];
                    if (this.isInside(area)) {
                        this.drag(area);
                        this.velocity.add(this.accelerationDrag);
                    }
                }
                this.velocity.add(this.acceleration);
                this.massCenter.add(this.velocity);
            }
        });
    }


}
