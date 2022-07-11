import {_engineCore as engineCore} from "./engineCore/core.js";
import {screen} from "./engineCore/screen.js";
import {Vector} from "./lib/vector.js";
import { drawLevel } from "./game/level.js";
import {bulletSource} from "./bullet/source.js";
import {Bullet} from "./bullet/bullet.js";

/**
 * initial scene
 */
function startGame() {
    let loc = new Vector(10,400);
    let vel = new Vector(0,1);
    let velBull = new Vector(1,0);
    var source = new bulletSource(3, loc, vel, velBull);
    engineCore.mAllObjects.push(source);
    window.requestAnimationFrame(engineCore.initializeEngineCore);
}

startGame();

