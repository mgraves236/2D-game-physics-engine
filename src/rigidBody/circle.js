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
        this.massCenter = center;
        // start point of line in circle
        this.startpoint = new Vector(this.massCenter.x + this.height, this.massCenter.y, 0,0, false);

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

   collisionTest (otherShape, collisionInfo) {
        let status = false;
        if (otherShape.type === "circle") {
            console.log('collided')
            status = this.collidedCircCirc (this, otherShape, collisionInfo);
        } else {
            status = false;
        }
        return status;
    }

    collidedCircCirc (c1, c2, collisionInfo) {
        let from1To2 = c2.massCenter.copy(); // normal vector from 1 to 2
        from1To2.subtract(c1.massCenter);
        let radiusSum = c1.height + c2.height;
        let distance = from1To2.mag();
        if (distance > Math.sqrt(radiusSum * radiusSum)) {
            return false; // circles do not collide
        }
        if (distance !== 0) {
            // circles do not have the same mass center
            let from2To1 = from1To2.copy();
            from2To1.mult(-1);
            from2To1.normalize();
            let radiusC2 = from2To1.copy();
            radiusC2.mult(c2.height);
            from1To2.normalize();
            collisionInfo.setInfo(radiusSum - distance,
                from1To2, c2.massCenter.add(radiusC2));
        } else {
            //same position
            if (c1.height > c2.height)
                collisionInfo.setInfo(radiusSum, new Vector(0, -1,0,0,false),
                    c1.massCenter.add(new Vector(0, c1.massCenter, 0, 0, false)));
            else
                collisionInfo.setInfo(radiusSum, new Vector(0, -1, 0,0,false),
                    c2.massCenter.add(new Vector(0, c2.massCenter, 0,0,false)));
        }
    }


}