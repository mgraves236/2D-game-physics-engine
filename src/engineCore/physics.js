import {gEngine} from "./core.js";
import {screen} from "./screen.js";

let _enginePhysics = (function () {
    let collision = function () {
        for (let i = 0; i < gEngine.Core.mAllObjects.length; i++) {
            for (let j = i + 1; j < gEngine.Core.mAllObjects.length; j++) {
                if (gEngine.Core.mAllObjects[i].boundTest(gEngine.Core.mAllObjects[j])) {
                    screen.mContext.strokeStye = 'green';
                    console.log('collided ' + i + ' ' + j)
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
