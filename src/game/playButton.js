import {screen} from "../engineCore/screen.js";
import {setScene} from "./level/levelObjects.js";
import {_engineCore, gEngine} from "../engineCore/core.js";
import {Vector} from "../lib/vector.js";
import data from './../engineCore/config.json' assert {type: 'json'};
import {drawLevelSky} from "./level/level.js";


let ctx = screen.mContext;


let playButton = {
    x: screen.mWidth / 2 - 100,
    y: screen.mHeight / 2,
    width: 200,
    height: 80
};

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

export function clickBtn(e) {
    let mousePos = getMousePos(e);
    if (isInside(mousePos, playButton)) {
        startGame();
    }
}

export function setUp() {

    screen.mCanvas.addEventListener('click', clickBtn);

    drawButton();
}


function getMousePos(event) {
    let rect = screen.mCanvas.getBoundingClientRect();
    let scaleX = screen.mCanvas.width / rect.width;
    let scaleY = screen.mCanvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

function isInside(pos, button) {
    return pos.x > button.x && pos.x < button.x + button.width
        && pos.y < button.y + button.height && pos.y > button.y;
}

function startGame() {
    screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
    gEngine.Core.mAllObjects = [];
    gEngine.Core.mDragAreas = [];
    gEngine.Core.mDragAreas = [];
    gEngine.Level.Fuel = {
        Array: [],
        Index: 0
    }
    gEngine.EndGame = false;
    drawLevelSky();
    setScene();
    screen.mCanvas.removeEventListener('click', clickBtn);
    window.requestAnimationFrame(gEngine.Core.initializeEngineCore);
}
