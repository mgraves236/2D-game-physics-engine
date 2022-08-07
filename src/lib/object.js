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
        console.log('velocity')
        console.log(this.velocity)
        let dragMagnitude = dragObj.c * speed * speed;
        let drag = new Vector(0, 0, 0,0,false);
        drag.x = this.velocity.x;
        drag.y = this.velocity.y;
        console.log(drag)
        drag.normalize();
        console.log(drag)
        drag.mult(dragMagnitude);
        console.log(drag)
        drag.mult(-1);
        console.log(drag)
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