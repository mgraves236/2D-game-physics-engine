import data from './config.json' assert { type: 'json' };
import { Vector } from "../lib/vector.js";
import { drawLevel } from "../game/level.js";
import {bulletSource} from "../bullet/source.js";

/**
 * Create a namespace to store all the physics engine core functionality
 * @type {{mHeight: number, mWidth: number, mContext: *, map: (function(*))}}
 * @private
 */
var _engineCore = (function () {
    let mAllObjects = [];
    let mGravity = new Vector(0, data.accGravity);
    /**
     * Variables to implement the Engine Loop Component
     */
    let mCurrentTime, mElapsedTime, mPreviousTime = Date.now();
    let mLagTime = 0;
    const kFPS = 60; // Frames per second
    const kFrameTime = 1 / kFPS;
    let mUpdateIntervalInSeconds = kFrameTime;
    const kMPF = 1000 * kFrameTime; // Milliseconds per frame.

    let lastRenderTime = 0;
    function mainGame(currentTime) {

        window.requestAnimationFrame(mainGame);
        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 / 60) return;
        lastRenderTime = currentTime;
       // console.log("1 " + mAllObjects[0].bulletsArr[0].location.y)
       // console.log("2 " + mAllObjects[0].bulletsArr[1].location.y)
        drawLevel();
        if (mAllObjects !== null) {
            for (let i = 0; i < mAllObjects.length; i++) {
                mAllObjects[i].update();
                // engineCore.mAllObjects[0].display();
                mAllObjects[i].display();
            }
        }
    }

    let mPublic = {
        initializeEngineCore: mainGame,
        mAllObjects: mAllObjects,
        mGravity: mGravity,
        /***
         * Enable/disable object movements
         * @type boolean
         */
        mMovement: false
    };
    return mPublic;
}());

export {_engineCore};


