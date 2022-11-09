import { screen } from "../../engineCore/screen.js";
import { Vector } from "../../lib/vector.js";
import { Engine } from "../../engineCore/core.js";
import {Circle} from '../../rigidBody/circle.js'

export class Mover extends Circle {
    /**
     * Constructor of the Mover object
     * @param loc
     * @param vel
     * @param radius
     * @param mass
     * @param angle
     * @param friction
     * @param restitution
     */
    constructor(loc, vel, radius, mass, angle = 0, friction = 0, restitution = 0) {
        super(mass, loc, radius);
        // initialize types
        this.velocity = vel;
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        if (this.massCenter !== null) {

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
}
