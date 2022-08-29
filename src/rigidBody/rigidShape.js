import {gEngine} from "../engineCore/core.js";
import {Vector} from "../lib/vector.js";

/**
 * Abstract class that represents a rigid body
 * @class RigidShape
 */
export class RigidShape {
    /**
     * Constructor of RigidShape class,
     * create an object with the center of mass defined by a vector
     * @param {Vector} massCenter point at which center of mass is located
     * @param  {number} angle angle in radians
     */
    constructor(massCenter, angle) {
        if (this.constructor === RigidShape) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.massCenter = massCenter;
        // this.angle = angle * Math.PI / 180.0 || 0;
        this.angle = angle;
        this.boundsRadius = 0;
        gEngine.Core.mAllObjects.push(this);

    }

    update() {

    }

    displayBounds() {
    }

    /**
     * Function that implements Broad Phase Method to detect collision detection
     * @param otherShape Other object that an object might collide with
     * @return {boolean} Returns true when objects are colliding and false when they are not
     */
    boundTest(otherShape) {
        if (this.massCenter !== null && otherShape.massCenter !== null) {
            let dis1To2 = otherShape.massCenter.subtract(this.massCenter).copy();
            let radiusSum = this.boundsRadius + otherShape.boundsRadius;
            let distance = dis1To2.mag();

            if ((distance > radiusSum) || this.type === "bulletSource" || otherShape.type === "bulletSource") {
                return false;
            } else {
                return true;
            }
        }
    }

    /**
     *
     * @param area
     * @return {boolean}
     */
    isInside(area) {
        if (this.massCenter.x > area.x &&
            this.massCenter.x < area.x + area.w &&
            this.massCenter.y  > area.y &&
            this.massCenter.y  < area.y + area.h) {
            return true;
        } else {
            return false;
        }
    }

    /**
     *
     * @param dragObj
     */
    drag(dragObj) {
        let speed = this.velocity.mag();
        let dragMagnitude = dragObj.c * speed * speed;
        let drag = new Vector(0, 0, 0, 0, false);
        drag.x = this.velocity.x;
        drag.y = this.velocity.y;
        drag.normalize();
        drag.mult(dragMagnitude);
        drag.mult(-1);
        this.applyForce(drag);
    }

    /**
     *
     * @param force
     */
    applyForce(force) {
        let f = force;
        f.mult(1 / this.mass);
        this.accelerationDrag.add(f);
    }
}