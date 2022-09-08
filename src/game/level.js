import {Vector} from "../lib/vector.js";
import {Rectangle} from "../rigidBody/rectangle.js";
import { screen } from "../engineCore/screen.js";
// import {Triangle} from "../rigidBody/triangle.js";

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
