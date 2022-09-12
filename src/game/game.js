import {gEngine} from "../engineCore/core.js";
import { Vector } from "../lib/vector.js";
import {PlayerShip} from "./playerShip.js";
import {setTerrain} from "./level/terrain.js";
import {setBunkers, setFuel} from "./level/levelObjects.js";

let player;

/**
 * initial scene
 */
function startGame() {
    setTerrain();
    setBunkers();
    setFuel();
    // setDrag();
    let mPlayer = new PlayerShip(new Vector(830, 500));
    mPlayer.additionalInfo = "player";
    player = gEngine.Core.mAllObjects.find(x => x.additionalInfo === 'player');
    // let rectangle = new Rectangle(0, new Vector(100, screen.mHeight / 2), 200, 800,0, 1,0, false);
    // let liquid = new DragArea(300, 300, 200, 50,  data.liquidCoefficient, false);
    // gEngine.Core.mDragAreas.push(liquid);
    // let source = new bulletSource(10, new Vector(7, 0), new Vector(1, 0), new Vector(0, 2));
    window.requestAnimationFrame(gEngine.Core.initializeEngineCore);
}

startGame();
export {player}


