import data from './config.json' assert {type: 'json'};
import {Vector} from "../lib/vector.js";
import {drawLevelSky} from "../game/level/level.js";
import {screen} from "./screen.js";





/**
 * Create a namespace to store all the physics engine core functionality
 * @type {{}|{}}
 */
var gEngine = gEngine || {};
gEngine.Core = undefined;
gEngine.Physics = undefined;
gEngine.Level = {};
gEngine.Level.Fuel = {
    Array: [],
    Index: 0
}
gEngine.Player = undefined;
gEngine.EndGame = false;

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
            // how many bunkers are left in game
            let number = 0;
            let bunkersNumber = (function (){
                gEngine.Core.mAllObjects.forEach(object => {
                    if (object.additionalInfo === "bulletSource") {
                        number++;
                    }
                })
                return number;
            }());
            // if all bunkers are destroyed, end game
            if (bunkersNumber === 0) {
                gEngine.EndGame = true;
                screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
                drawLevelSky();
                screen.mContext.font = "bolder 60px Arial";
                screen.mContext.fillText("CONGRATS! YOU WON!", screen.mWidth / 2 - 350, screen.mHeight / 2 - 30);
                // restart button
                return;
            }

            if (gEngine.Player.lives === 0 || gEngine.EndGame === true) {
                gEngine.EndGame = true;
                screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
                drawLevelSky();
                screen.mContext.font = "bolder 60px Arial";
                screen.mContext.fillText("GAME OVER", screen.mWidth / 2 - 200, screen.mHeight / 2 - 30);
                // restart button
                return;
            }
            // display fuel
            for (let i = 0; i < gEngine.Level.Fuel.Array.length; i++) {
                gEngine.Level.Fuel.Array[i].display();
            }

            let i = 0;
            while (i < gEngine.Core.mAllObjects.length) {
                if (gEngine.Core.mAllObjects[i].massCenter.x === -100 ||
                    (gEngine.Core.mAllObjects[i].additionalInfo === "bulletSource" &&
                    gEngine.Core.mAllObjects[i].damage === true)) {
                    let start = gEngine.Core.mAllObjects.slice(0, i);
                    let end = gEngine.Core.mAllObjects.slice(i + 1);
                    start = start.concat(end);
                    gEngine.Core.mAllObjects = start;
                    i = i - 1;
                    // gEngine.Core.mAllObjects[i].update();
                    // gEngine.Core.mAllObjects[i].display();
                    // i++;
                } else {
                    gEngine.Core.mAllObjects[i].update();
                    gEngine.Core.mAllObjects[i].display();
                    i++;
                }
            }
        }

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


