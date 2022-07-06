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
    mCanvas.height = mHeight;
    mCanvas.width = mWidth;
    let mPublic = {
        mWidth: mWidth,
        mHeight: mHeight,
        mContext: mContext
    }
    return mPublic;
}());