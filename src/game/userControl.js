import {Vector} from "../lib/vector.js";
import {gEngine} from "../engineCore/core.js";
import {locations} from "./level/levelObjects.js";
import {FuelTank} from "./fuelTank.js";

export function handleKeyInput(event) {
    const { keyCode, type } = event;
    const isKeyDown = type === 'keydown';

    if (keyCode === 37) gEngine.Player.rotatingLeft = isKeyDown;
    if (keyCode === 39) gEngine.Player.rotatingRight = isKeyDown;
    if (keyCode === 38) gEngine.Player.engineOn = isKeyDown;

    if (keyCode === 32) gEngine.Player.shoot();
    if (keyCode === 40) {
        gEngine.Player.velocity = new Vector();
    }
    if (keyCode === 16) { //shift
        console.log(gEngine.Level.Fuel.Array)
        gEngine.Player.isRayOn = isKeyDown;
        let i = 0;
        while (i < gEngine.Level.Fuel.Array.length) {
                let isPicked = gEngine.Level.Fuel.Array[i].pickUp();
                if (isPicked) {
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

