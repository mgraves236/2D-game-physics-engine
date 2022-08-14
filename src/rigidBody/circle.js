import {RigidShape} from "./rigidShape.js";
import {Vector} from "../lib/vector.js";
import {screen} from "../engineCore/screen.js";

/***
 * Base class for circular shape rigid objects
 * @class Circle
 */
export class Circle extends RigidShape {
    /**
     *
     * @param mass
     * @param center
     * @param radius
     */
    constructor(mass, center, radius) {
        super(center);
        this.type = "circle";
        // radius stored as height so that it can be used in this.isInside()
        this.height = radius;
        this.boundsRadius = this.height;
        // start point of line in circle
        this.startpoint = new Vector(this.massCenter.x + this.radius, this.massCenter.y, 0,0, false);

    }

    displayBounds() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.beginPath();
        ctx.arc( this.massCenter.x, this.massCenter.y,
            this.height, 0, Math.PI * 2, true);
        //draw a line from start point toward center
        // ctx.moveTo(this.startpoint.x, this.startpoint.y);
        // ctx.lineTo(this.massCenter.x, this.massCenter.y);
        ctx.closePath();
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.restore();
    }

    display () {
    this.displayBounds()
    }

    update() {
        super.update();
    }

}