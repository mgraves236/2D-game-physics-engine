import data from './config.json' assert { type: 'json' };
import { Vector } from "../lib/vector.js";

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

    let mPublic = {
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


