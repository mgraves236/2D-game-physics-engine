import { _engineCore as engineCore } from "../engineCore/core.js";

window.addEventListener("keydown", function (event) {

    var width = engineCore.mWidth;
    var height = engineCore.mHeight;
    var context = engineCore.mContext;

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
