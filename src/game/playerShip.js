import { screen, map } from "../engineCore/screen.js";
import {Vector} from "../lib/vector.js";

export class PlayerShip {
    constructor() {
        this.x = screen.mWidth / 2;
        this.y = screen.mHeight / 2;
        this.orientation = new Vector(this.x,this.y + 50, this.x, this.y);
         console.log(this.orientation)
        this.orientation = this.orientation.rotate(60);
         console.log(this.orientation)

    }

    display() {
        let ctx = screen.mContext;
        let offset = 20;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - offset, map(this.y - offset));
        ctx.lineTo(this.x + offset, map(this.y - offset));
        ctx.lineTo(this.x, this.y);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        //ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillRect(this.x - offset, map(this.y - offset+ 0.25),
            offset * 2, 50);
        // ctx.strokeRect(this.x - offset, map(this.y - offset),
        //     offset * 2, 50);
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(this.x - offset, map(this.y - offset - 30));
        ctx.lineTo(this.x - offset, map(this.y - offset - 49.75));
        ctx.lineTo(this.x - offset - 25, map(this.y - offset - 49.75));
        ctx.lineTo(this.x - offset, map(this.y - offset - 30));
        ctx.fill();
        ctx.closePath();
       // ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x + offset, map(this.y - offset - 30));
        ctx.lineTo(this.x + offset, map(this.y - offset - 49.75));
        ctx.lineTo(this.x + offset + 25, map(this.y - offset - 49.75));
        ctx.lineTo(this.x + offset, map(this.y - offset - 30));
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(this.x - offset, map(this.y - offset - 22));
        ctx.lineTo(this.x - offset, map(this.y - offset - 49.75));
        ctx.lineTo(this.x - offset - 20, map(this.y - offset - 49.75));
        ctx.lineTo(this.x - offset, map(this.y - offset - 22));
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(this.x + offset, map(this.y - offset - 22));
        ctx.lineTo(this.x + offset, map(this.y - offset - 49.75));
        ctx.lineTo(this.x + offset + 20, map(this.y - offset - 49.75));
        ctx.lineTo(this.x + offset, map(this.y - offset - 22));
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.ellipse(this.x - offset + 10, map(this.y - offset - 50),
            8, 8, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.ellipse(this.x + offset - 10, map(this.y - offset - 50),
            8, 8, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillRect(this.x - offset + 2, map(this.y - offset - 50 - 2),
            16, 10);
        ctx.closePath();
        ctx.beginPath();
        ctx.fillRect(this.x - offset + 22, map(this.y - offset - 50 - 2),
            16, 10);
        ctx.closePath();

        this.orientation.draw('red');

    }

    update() {

    }

}