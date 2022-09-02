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
     * @param {boolean} isRandom
     */
    constructor(number, loc, vel, velBull, isRandom) {
        super(1, loc, 15, 20);
        this.isRandom = isRandom || false;
        this.type = "bulletSource"
        this.numberOfBullets = number;
        // this.width = 15;
        // this.height = 20;
        // this.massCenter = loc;
        // this.location = new Vector(0, 0);
        this.velocity = new Vector();
        this.velocityBullet = new Vector();
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

        let loc2 = new Vector(this.massCenter.x, this.massCenter.y);
        let bullet;
        if (this.isRandom) {
            let r = Math.floor((Math.random() + 1) * 8);
            let m;
            if (r < 5) {
                m = r * 0.1;
            } else {
                m = r * 0.8;
            }
            bullet = new Bullet(loc2, bulletsVel, r, m);
        } else {
            bullet = new Bullet(loc2, bulletsVel);
        }
        this.bulletsArr.push(bullet);
        this.shot = this.shot + 1;
    }

    update() {
        if (this.massCenter.x > screen.mWidth) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            this.massCenter.add(this.velocity);
        } else if (this.massCenter.x < 0) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            this.massCenter.add(this.velocity);
        } else if (this.massCenter.y > screen.mHeight) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.massCenter.add(this.velocity);
        } else if (this.massCenter.y < 0) {
            this.velocity =new Vector(this.velocity.x, -this.velocity.y);
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
        ctx.restore();
    }

}