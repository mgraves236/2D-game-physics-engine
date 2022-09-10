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
import {setTerrain} from "./level/terrain.js";
import {setBunkers} from "./level/bunker.js";


/**
 * initial scene
 */
function startGame() {
    // setTerrain();
    setBunkers();
    // let mPlayer = new PlayerShip(new Vector(screen.mWidth / 2, screen.mHeight / 2 + 200));
    // mPlayer.additionalInfo = "player";
    // let rectangle = new Rectangle(0, new Vector(100, screen.mHeight / 2), 200, 800,0, 1,0, false);
    // let liquid = new DragArea(300, 300, 200, 50,  data.liquidCoefficient, false);
    // gEngine.Core.mDragAreas.push(liquid);
    // let source = new bulletSource(10, new Vector(7, 0), new Vector(1, 0), new Vector(0, 2));
    window.requestAnimationFrame(gEngine.Core.initializeEngineCore);
}

startGame();

