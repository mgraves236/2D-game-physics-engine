import {RigidShape} from "./rigidShape.js";
import {Vector} from "../lib/vector.js";
import {map, screen} from "../engineCore/screen.js";

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
    constructor(mass, center, radius, angle=0) {
        super(center, angle);
        this.type = "circle";
        // radius stored as height so that it can be used in this.isInside()
        this.height = radius;
        this.boundsRadius = this.height;
        this.massCenter = center;
        // start point of line in circle
        this.startpoint = new Vector(this.massCenter.x + this.height, this.massCenter.y, 0,0, false);

    }

    /**
     *
     * @param {number} angle Angle in radians
     */
    rotate (angle) {
        this.angle += angle;
    }

    displayBounds () {
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

    display() {
        this.displayBounds()
    }

    update() {
        super.update();

    }

   collisionTest (otherShape, collisionInfo) {
        let status = false;
        if (otherShape.type === "circle") {
            status = this.collidedCircCirc(this, otherShape, collisionInfo);
        } else if (otherShape.type === "rectangle") {
            status = otherShape.collidedRectCirc(this, collisionInfo);
        } else if (otherShape.type === "triangle") {
            status = otherShape.collidedTrianCirc(this, collisionInfo);

        } else {
            status = false;
        }
        return status;
    }

    collidedCircCirc (c1, c2, collisionInfo) {
        // let from1To2 = c2.massCenter.copy(); // normal vector from 1 to 2
        let from1To2 = new Vector(c2.massCenter.x, c2.massCenter.y,
            c1.massCenter.x, c1.massCenter.y, false);
        let radiusSum = c1.height + c2.height;
        let distance = from1To2.mag();
        if (distance > Math.sqrt(radiusSum * radiusSum)) {
            return false; // circles do not collide
        }
        if (distance !== 0) {
            // circles do not have the same mass center
            let from2To1 = new Vector(from1To2.x0, from1To2.y0,
                from1To2.x, from1To2.y, false);
            from2To1.normalize();
            let diffX = (from2To1.x - from2To1.x0);
            let diffY = (from2To1.y - from2To1.y0);
            let temp = new Vector(diffX, diffY, 0,0, false);
            temp.mult(c2.height);
            temp.x0 = from2To1.x0;
            temp.y0 = from2To1.y0;
            temp.x = temp.x + from2To1.x0;
            temp.y = temp.y + from2To1.y0;
            from1To2.normalize();
            // c2massCenterCopy.add(radiusC2);
            collisionInfo.setInfo(radiusSum - distance,
                from1To2, temp);

        } else {
            //same position
            if (c1.height > c2.height) {
                let c1massCenter = new Vector(c1.massCenter.x,c1.massCenter.y - c1.height, c1.massCenter.x, c1.massCenter.y, false);

                collisionInfo.setInfo(c1.height, new Vector(c1.massCenter.x, 1 + c1.massCenter.y, c1.massCenter.x, c1.massCenter.y, false),
                    c1massCenter);

            }
            else {
                let c2massCenter = new Vector(c2.massCenter.x,c2.massCenter.y - c2.height, c2.massCenter.x, c2.massCenter.y, false);
                // c2massCenter.draw('purple')

                collisionInfo.setInfo(c2.height, new Vector(c1.massCenter.x, 1 + c1.massCenter.y, c2.massCenter.x, c2.massCenter.y, false),
                    c2massCenter);
            }
        }
        return collisionInfo;
    }


}