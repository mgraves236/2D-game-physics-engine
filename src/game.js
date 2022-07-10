import {_engineCore as engineCore} from "./engineCore/core.js";
import {screen} from "./engineCore/screen.js";
import {Bullet} from "./bullet/bullet.js";
import {Vector} from "./lib/vector.js";

window.onload = startGame;

/**
 * initial scene
 */
function startGame() {
    let loc = new Vector(100,100);
    let vel = new Vector(1,0);
    let mover = new Bullet(loc, vel);
    engineCore.mAllObjects.push(mover);
    engineCore.initializeEngineCore;
    window.requestAnimationFrame(mainGame);
}

let lastRenderTime = 0;
function mainGame(currentTime) {

    window.requestAnimationFrame(mainGame);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / 3) return;
    lastRenderTime = currentTime;

    engineCore.mAllObjects[0].update();
    engineCore.mAllObjects[0].display();
}
