import {_engine} from "./engineCore/core.js";

window.addEventListener("keydown", function (event) {

    var width = _engine.Core.mWidth;
    var height = _engine.Core.mHeight;
    var context = _engine.Core.mContext;

    if (event.defaultPrevented) {
        return;
    }

    switch (event.key) {
        case "ArrowDown":

            break;
        case "ArrowUp":
            // code for "up arrow" key press.
            break;
        case "ArrowLeft":
            // code for "left arrow" key press.
            break;
        case "ArrowRight":
            // code for "right arrow" key press.
            break;
        default:
            return;
    }
    event.preventDefault();
}, true);
