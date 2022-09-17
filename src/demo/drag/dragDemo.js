import {gEngine} from "../../engineCore/core.js";
import {screen} from "../../engineCore/screen.js";
import {drawLevelSky} from "../../game/level/level.js";
import {DragArea} from "../../dragArea/dragArea.js";
import {Vector} from "../../lib/vector.js";
import {Mover} from "./mover.js";
// create drag area
let liquid = new DragArea(0, screen.mHeight / 2, screen.mWidth, screen.mHeight / 2, 0.8, true);
liquid.display();
document.getElementById("start").addEventListener("click", startDemo);
document.getElementById("clear").addEventListener("click", clear);

let count = 0;
let number = 5;

function startDemo() {
    count++;
    var location = new Vector(50, 0);
    for (let i = 0; i < number; i++) {
        let r = Math.floor((Math.random() + 1) * 8);
        let m;
        if (r < 5) {
            m = r * 0.1;
        } else {
            m = r * 0.8;
        }
        let mover = new Mover(new Vector(50 + i * screen.mWidth / number, 0), new Vector(0.1,5), r, m, 0,
            0.1*count, 0.1*count);
    }

    window.requestAnimationFrame(gEngine.Core.initializeEngineCore);
}

function clear() {
    for (let i = 0; i < number * count; i++) {
        gEngine.Core.mAllObjects.pop();
    }
    screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
    count = 0;
}

