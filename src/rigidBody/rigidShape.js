import {gEngine} from "../engineCore/core.js";
import {Vector} from "../lib/vector.js";
import data from './../engineCore/config.json' assert {type: 'json'};

/**
 * Abstract class that represents a rigid body
 * @class RigidShape
 */
export class RigidShape {
    /**
     * Constructor of RigidShape class,
     * create an object with the center of mass defined by a vector
     * @param {Vector} massCenter point at which center of mass is located
     * @param {number} mass
     * @param  {number} angle angle in radians
     * @param friction
     * @param restitution
     */
    constructor(massCenter, mass,  angle, friction, restitution) {
        if (this.constructor === RigidShape) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.massCenter = massCenter;
        this.angle = angle;
        this.angularVelocity = 0;
        this.angularAcceleration = 0;
        this.boundsRadius = 0;
        this.velocity = new Vector();
        this.acceleration = new Vector();
        let gravity = gEngine.Core.mGravity.copy();
        gravity.scale(mass);
        this.acceleration.add(gravity);
        this.accelerationDrag = new Vector();
        this.type = "";
        this.mass = mass;
        if (mass === 0) {
            this.massInverse = 0;
        } else {
            this.massInverse = 1 / this.mass;
        }
        this.inertia = 0;
        this.friction = friction;
        this.restitution = restitution;
        gEngine.Core.mAllObjects.push(this);

    }

    update() {
        // Symplectic Euler Integration
        this.velocity.add(this.acceleration);
        if (this.type !== "circle") {
            for (let i = 0; i < this.vertex.length; i++) {
                this.vertex[i] =  this.vertex[i].add(this.velocity);
            }
        }

        this.massCenter = this.massCenter.add(this.velocity);
        let accelerationTemp = this.acceleration.copy();

        // this.acceleration.scale(0);
        this.angularVelocity += this.angularAcceleration;
        this.rotate(this.angularVelocity);
        this.angularAcceleration *= 0;
    }

    updateDrag() {
        for (let i = 0; i < gEngine.Core.mDragAreas.length; i++) {
            let area = gEngine.Core.mDragAreas[i];
            if (this.isInside(area)) {
                this.drag(area);
                this.velocity = this.velocity.add(this.accelerationDrag);
                this.accelerationDrag= this.accelerationDrag.scale(0);
            }
        }
    }

    /**
     * Displace the object by the given vector
     * @param {Vector} s object displacement
     */
    move(s) {
        if (this.type !== "circle") {
            for (let i = 0; i < this.vertex.length; i++) {
                this.vertex[i] = this.vertex[i].add(s);
            }
        }

        this.massCenter= this.massCenter.add(s);
    }

    /**
     * Support changing of the mass during runtime
     * @param delta
     */
    updateMass(delta) {
        if ( this.mass === 0) return;
        let mass = this.mass;
        this.mass += delta;
        if (this.mass <= 0) {
            this.massInverse = 0;
            this.velocity = new Vector();
            this.acceleration = new Vector();
            this.angularVelocity = new Vector();
            this.angularAcceleration = new Vector();
        } else {
            this.massInverse = 1 / this.mass;
            let accelerationTemp = this.acceleration.copy();
            let gravity = gEngine.Core.mGravity.scale(mass);
            accelerationTemp = accelerationTemp.subtract(gravity);
            gravity = gEngine.Core.mGravity.scale(this.mass);
            this.acceleration =  this.acceleration.add(gravity);
        }
        this.updateInertia();
    }

    updateInertia() {
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

            return !((distance > radiusSum) || this.type === "bulletSource" || otherShape.type === "bulletSource");
        }
    }

    /**
     *
     * @param area
     * @return {boolean}
     */
    isInside(area) {
        return this.massCenter.x > area.x &&
            this.massCenter.x < area.x + area.w &&
            this.massCenter.y > area.y &&
            this.massCenter.y < area.y + area.h;
    }

    /**
     *
     * @param dragObj
     */
    drag(dragObj) {
        let speed = this.velocity.mag();
        let dragMagnitude = dragObj.c * speed * speed;
        let drag = new Vector();
        drag.x = this.velocity.x;
        drag.y = this.velocity.y;
        drag = drag.normalize();
        drag = drag.scale(dragMagnitude);
        drag = drag.scale(-1);
        this.applyForce(drag);
    }

    /**
     *
     * @param {Vector} force
     */
    applyForce(force) {
        let f = force;
        f = f.scale(this.massInverse);
        this.accelerationDrag = this.accelerationDrag.add(f);
    }
}