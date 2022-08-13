import {_engineCore} from "../engineCore/core.js";
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
     */
    constructor(massCenter) {
        if (this.constructor == RigidShape) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.massCenter = massCenter;
        this.angle = 0;
        _engineCore.mAllObjects.push(this); /* TODO push in constructors of other classes*/

    }

    update() {
    }

    displayBounds() {
    }

    /**
     *
     * @param area
     * @return {boolean}
     */
    isInside(area) {
        if (this.massCenter.x > area.x &&
            this.massCenter.x < area.x + area.w &&
            this.massCenter.y > area.y &&
            this.massCenter.y < area.y + area.h) {
            console.log('inside')
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
        console.log('here')
        let speed = this.velocity.mag();
        let dragMagnitude = dragObj.c * speed * speed;
        let drag = new Vector(0, 0, 0,0,false);
        drag.x = this.velocity.x;
        drag.y = this.velocity.y;
        drag.normalize();
        drag.mult(dragMagnitude);
        drag.mult(-1);
        this.applyForce(drag);
    }
    // /**
    //  *
    //  * @param force
    //  */
    applyForce(force) {
        let f = force;
        console.log(f)
        console.log(this.massCenter)
        f.mult(1 / this.mass);
        this.accelerationDrag.add(f);
    }
}