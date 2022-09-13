import {gEngine} from "./core.js";
import {screen} from "./screen.js";
import {CollisionInfo} from "../lib/collisionInfo.js";
import data from './config.json' assert {type: 'json'};
import {Vector} from "../lib/vector.js";

function handleBullet(i, j) {
    /* TODO lives--*/
    gEngine.Core.mAllObjects[i].massCenter = new Vector(-100, -100);
    gEngine.Core.mAllObjects[i].velocity = new Vector();
    gEngine.Core.mAllObjects[i].acceleration = new Vector();
    gEngine.Core.mAllObjects[i].accelerationDrag = new Vector();

    // if (gEngine.Core.mAllObjects[j].additionalInfo === "player") {
    //     gEngine.Player.loseLife();
    // }
}

let _enginePhysics = (function () {
    // number of relaxation iteration
    const relaxationCount = data.relaxationCount;
    // percentage of separation to project objects
    const correctionRate = data.correctionRate;

    /**
     * Collision detection
     */
    let collision = function () {
        let collisionInfo = new CollisionInfo();
        for (let k = 0; k < gEngine.Core.mAllObjects.length; k++) {

            for (let i = 0; i < gEngine.Core.mAllObjects.length; i++) {
                if (gEngine.Core.mAllObjects[i].massCenter !== null) {
                    for (let j = i + 1; j < gEngine.Core.mAllObjects.length; j++) {

                        // ignore collisions between terrain elements, borders, bullet sources and borders
                        // and player bullets and player
                        if ((gEngine.Core.mAllObjects[i].additionalInfo === "terrain" &&
                            gEngine.Core.mAllObjects[j].additionalInfo === "terrain") ||
                            (gEngine.Core.mAllObjects[i].additionalInfo === "border" &&
                                gEngine.Core.mAllObjects[j].additionalInfo === "border") ||
                            (gEngine.Core.mAllObjects[i].additionalInfo === "border" &&
                                gEngine.Core.mAllObjects[j].additionalInfo === "terrain") ||
                            (gEngine.Core.mAllObjects[i].additionalInfo === "terrain" &&
                                gEngine.Core.mAllObjects[j].additionalInfo === "border") ||
                            (gEngine.Core.mAllObjects[i].additionalInfo === "bulletSource" &&
                                gEngine.Core.mAllObjects[j].additionalInfo !== "playerBullet") ||
                            (gEngine.Core.mAllObjects[j].additionalInfo === "bulletSource" &&
                                gEngine.Core.mAllObjects[i].additionalInfo !== "playerBullet") ||
                            (gEngine.Core.mAllObjects[i].additionalInfo === "playerBullet" &&
                                gEngine.Core.mAllObjects[j].additionalInfo === "player") ||
                            (gEngine.Core.mAllObjects[i].additionalInfo === "player" &&
                                gEngine.Core.mAllObjects[j].additionalInfo === "playerBullet")) {
                            continue;
                            }

                        if (gEngine.Core.mAllObjects[j].massCenter !== null) {
                            if (gEngine.Core.mAllObjects[i].boundTest(gEngine.Core.mAllObjects[j])) {
                                if (gEngine.Core.mAllObjects[i].collisionTest(gEngine.Core.mAllObjects[j], collisionInfo)) {
                                    // check if player hit a bunker
                                    if (gEngine.Core.mAllObjects[i].additionalInfo === "bulletSource" &&
                                        gEngine.Core.mAllObjects[j].additionalInfo === "playerBullet") {
                                        gEngine.Core.mAllObjects[i].takeDamage();
                                        continue;
                                    } else if  (gEngine.Core.mAllObjects[i].additionalInfo === "playerBullet" &&
                                        gEngine.Core.mAllObjects[j].additionalInfo === "bulletSource") {
                                        gEngine.Core.mAllObjects[j].takeDamage();
                                        continue;
                                    }

                                    // decrease player lives when they crush into a terrain or get hit by an enemy bullet
                                    if ((gEngine.Core.mAllObjects[i].additionalInfo === "bunkerBullet")
                                        && gEngine.Core.mAllObjects[j].additionalInfo === "player") {
                                        gEngine.Core.mAllObjects[j].loseLife();
                                    } else if ((gEngine.Core.mAllObjects[j].additionalInfo === "bunkerBullet")
                                         && gEngine.Core.mAllObjects[i].additionalInfo === "player") {
                                        gEngine.Core.mAllObjects[i].loseLife();
                                    }

                                    //end game when player crashes into terrain
                                    if (gEngine.Core.mAllObjects[i].additionalInfo === "terrain"
                                        && gEngine.Core.mAllObjects[j].additionalInfo === "player") {
                                        gEngine.EndGame = true;
                                    } else if (gEngine.Core.mAllObjects[j].additionalInfo === "terrain"
                                        && gEngine.Core.mAllObjects[i].additionalInfo === "player") {
                                        gEngine.EndGame = true;
                                    }


                                    // delete bullets when they collide with each other or other objects
                                    if (gEngine.Core.mAllObjects[i].additionalInfo === "bunkerBullet" ||
                                        gEngine.Core.mAllObjects[i].additionalInfo === "playerBullet") {
                                        handleBullet(i,j);
                                        continue;
                                    }
                                    if (gEngine.Core.mAllObjects[j].additionalInfo === "bunkerBullet" ||
                                        gEngine.Core.mAllObjects[j].additionalInfo === "playerBullet") {
                                        handleBullet(j,i);
                                        continue;
                                    }

                                    // the normal must always be from object i to object j
                                    let center = gEngine.Core.mAllObjects[j].massCenter.subtract(gEngine.Core.mAllObjects[i].massCenter);
                                    if (collisionInfo.normal.dot(center) < 0) {
                                        collisionInfo.changeDirection();
                                    }
                                    let ctx = screen.mContext;
                                    ctx.save();
                                    ctx.beginPath();
                                    collisionInfo.display();
                                    ctx.closePath();
                                    ctx.restore();
                                    resolveCollision(gEngine.Core.mAllObjects[i],
                                        gEngine.Core.mAllObjects[j], collisionInfo)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     *
     * @param s1
     * @param s2
     * @param {CollisionInfo} collisionInfo
     */
    let resolveCollision = function (s1, s2, collisionInfo) {
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
        let restitution = Math.min(s1.restitution, s2.restitution) || s1.restitution;
        let friction = Math.min(s1.friction, s2.friction) || s1.friction;
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
         *
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

    return {
        collision: collision
    };
}());

gEngine.Physics = _enginePhysics;
export {gEngine};
