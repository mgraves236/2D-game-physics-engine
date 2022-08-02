import { screen, map } from "../engineCore/screen.js";
import { Vector } from "../lib/vector.js";
import { _engineCore as engineCore } from "../engineCore/core.js";
import data from './../engineCore/config.json' assert {type: 'json'};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class Bullet {
    /**
     *
     * @param loc
     * @param vel
     */
    constructor(loc, vel, acc, delay) {
        // initialize types
        this.mass = data.bulletMass;
        this.location = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.acceleration = acc || new Vector(0, 0);
        this.location = loc;
        this.velocity = vel;
        this.acceleration.add(engineCore.mGravity);
        this.delay = delay || 0;
    }

    applyForce(force) {
        let f = force;
        f.mult(1 / this.mass);
        console.log(f)
        this.acceleration.add(f);
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.fillStyle = 'black'; /* TODO define global styles for the app */
        ctx.beginPath();
        ctx.ellipse(this.location.x, this.location.y,
            3, 3, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        sleep(this.delay).then(() => {
            if ((this.location.x > screen.mWidth + 2) ||
                (this.location.y > screen.mHeight + 2)) {
            } else {
                for (let i = 0; i < engineCore.mDragAreas.length; i++) {
                    let area = engineCore.mDragAreas[i];
                    if (this.isInside(area)) {
                        this.drag(area);
                    }
                }
                this.velocity.add(this.acceleration);
                this.location.add(this.velocity);
            }
        });
    }

    isInside(area) {
        if (this.location.x > area.x &&
            this.location.x < area.x + area.w &&
            this.location.y > area.y &&
            this.location.y < area.y + area.h) {
            return true;
        } else {
            return false;
        }
    }

    drag(dragObj) {
        let speed = this.velocity.mag();
        let dragMagnitude = dragObj.c * speed * speed;
        let drag = new Vector(0, 0);
        drag.x = this.velocity.x;
        drag.y = this.velocity.y;
        console.log('x  ' + drag.x + '  y   ' + drag.y)
        drag.mult(-1);
        console.log('x  ' + drag.x + '  y   ' + drag.y)
        drag.normalize();
        drag.mult(dragMagnitude);
        drag.y = map(drag.y);
        console.log(drag)
        this.applyForce(drag);
    }
}
