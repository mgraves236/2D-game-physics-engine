import {screen, map} from "../engineCore/screen.js";
import { Vector } from "../lib/vector.js";
import { Object } from "../lib/object.js";
import {_engineCore as engineCore} from "../engineCore/core.js";

export class PlayerShip extends Object {
    constructor() {
        super();
        this.mass = 10000000;
        this.x = screen.mWidth / 2;
        this.y = screen.mHeight / 2;
        this.location = new Vector(this.x, this.y);
        this.orientation = new Vector(this.x, this.y + 0.000001, this.x, this.y);
        this.orientation.normalize();
        this.velocity = new Vector(this.location.x, this.location.y - 0.0000000001, this.location.x, this.location.y);
        this.acceleration = new Vector(0,0);
        // this.acceleration.add(engineCore.mGravity);
        this.accelerationDrag = new Vector(0,0);
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(Math.PI / 2 - this.velocity.angle());
        let p = new Path2D('M27.5,30.9L13.8,19.7c-0.6-0.5-1.2-0.7-1.9-0.9C7.8,9.6,3.9,1.5,3.9,1.5S3.6,1.2,3.1,0.9c-1-0.7-2-1-2.9-0.9c-0.9,0-1.9,0.2-2.9,0.9c-0.5,0.3-0.7,0.5-0.7,0.5s-4,8.2-8.1,17.4c-0.8,0.1-1.7,0.4-2.4,0.9L-27.5,31c-2.9,2.4-1.6,7,2.1,7.5l5.5,0.7c-0.7,2.1-1.1,3.7-1,4.5c0.7,4.6,7.2,2.7,7.2,2.7l4.1-3.1c2.9-1.1,8.8-2.2,19-0.1c0.2,0,0.3,0.1,0.5,0.1l4.2,3.2c0,0,6.5,1.9,7.2-2.7c0.1-0.8-0.3-2.4-1-4.6l5-0.7C29,37.9,30.3,33.2,27.5,30.9z');
        ctx.fillStyle = '#1f1f1f';
        ctx.fill(p);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = '1.5';
        ctx.stroke(p);
        ctx.restore();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.velocity.draw('red')

    }

    update() {
        if ((this.location.x > screen.mWidth + 2) ||
            (this.location.y > screen.mHeight + 2)) {
        } else {
            for (let i = 0; i < engineCore.mDragAreas.length; i++) {
                let area = engineCore.mDragAreas[i];
                if (this.isInside(area)) {
                    this.drag(area);
                    this.velocity.add(this.accelerationDrag);
                }
            }
            //this.velocity.add(this.acceleration);
            console.log('location')
            console.log(this.location)
            console.log(this.velocity)
            //this.orientation.draw('black')
            console.log('get')
            console.log(this.velocity.get())
            this.location.addOrg(this.velocity.get());
            let oldVel = this.velocity.copy();
            console.log('oldVel')
            console.log(oldVel)
            this.velocity.x = this.location.x;
            this.velocity.x0 = this.location.x;
            this.velocity.y = this.location.y;
            this.velocity.y0 = this.location.y;
            this.velocity.addOrg(oldVel.get());
        }
    }
}