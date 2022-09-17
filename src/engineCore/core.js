import data from './config.json' assert {type: 'json'};
import {Vector} from "../lib/vector.js";

/**
 * Create a namespace to store all the physics engine core functionality
 * @type {{}|{}}
 */
var gEngine = gEngine || {};
/**
 * Component to store objects and main game loop
 * @type {{}}
 */
gEngine.Core = undefined;
/**
 * Component to store collision detection and resolving
 * @type {{}}
 */
gEngine.Physics = undefined;
/**
 * Component to store game objects and game data
 * @type {{}}
 */
gEngine.Level = {};
/**
 * Component to store fuel objects
 * @type {{Array: *[], Index: number}}
 */
gEngine.Level.Fuel = {
    Array: [],
    Index: 0
}
/**
 * Component to store a reference to a player ship
 * @type {PlayerShip}
 */
gEngine.Player = undefined;
/**
 * Component to store game status
 * @type {boolean}
 */
gEngine.EndGame = false;

/**
 * Initialize engine core
 * @type {{mGravity: Vector, mDragAreas: [], mAllObjects: []}}
 * @private
 */
let _engineCore = (function () {
    let mAllObjects = [];
    let mDragAreas = [];
    let mGravity = new Vector(0, data.forceGravity);

        return {
        mAllObjects: mAllObjects,
        mDragAreas: mDragAreas,
        mGravity: mGravity,
    };
}());

gEngine.Core = _engineCore;
export {gEngine, _engineCore};


