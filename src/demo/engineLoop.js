import {drawLevelSky} from "../game/level/level.js";
import {Engine} from "../engineCore/core.js";
import {screen} from "../engineCore/screen.js";



let lastRenderTime = 0;

/**
 * Engine Loop
 * @param currentTime current time
 */
export function mainGame(currentTime) {

    window.requestAnimationFrame(mainGame);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    // if (secondsSinceLastRender < 1 / 60) return;
    if (secondsSinceLastRender < 1 / 20) return;
    lastRenderTime = currentTime;
    // screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
    screen.mContext.fillStyle = "rgba(0,0,0,0.1)";
    screen.mContext.fillRect(0,0, screen.mWidth, screen.mHeight);
    if (Engine.Core.mAllObjects !== null) {
        // update and display or delete objects
        let i = 0;
        while (i < Engine.Core.mAllObjects.length) {

                Engine.Core.mAllObjects[i].update();
                Engine.Core.mAllObjects[i].display();
                i++;
        }
    }
    // update drag areas
    if (Engine.Core.mDragAreas !== null) {
        for (let i = 0; i < Engine.Core.mDragAreas.length; i++) {
            Engine.Core.mDragAreas[i].update();
        }
    }

    // run collision module
    Engine.Physics.collision();
    Engine.Physics.drag();
}

Engine.Core.initializeEngineCore = mainGame;
