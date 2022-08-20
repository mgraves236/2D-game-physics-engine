import {Vector} from "../lib/vector.js";
import data from './../engineCore/config.json' assert {type: 'json'};
import {gEngine} from "../engineCore/core.js";

var player = gEngine.Core.mAllObjects[0];

function handleKeyInput(event) {
    const { keyCode, type } = event;
    const isKeyDown = type === 'keydown' ? true : false;

    if (keyCode === 37) player.rotatingLeft = isKeyDown;
    if (keyCode === 39) player.rotatingRight = isKeyDown;
    if (keyCode === 38) player.engineOn = isKeyDown;
    if (keyCode == 40) {
        let velocity = new Vector(0,0, 0, 0, false);
        player.velocity = velocity;
    }
    if (keyCode == 16) {

    }
}

// Event Listeners
document.addEventListener('keydown', handleKeyInput);
document.addEventListener('keyup', handleKeyInput);