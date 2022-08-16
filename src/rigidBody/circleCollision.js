import {Circle} from "./circle.js";
import {Vector} from "../lib/vector.js";

Circle.prototype.collisionTest = function (otherShape, collisionInfo) {
    let status = false;
    if (otherShape.type === "circle") {
        status = this.collidedCircCirc (this, otherShape, collisionInfo);
    } else {
        status = false;
    }
    return status;
}

Circle.prototype.collidedCircCirc = function (c1, c2,
collisionInfo) {
    let from1To2 = c2.massCenter.subtract(c1.massCenter); // normal vector from 1 to 2
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

