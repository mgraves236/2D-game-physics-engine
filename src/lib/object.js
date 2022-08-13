import {Vector} from "./vector.js";
import {map} from "../engineCore/screen.js";

/**
 * Abstract Class Object
 *
 * @class Object
 */
export class Object {

    constructor() {
        if (this.constructor == Object) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    isInside(area) {
        if (this.massCenter.x > area.x &&
            this.massCenter.x < area.x + area.w &&
            this.massCenter.y > area.y &&
            this.massCenter.y < area.y + area.h) {
            return true;
        } else {
            return false;
        }
    }

    drag(dragObj) {
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

    applyForce(force) {
        let f = force;
        f.mult(1 / this.mass);
        //f.y = map(f.y);
        this.accelerationDrag.add(f);
    }

    update() {
        throw new Error("Method 'update()' must be implemented.");
    }

    display() {
        throw new Error("Method 'display()' must be implemented.");
    }
}