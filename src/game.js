import {_engineCore as engineCore} from "./engineCore/core.js";
import {screen} from "./engineCore/screen.js";
import {Bullet} from "./bullet/bullet.js";
import {Vector} from "./lib/vector.js";
import { drawLevel } from "./game/level.js";

var mover;

/**
 * initial scene
 */
function startGame() {
    let loc = new Vector(10,400);
    let vel = new Vector(1.5,0);
    var mover = new Bullet(loc, vel);
    engineCore.mAllObjects.push(mover);
    window.requestAnimationFrame(mainGame);
}

let lastRenderTime = 0;

function mainGame(currentTime) {

    window.requestAnimationFrame(mainGame);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / 60) return;
    lastRenderTime = currentTime;


    let ctx = screen.mContext;

   console.log(engineCore.mAllObjects[0].location);

    engineCore.mAllObjects[0].update();
    drawLevel();
    engineCore.mAllObjects[0].display();
    // drawLevel();
    // screen.mContext.fillStyle = 'black'; /* TODO define global styles for the app */
    // screen.mContext.ellipse(500, 300,
    //     3, 3, 0, 0, 2 * Math.PI);
    // screen.mContext.fill();
}

startGame();

