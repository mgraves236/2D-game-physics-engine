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

    // let mPlayer = new PlayerShip(new Vector(screen.mWidth / 2, screen.mHeight / 2 + 200));
    let liquid = new DragArea(300, 300, 200, 50,  data.liquidCoefficient, false);
    gEngine.Core.mDragAreas.push(liquid);
    // let source = new bulletSource(10, new Vector(7, 0), new Vector(1, 0), new Vector(0, 2));
    // let source2 = new bulletSource(10, loc2, vel1, velBull2);
    let ang = -45 * Math.PI / 180;

    // let triangle2 = new Triangle(0, new Vector(340, 400), 50,50, ang);

    let circle = new Circle(5, new Vector(300, 400),50);
    circle.velocity.add(new Vector(0,-5));
    window.requestAnimationFrame(gEngine.Core.initializeEngineCore);
}

startGame();

