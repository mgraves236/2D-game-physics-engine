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
            console.log(mAllObjects)
            let i = 0;
            while (i < gEngine.Core.mAllObjects.length) {
                console.log('length' +  length)
                console.log(i)
                if ( gEngine.Core.mAllObjects[i].massCenter.x === -100) {
                    console.log('hello')
                    let length = gEngine.Core.mAllObjects.length;
                    let start = gEngine.Core.mAllObjects.slice(0, i);
                    console.log('SLICE')
                    console.log(start)
                    let end = gEngine.Core.mAllObjects.slice(i + 1, length + 1);
                    console.log(end)
                    start = start.concat(end);
                    console.log('CONCAT')
                    console.log(start)
                    gEngine.Core.mAllObjects = start;
                    console.log('length inside' + length)
                    i = i - 1;
                } else {
                    gEngine.Core.mAllObjects[i].update();
                    gEngine.Core.mAllObjects[i].display();
                    i++;
                }
            }
        }
        let player = gEngine.Core.mAllObjects.find(x => x.additionalInfo === 'player');

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


