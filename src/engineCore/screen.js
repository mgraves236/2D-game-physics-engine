import data from "./config.json" assert {type: 'json'};

var screen = (function () {
    let mCanvas = document.getElementById('canvas');
    let mContext = mCanvas.getContext('2d');
    mCanvas.height = data.canvasHeight;
    mCanvas.width = data.canvasWidth;

    let mPublic = {
        mWidth: mCanvas.width,
        mHeight: mCanvas.height,
        mContext: mContext
    }
    return mPublic;
}());

/**
 * Function to map y coordinate into a system with changed origin to the bottom of the canvas
 * To reverse mapping enter a negative parameter, i.e. -a
 * @param a y coordinate that will be mapped
 * @return {number} mapped y coordinate
 */
function map(a) {
    return screen.mHeight - a;
}

export {screen, map};