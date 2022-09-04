import {gEngine} from "../engineCore/core.js";
import { screen} from "../engineCore/screen.js";
import { Vector } from "../lib/vector.js";
import { bulletSource } from "../bullet/source.js";
import { DragArea } from "../dragArea/dragArea.js";
import {Rectangle} from "../rigidBody/rectangle.js";
import {Circle} from "../rigidBody/circle.js";
import {Triangle} from "../rigidBody/triangle.js";
import {PlayerShip} from "./playerShip.js";
import data from './../engineCore/config.json' assert { type: 'json' };


/**
 * initial scene
 */
function startGame() {

    let mPlayer = new PlayerShip(new Vector(screen.mWidth / 2, screen.mHeight / 2 + 200));
    let liquid = new DragArea(300, 300, 200, 50,  data.liquidCoefficient, false);
    gEngine.Core.mDragAreas.push(liquid);
    // let source = new bulletSource(10, new Vector(7, 0), new Vector(1, 0), new Vector(0, 2));
    // let source2 = new bulletSource(10, loc2, vel1, velBull2);
    let ang = 45 * Math.PI / 180;

    // let triangle2 = new Triangle(1, new Vector(350, 400), 100,100, 0);

    // let circle2 = new Triangle(1, new Vector(270, 240),50, 50, 0, 0.2, 0.2);
    let top = new Rectangle(0, new Vector(250, 400), 300, 10, 45 * Math.PI / 180, 1, 0, false);
    // top.rotate(ang)
    let triangle1 = new Triangle(1, new Vector(300, 200), 100,50, 0, 0.1,0.2, true);
    // triangle1.rotate(20 * Math.PI / 180 )
    // triangle1.rotate(20 * Math.PI / 180 )
    // triangle1.angularVelocity = 0.01;
    let circle2 = new Circle(4, new Vector(300, 150),40, 0, 0.1, 0.2);

    let rect = new Rectangle(5, new Vector(250, 100),50, 50,0,0.1,0.2, true)
    // rect.angularVelocity = 0.001;
    // rect.velocity = (new Vector(0, 1))
    // let circle = new Circle(1, new Vector(300, 400),50);
    // circle2.velocity = new Vector(0,1);
    window.requestAnimationFrame(gEngine.Core.initializeEngineCore);
}

startGame();

