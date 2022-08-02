import { screen, map } from "../engineCore/screen.js";
import {Vector} from "../lib/vector.js";
import {_engineCore as engineCore} from "../engineCore/core.js";

export class PlayerShip {
    constructor() {
        this.x = screen.mWidth / 2;
        this.y = screen.mHeight / 2;
        this.location = new Vector(this.x, this.y);
        this.orientation = new Vector(this.x, this.y + 50, this.x, this.y);
        this.velocity = new Vector(0, 0, this.x, this.y);
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(Math.PI / 2 - this.orientation.angle());
        let p = new Path2D('M27.5,30.9L13.8,19.7c-0.6-0.5-1.2-0.7-1.9-0.9C7.8,9.6,3.9,1.5,3.9,1.5S3.6,1.2,3.1,0.9c-1-0.7-2-1-2.9-0.9c-0.9,0-1.9,0.2-2.9,0.9c-0.5,0.3-0.7,0.5-0.7,0.5s-4,8.2-8.1,17.4c-0.8,0.1-1.7,0.4-2.4,0.9L-27.5,31c-2.9,2.4-1.6,7,2.1,7.5l5.5,0.7c-0.7,2.1-1.1,3.7-1,4.5c0.7,4.6,7.2,2.7,7.2,2.7l4.1-3.1c2.9-1.1,8.8-2.2,19-0.1c0.2,0,0.3,0.1,0.5,0.1l4.2,3.2c0,0,6.5,1.9,7.2-2.7c0.1-0.8-0.3-2.4-1-4.6l5-0.7C29,37.9,30.3,33.2,27.5,30.9z');
        ctx.fillStyle = '#1f1f1f';
        ctx.fill(p);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = '1.5';
        ctx.stroke(p);
        ctx.restore();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    update() {
        if ((this.location.x > screen.mWidth + 2) ||
            (this.location.y > screen.mHeight + 2)) {
        } else {
           // this.velocity.add(this.acceleration);
            this.location.add(this.velocity);
          //  console.log(this.location)
        }
    }
}