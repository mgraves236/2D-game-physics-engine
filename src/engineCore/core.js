import data from './config.json' assert {type: 'json'};
import {Vector} from "../lib/vector";
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
     * Function to map y coordinate into a system with changed origin to the bottom of the canvas
     * To reverse mapping enter a negative parameter, i.e. -a
     * @param a y coordinate that will be mapped
     * @return {number} mapped y coordinate
     */
    let map = (a) =>  mHeight - a;
    /**
     *
     * @type {{mHeight: number, mWidth: number, mContext: *, map: (function(*))}} TODO czy to do dokumentacji
     */
    let mPublic = {
        mWidth: mCanvas.weight,
        mHeight: mCanvas.height,
        mContext: mContext,
        map: map,
        mAllObjects: mAllObjects,
        mGravity: new Vector(0, data.accGravity),
        /***
         * Enable/disable object movements
         * @type boolean
         */
        mMovement: false
    };
    return mPublic;
}());