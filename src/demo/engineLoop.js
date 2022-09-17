import {drawLevelSky} from "../game/level/level.js";
import {gEngine} from "../engineCore/core.js";
import {screen} from "../engineCore/screen.js";



let lastRenderTime = 0;

/**
 * Engine Loop
 * @param currentTime current time
 */
export function mainGame(currentTime) {

    window.requestAnimationFrame(mainGame);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / 60) return;
    lastRenderTime = currentTime;
    screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
    if (gEngine.Core.mAllObjects !== null) {
        // update and display or delete objects
        let i = 0;
        while (i < gEngine.Core.mAllObjects.length) {

                gEngine.Core.mAllObjects[i].update();
                gEngine.Core.mAllObjects[i].display();
                i++;
        }
    }
    // update drag areas
    if (gEngine.Core.mDragAreas !== null) {
        for (let i = 0; i < gEngine.Core.mDragAreas.length; i++) {
            gEngine.Core.mDragAreas[i].update();
        }
    }
    // run collision module
    gEngine.Physics.collision();
}

gEngine.Core.initializeEngineCore = mainGame;
