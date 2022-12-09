import {Engine} from "./core.js";
import {screen} from "./screen.js";


let info = document.getElementById("info");


let lastRenderTime = 0;
let FPS = 60;
let frameTime = 1 / FPS;


/**
 * Engine Loop
 * @param currentTime current time
 */
export function mainGame(currentTime) {

    // let infoString = [];

    window.requestAnimationFrame(mainGame);
    const secondsSinceLastRender = (currentTime - lastRenderTime);
    if (secondsSinceLastRender < frameTime) return;
    lastRenderTime = currentTime;
    screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
    // screen.mContext.fillStyle = "rgba(0,0,0,0.15)";
    // screen.mContext.fillRect(0,0, screen.mWidth, screen.mHeight);
    // update drag areas

    if (Engine.Core.mAllObjects !== null) {
        // update and display or delete object
        // let start = new Date().getTime();
        let i = 0;
        while (i < Engine.Core.mAllObjects.length) {
            // infoString[i] = "velocity: (" +  Engine.Core.mAllObjects[i].velocity.x + ", " +  Engine.Core.mAllObjects[i].velocity.y + "),    " +
            //     Engine.Core.mAllObjects[i].angularVelocity + "<br>";
            Engine.Core.mAllObjects[i].update();
            Engine.Core.mAllObjects[i].display();
            i++;
        }
        // let end = new Date().getTime();
//         console.log(end - start);

    }
    if (Engine.Core.mDragAreas !== null) {
        for (let i = 0; i < Engine.Core.mDragAreas.length; i++) {
            Engine.Core.mDragAreas[i].update();
        }
        // update UI
        //     info.innerHTML = infoString.toString();
    }

    // run collision module
    Engine.Physics.collision();
    Engine.Physics.drag();
}

Engine.Core.initializeEngineCore = mainGame;
Engine.Core.frameTime = frameTime;
