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
        this.area = 1;
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
        // integration - Symplectic Euler Integration
        let dt = Engine.Core.frameTime;
        this.velocity = this.velocity.add(this.acceleration.scale(dt));
        this.angularVelocity += this.angularAcceleration * dt;
        this.move(this.velocity.scale(dt));
        // this.massCenter = this.massCenter.add(this.velocity);
        this.rotate(this.angularVelocity * dt);


        // integration Runge-Kutta
        // only gravity -- constant acceleration
       //
       //  let  isInside = function(area, object) {
       //      return object.massCenter.x > area.loc.x &&
       //          object.massCenter.x < area.loc.x + area.w &&
       //          object.massCenter.y > area.loc.y &&
       //          object.massCenter.y < area.loc.y + area.h;
       //  }
       //  let index = -10000;
       //  let area = null;
       //  for (let i = 0; i < Engine.Core.mDragAreas.length; i++) {
       //      if (isInside(Engine.Core.mDragAreas[i], this)) {
       //          index = i;
       //          area = Engine.Core.mDragAreas[i];
       //      }
       //  }
       //
       // if(index === -10000) {
       //      let k1_velocity = this.velocity.y;
       //      let k1_acceleration = this.acceleration.y;
       //      let k2_velocity = this.velocity.y + k1_acceleration + Engine.Core.frameTime * 0.5;
       //      // in considered situation acceleration is constant
       //      let k2_acceleration = k1_acceleration;
       //      let k3_velocity = this.velocity.y + k2_acceleration + Engine.Core.frameTime * 0.5;
       //      let k3_acceleration = k2_acceleration;
       //      let k4_velocity = this.velocity.y + k3_acceleration + Engine.Core.frameTime;
       //      let k4_acceleration = k3_acceleration;
       //      this.velocity.y += (k1_acceleration + (k2_acceleration + k3_acceleration) * 2.0 + k4_acceleration) * 1 / 6 * Engine.Core.frameTime;
       //      // this.massCenter.y += (k1_velocity + (k2_velocity + k3_velocity) * 2.0 + k4_velocity) * 1 / 6 * Engine.Core.frameTime;
       //     this.move(new Vector(0, (k1_velocity + (k2_velocity + k3_velocity) * 2.0 + k4_velocity) * 1 / 6 * Engine.Core.frameTime));
       //  } else {
       //     // drag
       //     let k1_velocity = this.velocity.y;
       //     let k1_acceleration = this.acceleration.y - 0.5 * area.c * k1_velocity * k1_velocity * this.area;
       //     let k2_velocity = this.velocity.y + k1_acceleration + Engine.Core.frameTime * 0.5;
       //     // in considered situation acceleration is constant
       //     let k2_acceleration = k1_acceleration - 0.5 * area.c * k2_velocity * k2_velocity * this.area;
       //     let k3_velocity = this.velocity.y + k2_acceleration + Engine.Core.frameTime * 0.5;
       //     let k3_acceleration = k2_acceleration - 0.5 * area.c * k3_velocity * k3_velocity * this.area;
       //     let k4_velocity = this.velocity.y + k3_acceleration + Engine.Core.frameTime;
       //     let k4_acceleration = k3_acceleration - 0.5 * area.c * k4_velocity * k4_velocity * this.area;
       //     this.velocity.y += (k1_acceleration + (k2_acceleration + k3_acceleration) * 2.0 + k4_acceleration) * 1 / 6 * Engine.Core.frameTime;
       //     // this.massCenter.y += (k1_velocity + (k2_velocity + k3_velocity) * 2.0 + k4_velocity) * 1 / 6 * Engine.Core.frameTime;
       //     this.move(new Vector(0, (k1_velocity + (k2_velocity + k3_velocity) * 2.0 + k4_velocity) * 1 / 6 * Engine.Core.frameTime));
       // }


        this.angularAcceleration *= 0;
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