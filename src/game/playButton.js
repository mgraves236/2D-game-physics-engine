import {screen} from "../engineCore/screen.js";
import {setScene} from "./level/levelObjects.js";
import {Engine} from "../engineCore/core.js";
import {drawLevelSky} from "./level/level.js";

let ctx = screen.mContext;
/**
 * Button to start game
 * @type {{x: number, width: number, y: number, height: number}}
 */
let playButton = {
    x: screen.mWidth / 2 - 100,
    y: screen.mHeight / 2,
    width: 200,
    height: 80
};

/**
 * Draw a button to start game
 */
export function drawButton() {
    ctx.save();
    ctx.fillStyle = "rgb(19,19,19)";
    ctx.fillRect(playButton.x, playButton.y, playButton.width, playButton.height);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = '3';
    ctx.strokeRect(playButton.x, playButton.y, playButton.width, playButton.height)
    ctx.fillStyle = "#ffffff";
    ctx.font = "60px Arial";
    ctx.fillText("PLAY", playButton.x + 25, playButton.y + 60);
    ctx.restore();
}

/**
 * Check if user clicked a button
 * @param e click event
 */
export function clickBtn(e) {
    let mousePos = getMousePos(e);
    if (isInside(mousePos, playButton)) {
        startGame();
    }
}
/**
 * Set event listener and draw a button
 */
export function setUp() {
    screen.mCanvas.addEventListener('click', clickBtn);
    drawButton();
}

/**
 * Get user's mouse coordinates
 * @param event mouse event
 * @returns {{x: number, y: number}} mouse coordinates
 */
function getMousePos(event) {
    let rect = screen.mCanvas.getBoundingClientRect();
    let scaleX = screen.mCanvas.width / rect.width;
    let scaleY = screen.mCanvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}
/**
 * Check if mouse is inside a button
 * @param pos mouse position
 * @param button button
 * @returns {boolean}
 */
function isInside(pos, button) {
    return pos.x > button.x && pos.x < button.x + button.width
        && pos.y < button.y + button.height && pos.y > button.y;
}

/**
 * Start game, clear previous data
 */
function startGame() {
    screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
    Engine.Core.mAllObjects = [];
    Engine.Core.mDragAreas = [];
    Engine.Core.mDragAreas = [];
    Engine.Level.Fuel = {
        Array: [],
        Index: 0
    }
    Engine.EndGame = false;
    drawLevelSky();
    setScene();
    screen.mCanvas.removeEventListener('click', clickBtn);
    window.requestAnimationFrame(Engine.Core.initializeEngineCore);
}
