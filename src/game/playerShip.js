import {screen} from "../engineCore/screen.js";
import {Vector} from "../lib/vector.js";
import {gEngine} from "../engineCore/core.js";
import data from './../engineCore/config.json' assert {type: 'json'};
import {Rectangle} from "../rigidBody/rectangle.js";
import {Triangle} from "../rigidBody/triangle.js";

export class PlayerShip extends Triangle {
    constructor(location) {
        super(data.spaceshipMass, location, 63, 48);
        this.width = 63;
        this.height = 48;
        this.angle = 0;
        this.engineOn = false;
        this.rotatingLeft = false;
        this.rotatingRight = false;
        this.acceleration = new Vector();
        let gravity = gEngine.Core.mGravity.scale(this.mass);
        this.acceleration = this.acceleration.add(gravity);
        this.accelerationDrag = new Vector();
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.translate(this.massCenter.x, this.massCenter.y);
        // angle is in radians
        ctx.rotate(this.angle);
        ctx.translate(0, 0);
        ctx.translate(0, -this.height / 2);
        let p = new Path2D('M27.5,30.9L13.8,19.7c-0.6-0.5-1.2-0.7-1.9-0.9C7.8,9.6,3.9,1.5,3.9,1.5S3.6,1.2,3.1,0.9c-1-0.7-2-1-2.9-0.9c-0.9,0-1.9,0.2-2.9,0.9c-0.5,0.3-0.7,0.5-0.7,0.5s-4,8.2-8.1,17.4c-0.8,0.1-1.7,0.4-2.4,0.9L-27.5,31c-2.9,2.4-1.6,7,2.1,7.5l5.5,0.7c-0.7,2.1-1.1,3.7-1,4.5c0.7,4.6,7.2,2.7,7.2,2.7l4.1-3.1c2.9-1.1,8.8-2.2,19-0.1c0.2,0,0.3,0.1,0.5,0.1l4.2,3.2c0,0,6.5,1.9,7.2-2.7c0.1-0.8-0.3-2.4-1-4.6l5-0.7C29,37.9,30.3,33.2,27.5,30.9z');
        ctx.fillStyle = '#1f1f1f';
        ctx.fill(p);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = '1.5';
        ctx.stroke(p);
        if (this.engineOn) {
            ctx.save();
            const fireYPos = 41;
            const fireXPos = 0;
            ctx.beginPath();
            ctx.moveTo(fireXPos - 10, fireYPos);
            ctx.lineTo(fireXPos + 10, fireYPos);
            ctx.lineTo(fireXPos, fireYPos + Math.random() * 50);
            ctx.lineTo(fireXPos - 10, fireYPos);
            ctx.closePath();
            let grd = ctx.createLinearGradient(fireXPos, fireYPos, fireXPos, fireYPos + 30);
            grd.addColorStop(0, "red");
            grd.addColorStop(1, "orange");
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.restore();
        }
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
        this.massCenter.x = (screen.mWidth + this.massCenter.x) % screen.mWidth;
        this.massCenter.y = (screen.mHeight + this.massCenter.y) % screen.mHeight;
        this.computeVertex();
        this.computeFaceNormal();
        // Turning
        if (this.rotatingLeft) {
            this.angle -= degToRad;
            this.rotate(-degToRad);
        }
        if (this.rotatingRight) {
            this.angle += degToRad;
            this.rotate(degToRad);
        }

        // Acceleration
        if (this.engineOn) {
            this.velocity.x += (data.thrust / 100) * Math.sin(this.angle);
            this.velocity.y -= (data.thrust / 100) * Math.cos(this.angle);
        }
        // this.velocity.add(this.acceleration);
        // this.acceleration.scale(0);
        // this.accelerationDrag.scale(0);
    }
}