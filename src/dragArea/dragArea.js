import data from './../engineCore/config.json' assert {type: 'json'};
import {screen} from "../engineCore/screen.js";
import {SineWave} from "../lib/sineWave.js";

export class DragArea {

    constructor(x, y, w, h) {
        this.c = data.liquidCoefficient;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.theta1 = 0;
        this.theta2 = 0;
    }

    display() {
        // let ctx = screen.mContext;
        // ctx.save();
        // ctx.fillStyle = 'rgba(128,11,115,0.42)';
        // ctx.beginPath();
        // ctx.fillRect(this.x, this.y, this.w, this.h);
        // ctx.fill();
        // ctx.strokeStyle = 'white';
        // ctx.lineWidth = 1;
        // ctx.stroke();
        // ctx.closePath();
        // ctx.restore();
    }

    update() {
        /*
        * individual sine wave
         */
        let wave1 = new SineWave(this.x, this.y);
        let wave2 = new SineWave(this.x + 2, this.y + 15);
        let waveArray = new Array;
        let wave = [wave1, wave2];
        waveArray.push(wave);

        let step = 2;
        let ctx = screen.mContext;
        ctx.save();

        let wavePatch = new Path2D();
        let xPrev = waveArray[0][0].x;
        let yPrev = waveArray[0][0].y;
        for (let j = 0; j < waveArray.length; j++) {
            let wave = waveArray[j];
            ctx.beginPath();
            ctx.moveTo(xPrev, yPrev);
            for (let i = 0; i < this.w / 8 + 8; i += step) {
                let x = wave[0].x + i;
                let y = wave[0].y + Math.sin(i * wave[0].length + this.theta1) * wave[0].amplitude;
                ctx.lineTo(x, y);
                ctx.strokeStyle = 'rgba(131,66,124,0.1)';
                xPrev = x;
                yPrev = y;
                this.theta1 = this.theta1 + wave[0].speed;
            }
            for (let i = this.w / 8 + 8; i > 0; i -= step) {
                let x = wave[1].x + i;
                let y = wave[1].y + Math.sin(i * wave[1].length + this.theta2 + Math.PI) * wave[1].amplitude;
                ctx.lineTo(x, y);
                ctx.strokeStyle = 'rgba(131,66,124,0.1)';
                xPrev = x;
                yPrev = y;
                this.theta2 = this.theta2 + wave[1].speed;
            }
            ctx.lineTo(wave[0].x, wave[0].y);
            ctx.fillStyle = 'rgba(131,66,124,0.1)';
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    }

}