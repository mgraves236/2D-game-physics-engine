import {drawLevelSky} from "../game/level/level.js";
import {gEngine} from "./core.js";
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
    if (gEngine.Core.mAllObjects !== null) {
        // how many bunkers are left in game
        let number = 0;
        gEngine.Level.bunkersNumber = (function (){
            gEngine.Core.mAllObjects.forEach(object => {
                if (object.additionalInfo === "bulletSource") {
                    number++;
                }
            })
            return number;
        }());

        // if all bunkers are destroyed, end game
        if ( gEngine.Level.bunkersNumber === 0) {
            gEngine.EndGame = true;
            screen.mContext.font = "bolder 60px Arial";
            screen.mContext.fillText("CONGRATS! YOU WON!", screen.mWidth / 2 - 350, screen.mHeight / 2 - 30);
            // restart button

            setUp();
            return;
        } else if (gEngine.Player.lives === 0 || gEngine.EndGame === true) {
            gEngine.EndGame = true;
            screen.mContext.font = "bolder 60px Arial";
            screen.mContext.fillText("GAME OVER", screen.mWidth / 2 - 200, screen.mHeight / 2 - 30);
            // restart button
            setUp();
            return;
        }
        // display fuel
        for (let i = 0; i < gEngine.Level.Fuel.Array.length; i++) {
            gEngine.Level.Fuel.Array[i].display();
        }
        // update and display or delete objects
        let i = 0;
        while (i < gEngine.Core.mAllObjects.length) {
            if (gEngine.Core.mAllObjects[i].massCenter.x === -100 ||
                (gEngine.Core.mAllObjects[i].additionalInfo === "bulletSource" &&
                    gEngine.Core.mAllObjects[i].damage === true)) {
                let start = gEngine.Core.mAllObjects.slice(0, i);
                let end = gEngine.Core.mAllObjects.slice(i + 1);
                start = start.concat(end);
                gEngine.Core.mAllObjects = start;
                i = i - 1;
            } else {
                gEngine.Core.mAllObjects[i].update();
                gEngine.Core.mAllObjects[i].display();
                i++;
            }
        }
    }
    // update drag areas
    if (gEngine.Core.mDragAreas !== null) {
        for (let i = 0; i < gEngine.Core.mDragAreas.length; i++) {
            gEngine.Core.mDragAreas[i].update();
        }
    }
    //update UI
    updateUI((gEngine.Level.bunkersNumber) * 100, gEngine.Player.lives, gEngine.Player.fuel);
    // display UI
    displayUI();
    gEngine.Physics.collision();
    gEngine.Physics.drag();
}

gEngine.Core.initializeEngineCore = mainGame;
