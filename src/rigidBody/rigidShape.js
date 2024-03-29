import {Engine} from "../engineCore/core.js";
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
     * @param {number} mass Rigid Shape mass
     * @param  {number} angle angle in radians
     * @param friction Rigid Shape friction
     * @param restitution Rigid Shape restitution (bounciness) (how much energy is preserved after collision)
     * @param gravity consider Rigid Shape when applying gravity
     * @param info additional info
     */
    constructor(massCenter, mass,  angle, friction, restitution, gravity = true, info = "") {
        if (this.constructor === RigidShape) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.massCenter = massCenter;
        this.angle = angle;
        /**
         * Angular velocity is stored as a scalar representing the z-component magnitude of the vector
         * @type {number}
         */
        this.angularVelocity = 0;
        this.angularAcceleration = 0;
        this.boundsRadius = 0;
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.isGravity = gravity;
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
        this.additionalInfo = info;

        if (this.additionalInfo !== "fuelTank") {
            Engine.Core.mAllObjects.push(this);
        }
    }

    /**
     * Update RigidBody object with its velocity, move and rotate accordingly
     */
    update() {
        /**
         *  Symplectic Euler Integration
         */
        if (this.isGravity) {
            let gravity = Engine.Core.mGravity.scale(this.mass);
            Engine.Physics.applyForce(this, gravity);
        }
        this.velocity = this.velocity.add(this.acceleration);
        if (this.type !== "circle") {
            for (let i = 0; i < this.vertex.length; i++) {
                this.vertex[i] =  this.vertex[i].add(this.velocity);
            }
        } else {
            this.startpoint = this.startpoint.add(this.velocity)
        }
        this.angularVelocity += this.angularAcceleration;
        this.massCenter = this.massCenter.add(this.velocity);
        this.rotate(this.angularVelocity);
        this.angularAcceleration *= 0;
        // this.updateDrag();
        this.acceleration= this.acceleration.scale(0);

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
        } else {
            this.startpoint = this.startpoint.add(s);
        }

        this.massCenter= this.massCenter.add(s);
    }

    /**
     * Support changing of the mass during runtime
     * @param delta mass change
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

            if (this.isGravity) {
                let accelerationTemp = this.acceleration.copy();

                let gravity = Engine.Core.mGravity.scale(mass);
                accelerationTemp = accelerationTemp.subtract(gravity);
                gravity = Engine.Core.mGravity.scale(this.mass);
                this.acceleration =  this.acceleration.add(gravity);
            }

        }
        this.updateInertia();
    }

    updateInertia() {
    }

    displayBounds() {
    }

    /**
     * Detect collision
     * @param {Circle | Rectangle | Triangle} otherShape collided Circle
     * @param {CollisionInfo} collisionInfo collision info
     */
    collisionTest (otherShape, collisionInfo) {

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

            return !((distance > radiusSum)) ;
        }
    }
}