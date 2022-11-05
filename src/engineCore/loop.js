import {drawLevelSky} from "../game/level/level.js";
import {Engine} from "./core.js";
import {screen} from "./screen.js";
import {setUp} from "../game/playButton.js";
import {displayUI, updateUI} from "../game/ui.js";

/**
 * Engine Loop
 */
let lastRenderTime = 0;

function mainGame(currentTime) {

    window.requestAnimationFrame(mainGame);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / 60) return;
    lastRenderTime = currentTime;
    drawLevelSky();
    if (Engine.Core.mAllObjects !== null) {
        // // how many bunkers are left in game
        let number = 0;
        Engine.Level.bunkersNumber = (function (){
            Engine.Core.mAllObjects.forEach(object => {
                if (object.additionalInfo === "bulletSource") {
                    number++;
                }
            })
            return number;
        }());

        // if all bunkers are destroyed, end game
        if ( Engine.Level.bunkersNumber === 0) {
            Engine.EndGame = true;
            screen.mContext.font = "bolder 60px Arial";
            screen.mContext.fillText("CONGRATS! YOU WON!", screen.mWidth / 2 - 350, screen.mHeight / 2 - 30);
            // restart button

            setUp();
            return;
        } else if (Engine.Player.lives === 0 || Engine.EndGame === true || Engine.Player.fuel <= 0) {
            Engine.EndGame = true;
            screen.mContext.font = "bolder 60px Arial";
            screen.mContext.fillText("GAME OVER", screen.mWidth / 2 - 200, screen.mHeight / 2 - 30);
            // restart button
            setUp();
            return;
        }
        // // display fuel
        for (let i = 0; i < Engine.Level.Fuel.Array.length; i++) {
            Engine.Level.Fuel.Array[i].display();
        }
        // update and display or delete objects
        let i = 0;
        while (i < Engine.Core.mAllObjects.length) {
            if (Engine.Core.mAllObjects[i].massCenter.x === -100 ||
                (Engine.Core.mAllObjects[i].additionalInfo === "bulletSource" &&
                    Engine.Core.mAllObjects[i].damage === true)) {
                let start = Engine.Core.mAllObjects.slice(0, i);
                let end = Engine.Core.mAllObjects.slice(i + 1);
                start = start.concat(end);
                Engine.Core.mAllObjects = start;
                i = i - 1;
            } else {
                Engine.Core.mAllObjects[i].update();
                Engine.Core.mAllObjects[i].display();
                i++;
            }
        }
    }
    // update drag areas
    if (Engine.Core.mDragAreas !== null) {
        for (let i = 0; i < Engine.Core.mDragAreas.length; i++) {
            Engine.Core.mDragAreas[i].update();
        }
    }
    // update UI
    updateUI((Engine.Level.bunkersNumber) * 100, Engine.Player.lives, Engine.Player.fuel);
    // display UI
    displayUI();
    Engine.Physics.collision();
    Engine.Physics.drag();
}

Engine.Core.initializeEngineCore = mainGame;
