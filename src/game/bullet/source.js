import { Bullet } from "./bullet.js";
import { Vector } from "../../lib/vector.js";
import { screen } from "../../engineCore/screen.js";
import {Rectangle} from "../../rigidBody/rectangle.js";

/**
 * A class that represents a bullet source
 * @class BulletSource
 */
export class BulletSource extends Rectangle {

    /**
     * Constructor of bulletSource class
     * @param {number} number number of shot bullets with intervals specified by interval parameter
     * @param {Vector} loc source location
     * @param {Vector} vel source velocity
     * @param {Vector} velBull velocity of bullets shot by the source
     * @param angle source angle
     * @param {number[]} limitX maximum motion range in x-axis
     * @param {number[]} limitY maximum motion range in y-axis
     * @param {number} interval interval in which bullets are propelled
     */
    constructor(number, loc, vel, velBull, angle = 0, limitX = [0, screen.mWidth], limitY = [0, screen.mHeight], interval = 4000) {
        super(1, loc, 15, 20, angle, 0, 0, false);
        this.additionalInfo = "bulletSource"
        this.numberOfBullets = number;
        this.velocity = new Vector();
        this.limitX = limitX;
        this.limitY = limitY;
        this.velocityBullet = new Vector();
        this.velocity = vel;
        this.velocityBullet = velBull;
        this.velocityBullet = this.velocityBullet.add(this.velocity);
        this.shot = 0;
        this.previousMillis = 0;
        this.interval = interval;
        this.damage = false;
    }

    /**
     * spawn a new bullet
     */
    shoot() {
        let bulletsVel = this.velocityBullet.copy();

        let loc2 = new Vector(this.massCenter.x + this.width / 2, this.massCenter.y + this.height / 2);
        new Bullet(loc2, bulletsVel, "bunkerBullet");
        this.shot = this.shot + 1;
    }

    /**
     * change damage status
     */
    takeDamage() {
      this.damage = true;
    }

    update() {

        if (this.massCenter.x > this.limitX[1]) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            // update vertex and mass center position
             super.update();
        } else if (this.massCenter.x <  this.limitX[0]) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            // update vertex and mass center position
            super.update();
        }  if (this.massCenter.y >  this.limitY[1]) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            // update vertex and mass center position
            super.update();
        } else if (this.massCenter.y < this.limitY[0]) {
            this.velocity =new Vector(this.velocity.x, -this.velocity.y);
            // update vertex and mass center position
            super.update();
        } else {
            // update vertex and mass center position
            super.update();
        }
        let currentMillis = new Date().getTime();
        if (currentMillis - this.previousMillis >= this.interval) {
            this.previousMillis = currentMillis;
            if (this.shot < this.numberOfBullets) {
                this.shoot();
            }
        }
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.translate(this.massCenter.x, this.massCenter.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.rect( - this.width / 2, - this.height / 2, this.width, this.height);
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

}