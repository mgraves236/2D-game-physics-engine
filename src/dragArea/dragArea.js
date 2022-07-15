import data from './../engineCore/config.json' assert { type: 'json' };
import {screen} from "../engineCore/screen.js";

export class DragArea {

    constructor(x, y, w, h) {
        this.c = data.liquidCoefficient;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.fillStyle = 'rgba(128,11,115,0.42)';
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    update() {

    }

}