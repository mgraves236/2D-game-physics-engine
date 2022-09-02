import {gEngine} from "../engineCore/core.js";
import {screen} from "../engineCore/screen.js";
import {drawLevelSky} from "../game/level.js";
import {DragArea} from "../dragArea/dragArea.js";
import {Vector} from "../lib/vector.js";
import {bulletSource} from "../bullet/source.js";


// create drag area
let liquid = new DragArea(0, screen.mHeight / 2, screen.mWidth, screen.mHeight / 2, 0.5, true);
gEngine.Core.mDragAreas.push(liquid);

// display sky
drawLevelSky();

document.getElementById("start").addEventListener("click", startDemo);
function startDemo() {
    let source = new bulletSource(1, new Vector(200, 0), new Vector(), new Vector(0, 3), true);
    let source2 = new bulletSource(1,  new Vector(400, 0), new Vector(), new Vector(0, 3), true);
    window.requestAnimationFrame(gEngine.Core.initializeEngineCore);
}

