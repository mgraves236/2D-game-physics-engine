import {Engine} from "../../engineCore/core.js";
import {screen} from "../../engineCore/screen.js";
import {DragArea} from "../../lib/dragArea/dragArea.js";
import {Vector} from "../../lib/vector.js";
import {Mover} from "./mover.js";
// create drag area
let liquid = new DragArea(new Vector(0, screen.mHeight / 2), screen.mWidth, screen.mHeight / 2, 0.05, true);
liquid.display();
liquid.display();
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
            m = r * 10;
        } else {
            m = r * 80;
        }
        let mover = new Mover(new Vector(50 + i * screen.mWidth / number, 0), new Vector(0.1,20), r, m, 0,
            0.1*r, 0.1*r);
    }

    window.requestAnimationFrame(Engine.Core.initializeEngineCore);
}

function clear() {
    for (let i = 0; i < number * count; i++) {
        Engine.Core.mAllObjects.pop();
    }
    screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
    count = 0;
}

