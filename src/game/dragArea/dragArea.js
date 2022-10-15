import { screen } from "../../engineCore/screen.js";
import { SineWave } from "../../lib/sineWave.js";
import {gEngine} from "../../engineCore/core.js";

/**
 * Class that represents a drag area
 * @class DragArea
 */
export class DragArea {
    /**
     * DragArea class constructor
     * @param x x coordinate of a starting point
     * @param y y coordinate of a starting point
     * @param w area width
     * @param h area height
     * @param c drag coefficient
     * @param isWater true to display area as water
     */
    constructor(x, y, w, h, c, isWater) {
        this.c = c; // drag coefficient
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.theta1 = 0;
        this.theta2 = 0;
        this.isWater = isWater; // display as water or wind
        this.waveArray = [];
        let wave1 = new SineWave(this.x, this.y, this.c);
        let wave2 = new SineWave(this.x, this.y, this.c);
        let wave = [wave1, wave2];
        this.waveArray.push(wave);
        gEngine.Core.mDragAreas.push(this);
    }

    display() {
        let ctx = screen.mContext;
        if (this.isWater === false) {
            ctx.save();
            // space between waves
            let step = 2;
            // display waves
            for (let j = 0; j < this.waveArray.length; j++) {
                let wave = this.waveArray[j];
                let xPrev = wave[0].x;
                let yPrev = wave[0].y;
                ctx.beginPath();
                ctx.moveTo(xPrev, yPrev);
                let length = this.w / 8 + 8;
                for (let i = 0; i < length; i += step) {
                    let x = wave[0].x + i;
                    let y = wave[0].y + Math.sin(i * wave[0].length + this.theta1) * wave[0].amplitude;
                    ctx.lineTo(x, y);
                    ctx.strokeStyle = 'rgba(131,66,124,0.1)';
                    xPrev = x;
                    yPrev = y;
                    this.theta1 = this.theta1 + wave[0].speed;
                }
                for (let i = length; i > 0; i -= step) {
                    let x = wave[1].x + i;
                    let y = wave[1].y + Math.sin(i * wave[1].length + this.theta2 + Math.PI) * wave[1].amplitude;
                    ctx.lineTo(x, y);
                    ctx.strokeStyle = 'rgba(131,66,124,0.1)';
                    xPrev = x;
                    yPrev = y;
                    this.theta2 = this.theta2 + wave[1].speed;
                }
                ctx.lineTo(wave[0].x, wave[0].y);
                ctx.fillStyle = 'rgba(131,66,124,0.15)';
                ctx.closePath();
                ctx.fill();

            }
            ctx.restore();
        } else {
           this.drawWater();
        }
    }

    /**
     * animate waves
     */
    update() {
        this.waveArray = [];
        for (let j = 0; j < this.h; j += 40) {
            for (let i = 0; i < this.w / 120; i++) {

                if (j % 80 === 0) {
                    var wave1 = new SineWave(this.x + i * 80, this.y + j, this.c);
                    var wave2 = new SineWave(this.x + i * 80 + 2, this.y + j + 5, this.c);
                } else {
                    var wave1 = new SineWave(this.x + (i + 1) * 40 + 40 * i, this.y + j, this.c);
                    var wave2 = new SineWave(this.x + (i + 1) * 40 + 40 * i + 2, this.y + j + 5, this.c);
                }
                let wave = [wave1, wave2];
                this.waveArray.push(wave);
            }
        }
        this.display();
        delete SineWave.wave1;
        delete SineWave.wave2;
    }

    /**
     * if drag area is water, display as water
     */
    drawWater() {
        let ctx = screen.mContext;

        ctx.save();
        let grd = ctx.createLinearGradient(0, 0, 0, 500);
        grd.addColorStop(1, "rgba(106,122,166,0.62)");
        grd.addColorStop(0, "rgba(222,216,215,0.62)");
        ctx.fillStyle = grd;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }

}