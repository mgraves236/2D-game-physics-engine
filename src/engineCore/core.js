import data from './config.json' assert {type: 'json'};
import {Vector} from "../lib/vector.js";
import {drawLevel} from "../game/level.js";
import {bulletSource} from "../bullet/source.js";
import {screen} from "./screen.js";

/**
 * Create a namespace to store all the physics engine core functionality
 * @type {{mHeight: number, mWidth: number, mContext: *, map: (function(*))}}
 * @private
 */
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
        drawLevel();
        if (mDragAreas !== null) {
            for (let i = 0; i < mDragAreas.length; i++) {
                mDragAreas[i].update();
                mDragAreas[i].display();
            }
        }
        if (mAllObjects !== null) {
            for (let i = 0; i < mAllObjects.length; i++) {
                mAllObjects[i].update();
                mAllObjects[i].display();
            }
        }

    }

    let mPublic = {
        initializeEngineCore: mainGame,
        mAllObjects: mAllObjects,
        mDragAreas: mDragAreas,
        mGravity: mGravity,
        /***
         * Enable/disable object movements
         * @type boolean
         */
        mMovement: false
    };
    return mPublic;
}());

export {_engineCore};


