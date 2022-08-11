import {RigidShape} from "./rigidShape.js";
import {Vector} from "../lib/vector.js";
import {screen} from "../engineCore/screen.js";

/***
 * Base class for circular shape rigid objects
 * @class Circle
 */
export class Circle extends RigidShape {
    constructor(mass, center, radius) {
        super(center);
        this.type = "circle";
        this.radius = radius;
        // start point of line in circle
        this.startpoint = new Vector(this.massCenter.x + this.radius, this.massCenter.y, 0,0, false);

    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.beginPath();
        ctx.arc( this.massCenter.x, this.massCenter.y,
            this.radius, 0, Math.PI * 2, true);
        //draw a line from start point toward center
        ctx.moveTo(this.startpoint.x, this.startpoint.y);
        ctx.lineTo(this.massCenter.x, this.massCenter.y);
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

}