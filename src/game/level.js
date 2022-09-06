import { screen } from "../engineCore/screen.js";
import {Rectangle} from "../rigidBody/rectangle.js";
import {Vector} from "../lib/vector.js";

export function drawLevelSky() {
    let ctx = screen.mContext;
    ctx.save();
    let grd = ctx.createLinearGradient(0, 0, 0, 500);
    grd.addColorStop(0, "#B989D9");
    grd.addColorStop(1, "#FEC2A9");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, screen.mWidth, screen.mHeight);
    ctx.restore();
}

export function setTerrain() {
    let ctx = screen.mContext;

    new Rectangle(0, new Vector(screen.mWidth / 2 ,screen.mHeight), 100, 100, 0, 0.4,0.1, false, 'terrain');
    new Rectangle(0, new Vector(screen.mWidth / 2 + 100,screen.mHeight - 20), 100, 100 , 60 * Math.PI / 180, 0.4,0.1, false, 'terrain');
    new Rectangle(0, new Vector(screen.mWidth / 2 - 100,screen.mHeight - 20), 100, 100, -60 * Math.PI / 180, 0.4,0.1, false, 'terrain');
}