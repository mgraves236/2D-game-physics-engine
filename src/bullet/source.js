import { Bullet } from "./bullet.js";
import { Vector } from "../lib/vector.js";
import { map, screen } from "../engineCore/screen.js";
import {gEngine} from "../engineCore/core.js";
import {Rectangle} from "../rigidBody/rectangle.js";

/**
 * A class that represent a bullet source
 */
export class bulletSource extends Rectangle {

    constructor(number, loc, vel, velBull) {
        super(1, loc, 15, 20);
        this.type = "bulletSource"
        this.numberOfBullets = number;
        // this.width = 15;
        // this.height = 20;
        // this.massCenter = loc;
        // this.location = new Vector(0, 0);
        this.velocity = new Vector(0, 0,0,0,false);
        this.velocityBullet = new Vector(0, 0,0, 0, false);
        // this.location = loc;
        this.velocity = vel;
        this.velocityBullet = velBull;
        this.velocityBullet.add(this.velocity);
        this.bulletsArr = [];
        this.shot = 0;
        this.previousMillis = 0;
        this.interval = 4000;
        // gEngine.Core.mAllObjects.push(this)
    }

    shoot() {
        let bulletsVel = this.velocityBullet.copy();

        let loc2 = new Vector(this.massCenter.x, this.massCenter.y, 0,0,false);
        let bullet = new Bullet(loc2, bulletsVel);
        //let drag = new Vector(0, map(0));
        this.bulletsArr.push(bullet);
        this.shot = this.shot + 1;
    }

    update() {
        if (this.massCenter.x > screen.mWidth) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y, 0, 0, false);
            this.massCenter.add(this.velocity);
        } else if (this.massCenter.x < 0) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y, 0, 0, false);
            this.massCenter.add(this.velocity);
        } else if (this.massCenter.y > screen.mHeight) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y, 0, 0, false);
            this.massCenter.add(this.velocity);
        } else if (this.massCenter.y < 0) {
            this.velocity =new Vector(this.velocity.x, -this.velocity.y, 0, 0, false);
            this.massCenter.add(this.velocity);
        } else {
            this.massCenter.add(this.velocity);
        }
        let currentMillis = new Date().getTime();
        if (currentMillis - this.previousMillis >= this.interval) {
            this.previousMillis = currentMillis;
            if (this.shot < this.numberOfBullets) {
                this.shoot();
            }
        }
        if (this.shot !== 0) {
            for (let i = 0; i < this.shot; i++) {
                this.bulletsArr[i].update();
            }
        }
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.massCenter.x - this.width / 2, this.massCenter.y - this.height / 2, 15, 20);
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        if (this.shot !== 0) {
            for (let i = 0; i < this.shot; i++) {
                ctx.save();
                this.bulletsArr[i].display();
                ctx.restore();
            }
        }
        ctx.save()
        this.displayBounds();
        ctx.restore();
    }

}