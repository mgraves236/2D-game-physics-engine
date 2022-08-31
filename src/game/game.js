import {gEngine} from "../engineCore/core.js";
import { screen, map } from "../engineCore/screen.js";
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
    let x = screen.mWidth / 2;
    let y = screen.mHeight / 2 + 200;
    let location = new Vector(x, y, 0, 0, false);
    let mPlayer = new PlayerShip(location);
    let liquid = new DragArea(300, 300, 200, 50,  data.liquidCoefficient, false);
    gEngine.Core.mDragAreas.push(liquid);
    let loc = new Vector(7, 300,0,0, false);
    let loc2 = new Vector(400, 400, 0,0, false);
    let vel1 = new Vector(0, 0,0,0,false);
    let vel2 = new Vector(1, 0,0,0,false);
    let velBull = new Vector(5, 0,0,0,false);
    let velBull2 = new Vector(0, 1,0,0,false);
    // let source = new bulletSource(10, loc, vel1, velBull);
    // let source2 = new bulletSource(10, loc2, vel1, velBull2);
    let ang = -45 * Math.PI / 180;

    let massCenter = new Vector(300, 400,0,0, false)
    let massCenter2 = new Vector(340, 400, 0,0, false)
    let triangle2 = new Triangle(1, massCenter2, 50,50, ang);

    let circle = new Circle(1, massCenter,50);
    // let circle2 = new Circle(1, massCenter2,70)

    // let rectangle = new Rectangle(1, massCenter, 50, 100);
    let rectangle2 = new Rectangle(1, massCenter2, 80, 80, ang);
    // let triangle1 = new Triangle(1, massCenter, 70,100);
    // triangle2.rotate(ang)



    // rectangle2.rotate(ang)
    window.requestAnimationFrame(gEngine.Core.initializeEngineCore);
}

startGame();

