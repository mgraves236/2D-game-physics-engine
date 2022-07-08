import data from './config.json' assert {type: 'json'};
import {Vector} from "../lib/vector.js";
export {_engine};

/**
 * Create a namespace
 * @type {{}|{}}
 */
var _engine = _engine || {};
/**
 * Stores all the physics engine core functionality
 */
_engine.Core = (function () {

    let mCanvas = document.getElementById('canvas');
    let mContext = mCanvas.getContext('2d');
    let mAllObjects = [];
    mCanvas.height = data.canvasHeight;
    mCanvas.width = data.canvasWidth;

    /**
     *
     * @type {{mHeight: number, mWidth: number, mContext: *, map: (function(*))}} TODO czy to do dokumentacji
     */
    let mPublic = {
        mWidth: mCanvas.weight,
        mHeight: mCanvas.height,
        mContext: mContext,
        mAllObjects: mAllObjects,
      //  mGravity: new Vector(0, data.accGravity),
        /***
         * Enable/disable object movements
         * @type boolean
         */
        mMovement: false
    };
    return mPublic;
}());