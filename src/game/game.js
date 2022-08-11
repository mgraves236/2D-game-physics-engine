import { _engineCore } from "../engineCore/core.js";
import { screen, map } from "../engineCore/screen.js";
import { Vector } from "../lib/vector.js";
import { bulletSource } from "../bullet/source.js";
import { DragArea } from "../dragArea/dragArea.js";
import {Rectangle} from "../rigidBody/rectangle.js";
import {Circle} from "../rigidBody/circle.js";
import {Triangle} from "../rigidBody/triangle.js";


/**
 * initial scene
 */
function startGame() {

    let liquid = new DragArea(300, map(300), 200, 50);
    _engineCore.mDragAreas.push(liquid);
    let loc = new Vector(10, 600);
    let loc2 = new Vector(300, 0);
    let vel1 = new Vector(0, 2,0,0,false);
    let vel2 = new Vector(2, 0,0,0,false);
    let velBull = new Vector(5, 0,0,0,false);
    let velBull2 = new Vector(0, -5,0,0,false);
    let source = new bulletSource(10, loc, vel1, velBull);
    let source2 = new bulletSource(10, loc2, vel2, velBull2);
    let massCenter = new Vector(300, 400)
    let rect = new Rectangle(1, massCenter, 300, 100);
    let circle = new Circle(1, massCenter, 50);
    let triangle = new Triangle(1, massCenter, 100, 100);
    console.log(triangle)
    window.requestAnimationFrame(_engineCore.initializeEngineCore);
}

startGame();

