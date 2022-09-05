import {gEngine} from "../engineCore/core.js";
import {screen} from "../engineCore/screen.js";
import {Vector} from "../lib/vector.js";
import {Rectangle} from "../rigidBody/rectangle.js";
import {Triangle} from "../rigidBody/triangle.js";
import {Circle} from "../rigidBody/circle.js";
import {drawLevelSky} from "../game/level.js";

console.log(gEngine.Core.mAllObjects)
document.getElementById("start").addEventListener("click", startDemo);
document.getElementById("clear").addEventListener("click", clear);
drawLevelSky();
let top = new Rectangle(0, new Vector(250, 400), 300, 10, 45 * Math.PI / 180, 1, 0, false);
top.display();
var count = 0;

function startDemo() {
    count++;
    let triangle = new Triangle(1, new Vector(300, 200), 100,50, 0, 0.1,0.2, true);
    let circle = new Circle(4, new Vector(300, 150),40, 0, 0.1, 0.8);
    let rectangle = new Rectangle(5, new Vector(250, 100),50, 50,0,0.1,0.2, true);

    window.requestAnimationFrame(gEngine.Core.initializeEngineCore);
}

function clear() {

    for (let i = 0; i < 3 * count; i++) {
        gEngine.Core.mAllObjects.pop();
    }
    console.log(gEngine.Core.mAllObjects)
    screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
    count = 0;
}
