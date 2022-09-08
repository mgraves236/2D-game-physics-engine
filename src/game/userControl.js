import {Vector} from "../lib/vector.js";
import {gEngine} from "../engineCore/core.js";

// let player = gEngine.Core.mAllObjects[4];
let player = gEngine.Core.mAllObjects.find(x => x.additionalInfo === 'player');

export function handleKeyInput(event) {
    const { keyCode, type } = event;
    const isKeyDown = type === 'keydown';

    if (keyCode === 37) player.rotatingLeft = isKeyDown;
    if (keyCode === 39) player.rotatingRight = isKeyDown;
    if (keyCode === 38) player.engineOn = isKeyDown;
    if (keyCode === 40) {
        player.velocity = new Vector();
    }
    if (keyCode === 16) { // Shift

    }
    return isKeyDown;
}

// Event Listeners
document.addEventListener('keydown', handleKeyInput);
document.addEventListener('keyup', handleKeyInput);

