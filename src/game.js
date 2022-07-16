import {_engineCore, _engineCore as engineCore} from "./engineCore/core.js";
import {screen, map} from "./engineCore/screen.js";
import {Vector} from "./lib/vector.js";
import {bulletSource} from "./bullet/source.js";
import {DragArea} from "./dragArea/dragArea.js"

/**
 * initial scene
 */
function startGame() {
    let liquid = new DragArea(300, map(350), 200, 200);
    _engineCore.mDragAreas.push(liquid);
    console.log()
    let loc = new Vector(10, 600);
    let loc2 = new Vector(10, 300);
    let vel = new Vector(0, 0);
    let velBull = new Vector(10, 0);
    let source = new bulletSource(10, loc, vel, velBull);
    let source2 = new bulletSource(10, loc2, vel, velBull);
    engineCore.mAllObjects.push(source);
    engineCore.mAllObjects.push(source2);
    window.requestAnimationFrame(engineCore.initializeEngineCore);
}

startGame();

