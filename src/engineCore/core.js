import data from './config.json' assert {type: 'json'};
import {Vector} from "../lib/vector.js";
import {drawLevelSky} from "../game/level.js";
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
        console.log('-----------------------------')
        if (mAllObjects !== null) {
            for (let i = 0; i < mAllObjects.length; i++) {
                mAllObjects[i].update();
                mAllObjects[i].display();
            }
        }
        let player = gEngine.Core.mAllObjects.find(x => x.additionalInfo === 'player');
        console.log(player)

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


