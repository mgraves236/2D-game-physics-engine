import { _engineCore } from "../engineCore/core.js";
import { screen, map } from "../engineCore/screen.js";
import { Vector } from "../lib/vector.js";
import { bulletSource } from "../bullet/source.js";
import { DragArea } from "../dragArea/dragArea.js"

/**
 * initial scene
 */
function startGame() {
    let liquid = new DragArea(300, map(300), 200, 50);
    _engineCore.mDragAreas.push(liquid);
    let loc = new Vector(10, 600);
    let loc2 = new Vector(10, 300);
    let loc3 = new Vector(10, 320);
    let vel1 = new Vector(0, 1);
    let vel2 = new Vector(0, 0);
    let velBull = new Vector(10, 0);
    let source = new bulletSource(10, loc, vel1, velBull);
    let source2 = new bulletSource(10, loc2, vel2, velBull);
    let source3 = new bulletSource(10, loc3, vel2, velBull);
    _engineCore.mAllObjects.push(source);
    _engineCore.mAllObjects.push(source2);
    _engineCore.mAllObjects.push(source3);
    window.requestAnimationFrame(_engineCore.initializeEngineCore);
}

startGame();

