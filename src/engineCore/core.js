/**
 * Create a namespace
 * @type {{}|{}}
 */
var _engine = _engine || {};
/**
 * Stores all the physics engine core functionality
 */
_engine.Core = (function () {
    let mWidth = 800;
    let mHeight = 450;
    let mCanvas = document.getElementById('canvas');
    let mContext = mCanvas.getContext('2d');
    let mAllObjects = [];
    mCanvas.height = mHeight;
    mCanvas.width = mWidth;

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
        mWidth: mWidth,
        mHeight: mHeight,
        mContext: mContext,
        map: map,
        mAllObjects: mAllObjects
    };
    return mPublic;
}());