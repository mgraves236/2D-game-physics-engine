import { screen } from "../engineCore/screen.js";
import {gEngine} from "../engineCore/core.js";
import {Rectangle} from "../rigidBody/rectangle.js";

/**
 * A class that represent a fuel tank
 * @class FuelTank
 */
export class FuelTank extends Rectangle {

    /**
     * Constructor of FuelTank class
     * @param loc location of the object
     * @param angle angle of the object
     */
    constructor(loc, angle = 0) {
        super(1, loc, 20, 25, angle, 1, 0, false, "fuelTank");
    }

    update() {

    }

    /**
     * Method to check if player can pick up the tank
     * @returns {boolean}
     */
    pickUp() {
        if (( gEngine.Player.massCenter.x >  this.massCenter.x - 20) &&
            ( gEngine.Player.massCenter.x <  this.massCenter.x + 20)) {
            gEngine.Player.fuel += 200;
            return true;
        } else if (( gEngine.Player.massCenter.y > this.massCenter.y - 20) &&
            ( gEngine.Player.massCenter.y < this.massCenter.y + 20)) {
            gEngine.Player.fuel += 200;
            return true;
        }
        return false;
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.translate(this.massCenter.x, this.massCenter.y );
        // angle is in radians
        ctx.rotate(this.angle);
        ctx.translate(0,0);

        ctx.translate(0,-this.height / 2)
        let p = new Path2D('M6.4,6V3.4C6.4,2,5.3,0.9,4,0.9h-7.1c-1.4,0-2.5,1.1-2.5,2.5V6c-2.1,0.5-3.7,2.4-3.7,4.6v9.9c0,2.6,2.1,4.7,4.7,4.7h9.9c2.6,0,4.7-2.1,4.7-4.7v-9.9C10.1,8.3,8.5,6.4,6.4,6z');
        ctx.fillStyle = '#1f1f1f';
        ctx.fill(p);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = '1.5';
        ctx.stroke(p);
        let p2 = new Path2D('M2.8,14.7L2.8,14.7L2.8,14.7C2.8,14.7,2.8,14.6,2.8,14.7l-2.6-4.6l-2.6,4.5c0,0,0,0,0,0l0,0h0c-0.1,0.3-0.2,0.7-0.2,1.1c0,1.6,1.3,2.9,2.9,2.9S3,17.3,3,15.8C3,15.4,2.9,15,2.8,14.7z');
        ctx.fillStyle = 'white';
        ctx.fill(p2);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.restore();
        ctx.save()
        // this.displayBounds();
        ctx.restore();
    }
}