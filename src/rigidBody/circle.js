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
     * @param angle
     * @param friction
     * @param restitution
     * @param gravity
     * @param info
     */
    constructor(mass, center, radius, angle= 0, friction= 0, restitution = 0, gravity = true, info = "") {
        super(center, mass, angle, friction, restitution, gravity, info);
        this.type = "circle";
        // radius stored as height so that it can be used in this.isInside()
        this.height = radius;
        this.boundsRadius = this.height;
        // start point of line in circle
        this.startpoint = new Vector(this.massCenter.x + this.height, this.massCenter.y);
        this.updateInertia();
    }

    /**
     *
     * @param {number} angle Angle in radians
     */
    rotate (angle) {
        this.angle += angle;
        this.startpoint = this.startpoint.rotate(angle, this.massCenter);
    }

    displayBounds () {
        let ctx = screen.mContext;
        ctx.save();
        ctx.beginPath();
        ctx.arc( this.massCenter.x, this.massCenter.y,
            this.height, 0, Math.PI * 2, true);
        // draw a line from start point toward center
        ctx.moveTo(this.startpoint.x, this.startpoint.y);
        ctx.lineTo(this.massCenter.x, this.massCenter.y);
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.restore();
    }

    display() {
        this.displayBounds()
    }

    updateInertia() {
        super.updateInertia();
        if (this.massInverse === 0) {
            this.inertia = 0;
        } else {
            // inertia = mass * radius^2
            const value = 12;
            this.inertia = this.mass * this.height * this.height / value;
        }
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
        /**
         *
         * @type {Vector}
         */
        var from1To2 = c2.massCenter.subtract(c1.massCenter);
        let radiusSum = c1.height + c2.height;
        let distance = from1To2.mag();
        if (distance > Math.sqrt(radiusSum * radiusSum)) {
            return false; // circles do not collide
        }
        if (distance !== 0) {
            // circles do not have the same mass center
            // let from2To1 = new Vector(from1To2.x0, from1To2.y0,
            //     from1To2.x, from1To2.y);
            // from2To1 = from2To1.normalize();
            // let diffX = (from2To1.x - from2To1.x0);
            // let diffY = (from2To1.y - from2To1.y0);
            // let temp = new Vector(diffX, diffY);
            // temp= temp.scale(c2.height);
            // temp.x0 = from2To1.x0;
            // temp.y0 = from2To1.y0;
            // temp.x = temp.x + from2To1.x0;
            // temp.y = temp.y + from2To1.y0;
           let normalFrom1To2 = from1To2.scale(-1).normalize();
           let radiusC2 = normalFrom1To2.scale(c2.height);
            // from1To2 = from1To2.normalize();
            // c2massCenterCopy.add(radiusC2);
            collisionInfo.setInfo(radiusSum - distance,
                from1To2.normalize(), c2.massCenter.add(radiusC2));

        } else {
            //same position
            if (c1.height > c2.height) {
                collisionInfo.setInfo(radiusSum, new Vector(0, -1), c1.massCenter.add(new Vector(0, c1.height)));
            }
            else {
                collisionInfo.setInfo(radiusSum, new Vector(0, -1), c2.massCenter.add(new Vector(0, c2.height)));

            }
        }
        return collisionInfo;
    }


}