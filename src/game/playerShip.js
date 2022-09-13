import {screen} from "../engineCore/screen.js";
import {Vector} from "../lib/vector.js";
import data from './../engineCore/config.json' assert {type: 'json'};
import {Triangle} from "../rigidBody/triangle.js";
import {Rectangle} from "../rigidBody/rectangle.js";
import {Bullet} from "./bullet/bullet.js";

export class PlayerShip extends Triangle {
    constructor(location) {
        super(data.spaceshipMass, location, 30, 28,0, 0.1,0.2);
        this.angle = 0;
        this.engineOn = false;
        this.isRayOn = false;
        this.rotatingLeft = false;
        this.rotatingRight = false;
        this.accelerationDrag = new Vector();
        // game variables
        this.lives = 6;
        this.fuel = 150;
    }

    shoot() {
        let velocity = new Vector(0, -10);
        velocity = velocity.rotate(this.angle);
        new Bullet(this.vertex[0], velocity, "playerBullet", 3, 0.5);
    }

    loseLife() {
        this.lives = this.lives - 1;
    }

    checkFuel() {
        return this.fuel > 0;
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.translate(this.massCenter.x, this.massCenter.y);
        // angle is in radians
        ctx.rotate(this.angle);
        ctx.translate(0, 0);
        ctx.translate(0, -this.height / 2);
        if (this.engineOn && this.fuel > 0) {
            ctx.save();
            const fireYPos = 23;
            const fireXPos = 0;
            ctx.beginPath();
            ctx.moveTo(fireXPos - 8, fireYPos);
            ctx.lineTo(fireXPos + 8, fireYPos);
            ctx.lineTo(fireXPos, fireYPos + Math.random() * 30);
            ctx.lineTo(fireXPos - 8, fireYPos);
            ctx.closePath();
            let grd = ctx.createLinearGradient(fireXPos, fireYPos, fireXPos, fireYPos + 20);
            grd.addColorStop(0, "red");
            grd.addColorStop(1, "orange");
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.restore();
        }

        if (this.isRayOn) {
            ctx.save();
            const rayYPos = 70;
            const rayXPos = 0;
            ctx.beginPath();
            ctx.moveTo(rayXPos - 20, rayYPos);
            ctx.lineTo(rayXPos + 20, rayYPos);
            ctx.lineTo(rayXPos, 0);
            ctx.lineTo(rayXPos - 20, rayYPos);
            ctx.closePath();
            let grd = ctx.createLinearGradient(rayXPos, 20, rayXPos, rayYPos);
            grd.addColorStop(0, "#99CCCC");
            grd.addColorStop(1, "white");
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.restore();
        }
        let p = new Path2D('M15.4,18.1l-7.7-6.3c-0.3-0.3-0.7-0.4-1.1-0.5C4.4,6.2,2.2,1.6,2.2,1.6S2,1.4,1.8,1.3C1.2,0.9,0.6,0.7,0.1,0.7c-0.5,0-1.1,0.1-1.6,0.5c-0.3,0.2-0.4,0.3-0.4,0.3s-2.2,4.6-4.6,9.8c-0.5,0-0.9,0.2-1.3,0.5l-7.7,6.3c-1.6,1.3-0.9,3.9,1.2,4.2l3.1,0.4c-0.4,1.2-0.6,2.1-0.5,2.5c0.4,2.6,4.1,1.5,4.1,1.5l2.3-1.7c1.6-0.6,4.9-1.3,10.7-0.1c0.1,0,0.2,0,0.3,0L8,26.8c0,0,3.7,1.1,4.1-1.5c0.1-0.4-0.2-1.4-0.6-2.6l2.8-0.4C16.3,22,17.1,19.4,15.4,18.1z');
        ctx.fillStyle = '#1f1f1f';
        ctx.fill(p);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = '1.5';
        ctx.stroke(p);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.restore();
        ctx.save()
        this.displayBounds();
        ctx.restore();
    }

    update(angle) {
        // update vertex and mass center position
        super.update();
        // update velocity with drag if the object is in a drag area
        super.updateDrag();
        // Angle has to be in radians
        const degToRad = Math.PI / 180;
        // Move spaceship to other side when leaving screen
        // hitbox needs to be updated
        // this.massCenter.x = (screen.mWidth + this.massCenter.x) % screen.mWidth;
        // this.massCenter.y = (screen.mHeight + this.massCenter.y) % screen.mHeight;
        // this.computeVertex();
        // this.computeFaceNormal();
        // Turning
        if (this.rotatingLeft) {
            // this.angle -= degToRad;
            this.angularVelocity = 0;
            this.rotate(-degToRad);

        }
        if (this.rotatingRight) {
            // this.angle += degToRad;
            this.angularVelocity = 0;
            this.rotate(degToRad);
        }
        // Acceleration
        if (this.engineOn) {
           if (this.fuel > 0) {
               this.velocity.x += (data.thrust / 100) * Math.sin(this.angle);
               this.velocity.y -= (data.thrust / 100) * Math.cos(this.angle);
           }
            // decrease fuel
            this.fuel--;
        }
    }
}