import {gEngine} from "../engineCore/core.js";
import {map, screen} from "../engineCore/screen.js";
import {drawLevelSky} from "../game/level.js";
import {DragArea} from "../dragArea/dragArea.js";
import {Vector} from "../lib/vector.js";
import {bulletSource} from "../bullet/source.js";


// create drag area
let liquid = new DragArea(0, map(screen.mHeight / 2), screen.mWidth, screen.mHeight / 2, 0.1, true);
gEngine.Core.mDragAreas.push(liquid);



// display sky
drawLevelSky();

document.getElementById("start").addEventListener("click", startDemo);
function startDemo() {
    let loc = new Vector(200, screen.mHeight);
    let loc2 = new Vector(400, screen.mHeight);
    let vel1 = new Vector(0, 0,0,0,false);
    let velBull = new Vector(0, 3,0,0,false);
    let velBull2 = new Vector(0, 3,0,0,false);
    let source = new bulletSource(1, loc, vel1, velBull, true);
    let source2 = new bulletSource(1, loc2, vel1, velBull2, true);
    window.requestAnimationFrame(gEngine.Core.initializeEngineCore);
}

