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
    // let loc2 = new Vector(10,200);
     let vel = new Vector(0,0);
    // let vel1 = new Vector(1, 0);
    // let vel2 = new Vector(2, 0.5);
    // var bullet1 =  new Bullet(loc,vel1);
    // var bullet2 =  new Bullet(loc2,vel2);
    // engineCore.mAllObjects.push(bullet1);
    // engineCore.mAllObjects.push(bullet2);
    var source = new bulletSource(2, loc, vel);
    engineCore.mAllObjects.push(source);
    console.log(engineCore.mAllObjects)
    window.requestAnimationFrame(engineCore.initializeEngineCore);
}

startGame();

