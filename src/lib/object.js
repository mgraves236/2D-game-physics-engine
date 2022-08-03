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
        if (this.location.x > area.x &&
            this.location.x < area.x + area.w &&
            this.location.y > area.y &&
            this.location.y < area.y + area.h) {
            return true;
        } else {
            return false;
        }
    }

    drag(dragObj) {
        let speed = this.velocity.mag();
        let dragMagnitude = dragObj.c * speed * speed;
        let drag = new Vector(0, 0);
        drag.x = this.velocity.x;
        drag.y = map(this.velocity.y);
        drag.mult(-1);
        drag.normalize();
        drag.mult(dragMagnitude);
        drag.y = map(-drag.y);
        this.applyForce(drag);
    }

    applyForce(force) {
        let f = force;
        f.mult(1 / this.mass);
        f.y = map(f.y);
        this.accelerationDrag.add(f);
    }
}