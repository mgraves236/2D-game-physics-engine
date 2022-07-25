import { Bullet } from "./bullet.js";
import { Vector } from "../lib/vector.js";
import { map, screen } from "../engineCore/screen.js";

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
        this.interval = 4000;
    }

    shoot() {
        let bulletsVel = new Vector(this.velocityBullet.x, map(this.velocityBullet.y));
        let loc2 = new Vector(this.location.x, map(this.location.y));
        let bullet = new Bullet(loc2, bulletsVel);
        //let drag = new Vector(0, map(0));
        this.bulletsArr.push(bullet);
        this.shot = this.shot + 1;
    }

    update() {
        if (this.location.x > screen.mWidth) {
            this.velocity = new Vector(-this.velocity.x, map(this.velocity.y));
            this.location.add(this.velocity);
        } else if (this.location.x < 0) {
            this.velocity = new Vector(-this.velocity.x, map(this.velocity.y));
            this.location.add(this.velocity);
        } else if (this.location.y > screen.mHeight) {
            this.velocity = new Vector(this.velocity.x, -map(this.velocity.y));
            this.location.add(this.velocity);
        } else if (this.location.y < 0) {
            this.velocity = new Vector(this.velocity.x, -map(this.velocity.y));
            this.location.add(this.velocity);
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
            for (let i = 0; i < this.shot; i++) {
                this.bulletsArr[i].display();
            }
        }
    }
}