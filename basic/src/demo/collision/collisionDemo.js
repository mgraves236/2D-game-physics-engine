import {Engine} from "../../engineCore/core.js";
import {screen} from "../../engineCore/screen.js";
import {Vector} from "../../lib/vector.js";
import {Rectangle} from "../../rigidBody/rectangle.js";
import {Triangle} from "../../rigidBody/triangle.js";
import {Circle} from "../../rigidBody/circle.js";
import data from './configCollision.json' assert {type: 'json'};

// UI buttons
document.getElementById("start").addEventListener("click", startDemo);
document.getElementById("clear").addEventListener("click", clear);
screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
// shelf
let top = new Rectangle(0, new Vector(250, 400), 300, 10, 45 * Math.PI / 180, 1, 0, false);
top.display();
let count = 0;
// display UI info
let info = document.getElementById("info");

function startDemo() {
    count++;
    let triangle = new Triangle(data.Triangle.mass, new Vector(300, 200), 100,50, 0, data.Triangle.friction,data.Triangle.restitution, true);
    let circle = new Circle(data.Circle.mass, new Vector(300, 150),40, 0, data.Circle.friction, data.Circle.restitution);
    let rectangle = new Rectangle(data.Rectangle.mass, new Vector(250, 100),50, 50,0, data.Rectangle.friction,data.Rectangle.restitution, true);
    triangle.velocity = new Vector(0, 2);
    circle.velocity = new Vector(0, 2);
    rectangle.velocity = new Vector(0, 2);
    info.innerHTML = "<h4>Triangle:</h4>" + "mass: " + triangle.mass
        + "<br>friction: " + triangle.friction
        + "<br>resitution: " + triangle.restitution +
        "<h4>Cricle:</h4>" + "mass: " + circle.mass
        + "<br>friction: " + circle.friction
        + "<br>resitution: " + circle.restitution +
        "<h4>Rectangle:</h4>" + "mass: " + rectangle.mass
        + "<br>friction: " + rectangle.friction
        + "<br>resitution: " + rectangle.restitution;

    window.requestAnimationFrame(Engine.Core.initializeEngineCore);
}

function clear() {

    for (let i = 0; i < 3 * count; i++) {
        Engine.Core.mAllObjects.pop();
    }
    screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
    count = 0;
}

