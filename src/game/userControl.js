import {Vector} from "../lib/vector.js";
import {Engine} from "../engineCore/core.js";
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

    if (keyCode === 37) Engine.Player.rotatingLeft = isKeyDown; // left arrow
    if (keyCode === 39) Engine.Player.rotatingRight = isKeyDown; // right arrow
    if (keyCode === 38) Engine.Player.engineOn = isKeyDown; // up arrow

    if (keyCode === 32) Engine.Player.shoot(); // space
    if (keyCode === 40) { // down arrow
        Engine.Player.velocity = new Vector();
    }
    if (keyCode === 16) { //shift
        Engine.Player.isRayOn = isKeyDown;
        let i = 0;
        // check if the player is in a fuel tank vicinity and if they can pick up the tank
        while (i < Engine.Level.Fuel.Array.length) {
                let isPicked = Engine.Level.Fuel.Array[i].pickUp();
                if (isPicked) {
                    // delete the picked up tank
                    let length = Engine.Level.Fuel.Array.length;
                    let start = Engine.Level.Fuel.Array.slice(0, i);
                    let end = Engine.Level.Fuel.Array.slice(i + 1, length + 1);
                    start = start.concat(end);
                    Engine.Level.Fuel.Array = start;
                    Engine.Level.Fuel.Index = Engine.Level.Fuel.Index + 1;
                    Engine.Level.Fuel.Array.push( new FuelTank(locations[Engine.Level.Fuel.Index % locations.length].loc, locations[Engine.Level.Fuel.Index  % locations.length].angle  * Math.PI / 180));
                }
            i++;
        }
    }
    return isKeyDown;
}

// Event Listeners
document.addEventListener('keydown', handleKeyInput);
document.addEventListener('keyup', handleKeyInput);

