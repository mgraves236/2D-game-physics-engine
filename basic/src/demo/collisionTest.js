import {Engine} from "../engineCore/core.js";
import {screen} from "../engineCore/screen.js";
import {Vector} from "../lib/vector.js";
import {Rectangle} from "../rigidBody/rectangle.js";
import {Triangle} from "../rigidBody/triangle.js";
import {Circle} from "../rigidBody/circle.js";

// UI buttons
document.getElementById("start").addEventListener("click", startDemo);
document.getElementById("clear").addEventListener("click", clear);
screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
// shelf
// let top = new Rectangle(0, new Vector(250, 400), 300, 10, 45 * Math.PI / 180, 1, 0, false);
// top.display();
let count = 0;
// display UI info
let info = document.getElementById("info");

function startDemo() {
    count++;
    let circle1 = new Circle(5, new Vector(300, 500),80, 0, 0,0, false);
    circle1.velocity = new Vector(10, 1);
    let circle2 = new Circle(5, new Vector(1200, 500),150, 0, 0,0, false);
    circle2.velocity = new Vector(-15, 0);
    // let rectangle2 = new Rectangle(5, new Vector(1200, 400),150, 150, 0,0, 0, false);
    // let triangle = new Triangle(5, new Vector(300, 400),150, 150, 0.47,0, 0, false);
    // rectangle2.velocity = new Vector(-10, 0);
    // triangle.velocity = new Vector(10, 0);

    window.requestAnimationFrame(Engine.Core.initializeEngineCore);
}

function clear() {

    for (let i = 0; i < 2 * count; i++) {
        Engine.Core.mAllObjects.pop();
    }
    screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
    count = 0;
}

