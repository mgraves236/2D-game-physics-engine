import {Bullet} from "./bullet.js";
import {Vector} from "../lib/vector.js";
import {map, screen} from "../engineCore/screen.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var test = 3;

/**
 * A class that represent a bullet source
 */
export class bulletSource {

    constructor(number, loc, vel, velBull) {
        this.numberOfBullets = number;
        this.location = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.velocityBullet = new Vector(0, 0);
        this.location = loc;
        this.velocity = vel;
        this.velocityBullet = velBull;
        this.bulletsArr = [];
        this.velocityBullet.add(this.velocity);
        this.shot = 0;
        this.previousMillis = 0;
        this.interval = 2000;
    }

    shoot() {
        let bulletsVel = new Vector(this.velocityBullet.x, map(this.velocityBullet.y));
        let loc2 = new Vector(this.location.x, map(this.location.y));
        let bullet = new Bullet(loc2, bulletsVel);
        this.bulletsArr.push(bullet);
        this.shot = this.shot + 1;
    }

    update() {
        if ((this.location.x > screen.mWidth + 2) ||
            (this.location.y > screen.mHeight + 2)) {
        } else {
            this.location.add(this.velocity);
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
        ctx.rect(this.location.x - 10, this.location.y - 10, 15, 20);
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        if (this.shot !== 0) {
            console.log(this.shot);
            for (let i = 0; i < this.shot; i++) {
                this.bulletsArr[i].display();
            }
        }
    }
}