import {Vector} from "../lib/vector.js";
import {gEngine} from "../engineCore/core.js";
import {locations} from "./level/levelObjects.js";
import {FuelTank} from "./fuelTank.js";

/**
 * Handle keyboard inputs
 * @param event keyboard event
 * @returns {boolean}
 */
export function handleKeyInput(event) {
    const { keyCode, type } = event;
    const isKeyDown = type === 'keydown';

    if (keyCode === 37) gEngine.Player.rotatingLeft = isKeyDown; // left arrow
    if (keyCode === 39) gEngine.Player.rotatingRight = isKeyDown; // right arrow
    if (keyCode === 38) gEngine.Player.engineOn = isKeyDown; // up arrow

    if (keyCode === 32) gEngine.Player.shoot(); // space
    if (keyCode === 40) { // down arrow
        gEngine.Player.velocity = new Vector();
    }
    if (keyCode === 16) { //shift
        gEngine.Player.isRayOn = isKeyDown;
        let i = 0;
        // check if the player is in a fuel tank vicinity and if they can pick up the tank
        while (i < gEngine.Level.Fuel.Array.length) {
                let isPicked = gEngine.Level.Fuel.Array[i].pickUp();
                if (isPicked) {
                    // delete the picked up tank
                    let length = gEngine.Level.Fuel.Array.length;
                    let start = gEngine.Level.Fuel.Array.slice(0, i);
                    let end = gEngine.Level.Fuel.Array.slice(i + 1, length + 1);
                    start = start.concat(end);
                    gEngine.Level.Fuel.Array = start;
                    gEngine.Level.Fuel.Index = gEngine.Level.Fuel.Index + 1;
                    gEngine.Level.Fuel.Array.push( new FuelTank(locations[gEngine.Level.Fuel.Index % locations.length].loc, locations[gEngine.Level.Fuel.Index  % locations.length].angle  * Math.PI / 180));
                }
            i++;
        }
    }
    return isKeyDown;
}

// Event Listeners
document.addEventListener('keydown', handleKeyInput);
document.addEventListener('keyup', handleKeyInput);

