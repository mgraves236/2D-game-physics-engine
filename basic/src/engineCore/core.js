import data from './config.json' assert {type: 'json'};
import {Vector} from "../lib/vector.js";

/**
 * Create a namespace to store all the physics engine core functionality
 * @type {{}|{}}
 */
var Engine = Engine || {};
/**
 * Component to store objects and main game loop
 * @type {{}}
 */
Engine.Core = undefined;
/**
 * Component to store collision detection and resolving
 * @type {{}}
 */
Engine.Physics = undefined;
/**
 * Component to store game objects and game data
 * @type {{}}
 */
Engine.Level = {};
/**
 * Component to store fuel objects
 * @type {{Array: *[], Index: number}}
 */
Engine.Level.Fuel = {
    Array: [],
    Index: 0
}
/**
 * Component to store a reference to a player ship
 * @type {PlayerShip}
 */
Engine.Player = undefined;
/**
 * Component to store game status
 * @type {boolean}
 */
Engine.EndGame = false;

/**
 * Initialize engine core
 * @type {{mGravity: Vector, mDragAreas: [], mAllObjects: []}}
 * @private
 */
let _engineCore = (function () {
    let mAllObjects = [];
    let mDragAreas = [];
    let mGravity = new Vector(0, data.forceGravity);

        return  {
        mAllObjects: mAllObjects,
        mDragAreas: mDragAreas,
        mGravity: mGravity,
    };
}());

Engine.Core = _engineCore;
export {Engine, _engineCore};


