import {Engine} from "./core.js";
import {screen} from "./screen.js";
import {CollisionInfo} from "../lib/collisionInfo.js";
import data from './config.json' assert {type: 'json'};
import {Vector} from "../lib/vector.js";

let _enginePhysics = (function () {
    // number of relaxation iteration
    const relaxationCount = data.relaxationCount;
    // percentage of separation to project objects
    const correctionRate = data.correctionRate;

    /**
     * Collision detection
     * @type {function}
     */
    let collision = function () {
        let collisionInfo = new CollisionInfo();
        // relaxation loop
        for (let k = 0; k < relaxationCount; k++) {
            // iterate over every pair of objects
            for (let i = 0; i < Engine.Core.mAllObjects.length; i++) {

                if (Engine.Core.mAllObjects[i].massCenter !== null) {

                    for (let j = i + 1; j < Engine.Core.mAllObjects.length; j++) {

                        if (Engine.Core.mAllObjects[j].massCenter !== null) {
                            // preliminary bound test
                            if (Engine.Core.mAllObjects[i].boundTest(Engine.Core.mAllObjects[j])) {
                                // collision detection with SAT
                                if (Engine.Core.mAllObjects[i].collisionTest(Engine.Core.mAllObjects[j], collisionInfo)) {
                                    // the normal must always be from object i to object j
                                    let center = Engine.Core.mAllObjects[j].massCenter.subtract(Engine.Core.mAllObjects[i].massCenter);
                                    if (collisionInfo.normal.dot(center) < 0) {
                                        collisionInfo.changeDirection();
                                    }
                                    let ctx = screen.mContext;
                                    ctx.save();
                                    ctx.beginPath();
                                    // display collision info vector
                                    // collisionInfo.display();
                                    ctx.closePath();
                                    ctx.restore();
                                    // resolve collision
                                   resolveCollision(Engine.Core.mAllObjects[i],
                                       Engine.Core.mAllObjects[j], collisionInfo)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Resolve collision using the Impulse Method
     * @param s1 one of the colliding objects
     * @param s2 one od the colliding objects
     * @param {CollisionInfo} collisionInfo collision info calculated while collision detection
     */
    let resolveCollision = function (s1, s2, collisionInfo) {
        // objects have no mass
        if ((s1.massInverse === 0) && (s2.massInverse === 0))
            return;
        // correct positions
        positionalCorrection(s1, s2, collisionInfo);
        let n = collisionInfo.normal.copy();
        // angular velocity calculation
        let start = collisionInfo.start.scale(s2.massInverse / (s1.massInverse + s2.massInverse));
        let end = collisionInfo.end.scale(s1.massInverse / (s1.massInverse + s2.massInverse));
        /**
         * Collision position
         * @type {Vector}
         */
        let p = start.add(end);
        // rx is a vector from center of shape to the collision point p
        let r1 = p.subtract(s1.massCenter);
        let r2 = p.subtract(s2.massCenter);

        // velocity = v_linear + v_angular cross R
        let v1 = s1.velocity.add(new Vector(
            -1 * s1.angularVelocity * r1.y,
            s1.angularVelocity * r1.x));
        let v2 = s2.velocity.add(new Vector(
            -1 * s2.angularVelocity * r2.y,
            s2.angularVelocity * r2.x));
        let relativeVelocity = v2.subtract(v1);

        // relative velocity in normal direction (in the collision point)
        let relativeVelocityNormal = relativeVelocity.dot(n);

        // if objects are already moving apart ignore
        if (relativeVelocityNormal > 0) {
            return;
        }

        // impulse response for each of the objects
        let restitution = Math.min(s1.restitution, s2.restitution);
        restitution = restitution !== undefined ?  restitution : s1.restitution;
        let friction = Math.min(s1.friction, s2.friction);
        console.log(friction)
        friction = friction !== undefined ?  friction : s1.friction;

        // impulse in normal direction (from s1 to s2)
        // R cross N
        let R1xN = r1.cross(n);
        let R2xN = r2.cross(n);
        // impulse scalar
        let jN = -(1 + restitution) * relativeVelocityNormal;
        jN = jN / (s1.massInverse + s2.massInverse +
                    R1xN * R1xN * s1.inertia +
                    R2xN * R2xN * s2.inertia);

        let impulse = n.scale(jN);
        // impulse = F dt = m * delta(v)
        // delta(v) = impulse / m
        s1.velocity = s1.velocity.subtract(impulse.scale(s1.massInverse));
        s2.velocity = s2.velocity.add(impulse.scale(s2.massInverse));
        // update angular velocity based on normal
        s1.angularVelocity -= R1xN * jN * s1.inertia;
        s2.angularVelocity += R2xN * jN * s2.inertia;
        // impulse in tangent direction
        /**
         * Tangent to a collision normal
         * @type {Vector}
         */
        let tangent = relativeVelocity.subtract(n.scale(relativeVelocity.dot(n)));
        // relativeVelocity.dot(tangent) should be less than 0
        tangent.normalize().scale(-1);

        let R1xT = r1.cross(tangent);
        let R2xT = r2.cross(tangent);
        // impulse scalar
        let jT = - (1 + restitution) * relativeVelocity.dot(tangent) * friction;
        jT = jT / (s1.massInverse + s2.massInverse +
                        R1xT * R1xT * s1.inertia +
                        R2xT * R2xT * s2.inertia);

        // jT with friction should be less that jN
        if (jT > jN) jT = jN;
        // impulse has the direction from s1 to s2 (opposite direction to velocity)
        impulse = tangent.scale(jT);

        s1.velocity = s1.velocity.subtract(impulse.scale(s1.massInverse));
        s2.velocity = s2.velocity.add(impulse.scale(s2.massInverse));
        // update angular velocity based on normal
        s1.angularVelocity -= R1xT * jT * s1.inertia;
        s2.angularVelocity += R2xT * jT * s2.inertia;
    }

    /**
     * Reduces overlaps between objects by the predefined constant correctionRate
     * @param s1
     * @param s2
     * @param {CollisionInfo} collisionInfo
     */
    let positionalCorrection = function (s1, s2, collisionInfo) {
        let num = collisionInfo.depth /
            (s1.massInverse + s2.massInverse) * correctionRate;
        /**
         * @type {Vector}
         */
        let correctionAmount = collisionInfo.normal.scale(num);
        s1.move(correctionAmount.scale(-s1.massInverse));
        s2.move(correctionAmount.scale(s2.massInverse));
    }

    /**
     * Add drag to objects if they are in a drag area
     */
    let drag = function() {
        /**
         * Change Rigid Shape velocity due to drag
         */
        for(let j = 0; j < Engine.Core.mAllObjects.length; j++) {
            for (let i = 0; i < Engine.Core.mDragAreas.length; i++) {
                let area = Engine.Core.mDragAreas[i];
                if (isInside(area, Engine.Core.mAllObjects[j])) {
                    applyDrag(area, Engine.Core.mAllObjects[j]);
                }
            }
        }
    }

    let  isInside = function(area, object) {
        return object.massCenter.x > area.loc.x &&
            object.massCenter.x < area.loc.x + area.w &&
            object.massCenter.y > area.loc.y &&
            object.massCenter.y < area.loc.y + area.h;
    }

    let applyDrag = function(area, object) {
        let speed = object.velocity.mag();
        let dragMagnitude = area.c * speed * speed * object.area;
        let drag = new Vector();
        drag.x = object.velocity.x;
        drag.y = object.velocity.y;
        drag = drag.normalize();
        drag = drag.scale(dragMagnitude);
        drag = drag.scale(-1);
        applyForce(object, drag);
    }

    let applyForce = function(object, force) {
        let f = force;
        f = f.scale(object.massInverse);
        object.acceleration = object.acceleration.add(f);
    }
    return {
        collision: collision,
        drag: drag,
        applyForce: applyForce
    };
}());

Engine.Physics = _enginePhysics;
export {Engine};
