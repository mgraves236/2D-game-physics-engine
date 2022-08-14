import data from './config.json' assert {type: 'json'};
import { Vector } from "../lib/vector.js";
import { drawLevel } from "../game/level.js";
// import {gEngine} from "../engineCore/physics.js"

/**
 * Create a namespace to store all the physics engine core functionality
 * @type {{mHeight: number, mWidth: number, mContext: *, map: (function(*))}}
 * @private
 */
var gEngine = gEngine || {};

let _engineCore = (function () {
    let mAllObjects = [];
    let mDragAreas = [];
    let mGravity = new Vector(0, data.accGravity,0,0,false);
    // let x = screen.mWidth / 2;
    // let y = screen.mHeight -100;
    // let location = new Vector(x, y);
    // let mPlayer = new PlayerShip(location);

    /**
     * Engine Loop Component
     */
    let lastRenderTime = 0;

    function mainGame(currentTime) {

        window.requestAnimationFrame(mainGame);
        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 / 60) return;
        lastRenderTime = currentTime;
        drawLevel();

        // mPlayer.update();
        // mPlayer.display();
        gEngine.Physics.collision();
        if (mDragAreas !== null) {
            for (let i = 0; i < mDragAreas.length; i++) {
                mDragAreas[i].update();
            }
        }
        if (mAllObjects !== null) {
            for (let i = 0; i < mAllObjects.length; i++) {
                mAllObjects[i].update();
                mAllObjects[i].display();
            }
        }

    }

    let mPublic = {
        initializeEngineCore: mainGame,
        mAllObjects: mAllObjects,
        mDragAreas: mDragAreas,
        mGravity: mGravity,
        //mPlayer: mPlayer,
    };
    return mPublic;
}());

gEngine.Core = _engineCore;
export {gEngine};


