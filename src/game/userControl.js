import { _engineCore as engineCore } from "../engineCore/core.js";
import { PlayerShip } from "./playerShip.js"
import {map, screen} from "../engineCore/screen.js";
import {Vector} from "../lib/vector.js";

window.addEventListener("keydown", function (event) {

    var width = engineCore.mWidth;
    var height = engineCore.mHeight;
    var context = engineCore.mContext;

    if (event.defaultPrevented) {
        return;
    }


    switch (event.key) {
        case "Shift":
            let velocity = new Vector(0, 0);
            if (engineCore.mPlayer.orientation.x < engineCore.mPlayer.x) {
                velocity.x = -engineCore.mPlayer.orientation.x;
            } else {
                velocity.x = engineCore.mPlayer.orientation.x;
            }
            velocity.y = map(engineCore.mPlayer.orientation.y);
            velocity.normalize();
            engineCore.mPlayer.velocity = velocity;
            break;
        case "ArrowLeft":
            engineCore.mPlayer.orientation = engineCore.mPlayer.orientation.rotate(-5);
            console.log(engineCore.mPlayer.orientation.x);
            setVelocity();
            break;
        case "ArrowRight":
            engineCore.mPlayer.orientation = engineCore.mPlayer.orientation.rotate(5);
            setVelocity();
            break;
            case "ArrowDown":
                console.log('here')
                let stop = new Vector(0,0, engineCore.mPlayer.x, engineCore.mPlayer.y);
                engineCore.mPlayer.velocity = stop;
                break;
        default:
            return;
    }
    event.preventDefault();
}, true);

function setVelocity() {

    if (engineCore.mPlayer.velocity.x !== 0 && engineCore.mPlayer.velocity !== 0) {
        let velocity = new Vector(0, 0);
        if (engineCore.mPlayer.orientation.x < engineCore.mPlayer.x) {
            velocity.x = -engineCore.mPlayer.orientation.x;
        } else {
            velocity.x = engineCore.mPlayer.orientation.x;
        }
        velocity.y = map(engineCore.mPlayer.orientation.y);
        velocity.normalize();
        engineCore.mPlayer.velocity = velocity;
    }
}