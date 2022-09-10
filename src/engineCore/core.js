import data from './config.json' assert {type: 'json'};
import {Vector} from "../lib/vector.js";
import {drawLevelSky} from "../game/level/level.js";
// import {gEngine} from "../engineCore/physics.js"

/**
 * Create a namespace to store all the physics engine core functionality
 * @type {{}|{}}
 */
var gEngine = gEngine || {};
gEngine.Core = undefined;
gEngine.Physics = undefined;

let _engineCore = (function () {
    let mAllObjects = [];
    let mDragAreas = [];
    let mGravity = new Vector(0, data.accGravity);

    /**
     * Engine Loop Component
     */
    let lastRenderTime = 0;



    function mainGame(currentTime) {

        window.requestAnimationFrame(mainGame);

        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 / 60) return;
        lastRenderTime = currentTime;
        drawLevelSky();
        if (mAllObjects !== null) {
            let i = 0;
            while (i < gEngine.Core.mAllObjects.length) {
                if ( gEngine.Core.mAllObjects[i].massCenter.x === -100) {
                    let length = gEngine.Core.mAllObjects.length;
                    let start = gEngine.Core.mAllObjects.slice(0, i);
                    let end = gEngine.Core.mAllObjects.slice(i + 1, length + 1);
                    start = start.concat(end);
                    gEngine.Core.mAllObjects = start;
                    i = i - 1;
                } else {
                    gEngine.Core.mAllObjects[i].update();
                    gEngine.Core.mAllObjects[i].display();
                    i++;
                }
            }
        }
        let player = gEngine.Core.mAllObjects.find(x => x.additionalInfo === 'player');
        console.log(player.lives)


        if (mDragAreas !== null) {
            for (let i = 0; i < mDragAreas.length; i++) {
                mDragAreas[i].update();
            }
        }
        gEngine.Physics.collision();


    }

    return {
        initializeEngineCore: mainGame,
        mAllObjects: mAllObjects,
        mDragAreas: mDragAreas,
        mGravity: mGravity,
        //mPlayer: mPlayer,
    };
}());

gEngine.Core = _engineCore;
export {gEngine};


