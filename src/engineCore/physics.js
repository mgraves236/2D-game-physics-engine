import {gEngine} from "./core.js";
import {screen} from "./screen.js";
import {CollisionInfo} from "../lib/collisionInfo.js";

let _enginePhysics = (function () {
    // number of relaxation iteration
    const relaxationCount = 15;
    // percentage of separation to project objects
    const correctionRate = 0.09;

    /**
     * Collision detection
     */
    let collision = function () {
        console.log(gEngine.Core.mAllObjects)
        let collisionInfo = new CollisionInfo();
        for (let k = 0; k < gEngine.Core.mAllObjects.length; k++) {

            for (let i = 0; i < gEngine.Core.mAllObjects.length; i++) {
                if (gEngine.Core.mAllObjects[i].massCenter !== null) {
                    for (let j = i + 1; j < gEngine.Core.mAllObjects.length; j++) {
                        if (gEngine.Core.mAllObjects[j].massCenter !== null) {
                            if (gEngine.Core.mAllObjects[i].boundTest(gEngine.Core.mAllObjects[j])) {
                                if (gEngine.Core.mAllObjects[i].collisionTest(gEngine.Core.mAllObjects[j], collisionInfo)) {
                                    // console.log('collided ' + i + ' ' + j)

                                    // the normal must always be from object i to object j
                                    let center = gEngine.Core.mAllObjects[j].massCenter.copy();
                                    center.subtract(gEngine.Core.mAllObjects[i].massCenter);
                                    if (collisionInfo.normal.dot(center) < 0) {
                                        collisionInfo.changeDirection();
                                    }
                                    let ctx = screen.mContext;
                                    ctx.save();
                                    ctx.beginPath();
                                    collisionInfo.display();
                                    ctx.closePath();
                                    ctx.restore();
                                    // resolveCollision(gEngine.Core.mAllObjects[i],
                                    //     gEngine.Core.mAllObjects[j], collisionInfo)
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

    }

    /**
     * Reduces overlaps between objects by the predefined constant corerctionrate
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
        let correctionAmount = collisionInfo.normal.copy();
        correctionAmount.scale(num);
        let correctionAmount2 = correctionAmount.copy();
        correctionAmount.scale(-s1.massInverse);
        correctionAmount2.scale(s2.massInverse);
        s1.move(correctionAmount);
        s2.move(correctionAmount2);
    }

    return {
        collision: collision
    };
}());

gEngine.Physics = _enginePhysics;
export {gEngine};
