import { _engineCore } from "../engineCore/core.js";
import { screen, map } from "../engineCore/screen.js";
import { Vector } from "../lib/vector.js";
import { bulletSource } from "../bullet/source.js";
import { DragArea } from "../dragArea/dragArea.js";


/**
 * initial scene
 */
function startGame() {

    let liquid = new DragArea(300, map(300), 200, 50);
    _engineCore.mDragAreas.push(liquid);
    let loc = new Vector(10, 600);
    let loc2 = new Vector(10, 300);
    let loc3 = new Vector(10, 350);
    let loc4 = new Vector(320, 0);
    let loc5 = new Vector(290, 0);
    let loc6 = new Vector(290, screen.mHeight);
    let loc7 = new Vector(320, screen.mHeight);
    let vel1 = new Vector(0, 1,0,0,false);
    let vel2 = new Vector(0, 0,0,0,  false);
    let velBull3 = new Vector(0, 5,0,0,  false);
    let velBull = new Vector(5, 0,0,0,false);
    let velBull2 = new Vector(0, -5, 0,0,false);
    let source = new bulletSource(10, loc, vel2, velBull);
    let source2 = new bulletSource(10, loc2, vel2, velBull);
    let source3 = new bulletSource(10, loc3, vel2, velBull);
    let source4 = new bulletSource(10, loc4, vel2, velBull2);
    let source5 = new bulletSource(10, loc5, vel2, velBull2);
    let source6 = new bulletSource(10, loc6, vel2, velBull3);
    let source7 = new bulletSource(10, loc7, vel2, velBull3);
     _engineCore.mAllObjects.push(source);
     _engineCore.mAllObjects.push(source2);
     _engineCore.mAllObjects.push(source3);
     _engineCore.mAllObjects.push(source4);
     _engineCore.mAllObjects.push(source5);
    _engineCore.mAllObjects.push(source6);
    _engineCore.mAllObjects.push(source7);
    window.requestAnimationFrame(_engineCore.initializeEngineCore);
}

startGame();

