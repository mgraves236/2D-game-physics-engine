import { Bullet } from "./bullet.js";
import { Vector } from "../lib/vector.js";
import { screen } from "../engineCore/screen.js";
import {gEngine} from "../engineCore/core.js";
import {Rectangle} from "../rigidBody/rectangle.js";

/**
 * A class that represent a bullet source
 */
export class bulletSource extends Rectangle {

    /**
     *
     * @param {number} number
     * @param {Vector} loc
     * @param {Vector} vel
     * @param {Vector} velBull
     * @param angle
     * @param limitX
     * @param limitY
     */
    constructor(number, loc, vel, velBull, angle = 0, limitX = [0, screen.mWidth], limitY = [0, screen.mHeight]) {
        super(1, loc, 15, 20, angle);
        this.additionalInfo = "bulletSource"
        this.numberOfBullets = number;
        this.velocity = new Vector();
        this.limitX = limitX;
        this.limitY = limitY;
        this.velocityBullet = new Vector();
        // this.location = loc;
        this.velocity = vel;
        this.velocityBullet = velBull;
        this.velocityBullet = this.velocityBullet.add(this.velocity);
        this.bulletsArr = [];
        this.shot = 0;
        this.previousMillis = 0;
        this.interval = 4000;
        // gEngine.Core.mAllObjects.push(this)
    }

    shoot() {
        let bulletsVel = this.velocityBullet.copy();

        let loc2 = new Vector(this.massCenter.x + this.width / 2, this.massCenter.y + this.height / 2);
        let bullet;
        bullet = new Bullet(loc2, bulletsVel);
        // this.bulletsArr.push(bullet);
        this.shot = this.shot + 1;
    }

    update() {
        if (this.massCenter.x > this.limitX[1]) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            this.massCenter =  this.massCenter.add(this.velocity);
        } else if (this.massCenter.x <  this.limitX[0]) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            this.massCenter = this.massCenter.add(this.velocity);
        }  if (this.massCenter.y >  this.limitY[1]) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.massCenter = this.massCenter.add(this.velocity);
        } else if (this.massCenter.y < this.limitY[0]) {
            this.velocity =new Vector(this.velocity.x, -this.velocity.y);
            this.massCenter = this.massCenter.add(this.velocity);
        } else {
            this.massCenter = this.massCenter.add(this.velocity);
        }
        let currentMillis = new Date().getTime();
        if (currentMillis - this.previousMillis >= this.interval) {
            this.previousMillis = currentMillis;
            if (this.shot < this.numberOfBullets) {
                this.shoot();
            }
        }
        // if (this.shot !== 0) {
        //     for (let i = 0; i < this.shot; i++) {
        //         this.bulletsArr[i].update();
        //     }
        // }
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.translate(this.massCenter.x, this.massCenter.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.rect( - this.width / 2, - this.height / 2, 15, 20);
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        ctx.restore();


        // if (this.shot !== 0) {
        //     for (let i = 0; i < this.shot; i++) {
        //         ctx.save();
        //         this.bulletsArr[i].display();
        //         ctx.restore();
        //     }
        // }
        ctx.save()
        ctx.restore();
    }

}