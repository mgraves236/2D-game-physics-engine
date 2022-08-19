import {gEngine} from "./core.js";
import {screen} from "./screen.js";
import {CollisionInfo} from "../lib/collisionInfo.js";

let _enginePhysics = (function () {
    let collision = function () {
        let collisionInfo = new CollisionInfo();
        for (let i = 0; i < gEngine.Core.mAllObjects.length; i++) {
            if (gEngine.Core.mAllObjects[i].massCenter !== null) {
                for (let j = i + 1; j < gEngine.Core.mAllObjects.length; j++) {
                    if (gEngine.Core.mAllObjects[j].massCenter !== null) {
                        if (gEngine.Core.mAllObjects[i].boundTest(gEngine.Core.mAllObjects[j])) {
                            // console.log('collided ' + i + ' ' + j)

                            if (gEngine.Core.mAllObjects[i].collisionTest(gEngine.Core.mAllObjects[j], collisionInfo)) {
                                // the normal must always be from object i to object j
                                let center = gEngine.Core.mAllObjects[j].massCenter.copy();
                                center.subtract(gEngine.Core.mAllObjects[i].massCenter);
                                if (collisionInfo.normal.dot(center) < 0) {
                                    collisionInfo.changeDirection();
                                }
                                console.log(collisionInfo)
                                collisionInfo.display();
                            }
                        }
                    }
                }
            }
        }
    }

    let mPublic = {
        collision: collision
    };
    return mPublic;
}());

gEngine.Physics = _enginePhysics;
export {gEngine};
