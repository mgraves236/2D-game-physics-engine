import {RigidShape} from "./rigidShape.js";
import {Vector} from "../lib/vector.js";
import {screen} from "../engineCore/screen.js";

/***
 * Base class for circular shape rigid objects
 * @class Circle
 */
export class Circle extends RigidShape {
    /**
     * Constructor of Circle class
     * @param {number} mass Circle mass
     * @param {Vector} center Circle center location
     * @param {number} radius Circle radius
     * @param {number} angle Circle angle in radians
     * @param {number} friction Circle friction
     * @param {number} restitution Circle restitution (bounciness) (how much energy is preserved after collision)
     * @param {boolean} gravity consider Circle when applying gravity
     * @param {string} info additional info
     */
    constructor(mass, center, radius, angle= 0, friction= 0, restitution = 0, gravity = true, info = "") {
        super(center, mass, angle, friction, restitution, gravity, info);
        this.type = "circle";
        // radius stored as height so that it can be used in Engine.Physics.drag.isInside()
        this.height = radius;
        this.boundsRadius = this.height;
        this.area = Math.PI * this.height * this.height;
        // start point of line in circle
        this.startpoint = new Vector(this.massCenter.x + this.height, this.massCenter.y);
        this.updateInertia();
    }

    /**
     * Rotate circle
     * @param {number} angle rotation angle in radians
     */
    rotate (angle) {
        this.angle += angle;
        this.startpoint = this.startpoint.rotate(angle, this.massCenter);
    }

    /**
     * Display hit box
     */
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
        if (this.additionalInfo === "terrain") {
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'black';
            ctx.fill();

        } else {
            ctx.strokeStyle = 'white';
        }
        ctx.stroke();
        ctx.restore();
    }

    display() {
        this.displayBounds()
    }

    /**
     * Set and update inertia
     */
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

    /**
     * Check if collision occurred, call specified methods to handle collision
     * @param otherShape other shape in the collision event
     * @param collisionInfo collision info
     * @returns {boolean} did the collision occur
     */
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

    /**
     * Handle collision between circles
     * @param c1 first circle
     * @param c2 second circle
     * @param collisionInfo collision info
     * @returns {boolean|CollisionInfo}
     */
    collidedCircCirc (c1, c2, collisionInfo) {
        /**
         * @type {Vector}
         */
        let from1To2 = c2.massCenter.subtract(c1.massCenter); // normal vector from 1 to 2
        let radiusSum = c1.height + c2.height;
        let distance = from1To2.mag();
        if (distance > Math.sqrt(radiusSum * radiusSum)) {
            return false; // circles do not collide
        }
        if (distance !== 0) {
            // circles do not have the same mass center
           let normalFrom1To2 = from1To2.scale(-1).normalize();
           let radiusC2 = normalFrom1To2.scale(c2.height);
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