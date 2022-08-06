import {_engineCore as engineCore} from "../engineCore/core.js";
import {PlayerShip} from "./playerShip.js"
import {map, screen} from "../engineCore/screen.js";
import {Vector} from "../lib/vector.js";

var player = engineCore.mPlayer;

function handleKeyInput(event) {
    const { keyCode, type } = event;
    const isKeyDown = type === 'keydown' ? true : false;

    if (keyCode === 37) player.rotatingLeft = isKeyDown;
    if (keyCode === 39) player.rotatingRight = isKeyDown;
    if (keyCode === 38) player.engineOn = isKeyDown;
    if (keyCode == 40) {
        let velocity = new Vector(0,0);
        player.velocity = velocity;
    }
}

// Event Listeners
document.addEventListener('keydown', handleKeyInput);
document.addEventListener('keyup', handleKeyInput);