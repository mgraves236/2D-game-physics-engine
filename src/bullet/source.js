import { Bullet } from "./bullet.js";
import { Vector } from "../lib/vector.js";
import {screen} from "../engineCore/screen.js";

/**
 * A class that represent a bullet souce
 */
export class bulletSource {

    constructor(number, loc, vel) {
        this.location = new Vector(0,0);
        this.location = loc;
        this.velocity = vel || new Vector(0,0);
        this.numberOfBullets = number;
        this.bulletsArr = new Array(this.numberOfBullets);
       // for (let i = 0; i < this.numberOfBullets; i++) {
       //      let bulletsVel = new Vector( 1 + 1 * i,0);
       //      bulletsVel.add(this.velocity);
       //      this.bulletsArr[i] = new Bullet(loc, bulletsVel);
        //}
        let loc2 = new Vector(10,200);
        let vel1 = new Vector(1, 0);
        let vel2 = new Vector(2, 0.5);
        var bullet1 =  new Bullet(loc,vel1);
        var bullet2 =  new Bullet(loc2,vel2);
        this.bulletsArr[0]=bullet1;
        this.bulletsArr[1]=bullet2;
        console.log(this.bulletsArr);
    }

    update() {
        for (let i = 0; i < this.numberOfBullets; i++) {
            this.bulletsArr[i].updateBullet();
        }
    }

   display() {
        for (let i = 0; i < this.numberOfBullets; i++) {
           this.bulletsArr[i].display();
        }
    }

}