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

export {screen};