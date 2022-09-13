import {bulletSource} from "../bullet/source.js";
import {Vector} from "../../lib/vector.js";
import {gEngine} from "../../engineCore/core.js";
import {FuelTank} from "../fuelTank.js";
import {screen} from "../../engineCore/screen.js";

export function setBunkers() {
    new bulletSource(0, new Vector(470, 0  * screen.mHeight / 900), new Vector(1, 0), new Vector(0, 2), 0, [470, 1200], [-1000, 1000]);
    new bulletSource(0, new Vector(0, 150  * screen.mHeight / 900), new Vector(0, 1), new Vector(5, -2), 45 * Math.PI / 180, [-1000, 1000], [150, 320], 4500);
    new bulletSource(0, new Vector(1133, 200 * screen.mHeight / 900), new Vector(0, 0), new Vector(-4, 1), 24 * Math.PI / 180, [0, 0], [0, 0]);
    new bulletSource(0, new Vector(191, 670 * screen.mHeight / 900), new Vector(0, 0), new Vector(0.5, -6), 20 * Math.PI / 180, [0, 0], [0, 0], 4700);
    new bulletSource(0, new Vector(1330, 705 * screen.mHeight / 900), new Vector(0, 0), new Vector(-1, -6), -5 * Math.PI / 180, [0, 0], [0, 0], 4700);
    new bulletSource(0, new Vector(815, 650  * screen.mHeight / 900), new Vector(0, 0), new Vector(4, -2), -55 * Math.PI / 180, [0, 0], [0, 0]);

    gEngine.Level.bunkersNumber = 6;
}

let locations = [
    {loc: new Vector(500,570 * screen.mHeight / 900), angle: -20},
    {loc: new Vector(930,210 * screen.mHeight / 900), angle: 6},
    {loc: new Vector(1245,718 * screen.mHeight / 900), angle: -2},
    {loc: new Vector(700,363 * screen.mHeight / 900), angle: -2},
    {loc: new Vector(80,375 * screen.mHeight / 900), angle: 13},
    {loc: new Vector(1000,386 * screen.mHeight / 900), angle: -5},
    {loc: new Vector(540,390 * screen.mHeight / 900), angle: -6},
    {loc: new Vector(240,710 * screen.mHeight / 900), angle: 15},
    {loc: new Vector(1125,150 * screen.mHeight / 900), angle: -40},
    {loc: new Vector(1170,862 * screen.mHeight / 900), angle: 0},
    {loc: new Vector(802,550 * screen.mHeight / 900), angle: 45},
    {loc: new Vector(770,875 * screen.mHeight / 900), angle: 10},
]

export function setFuel() {
        gEngine.Level.Fuel.Index = 1;
        gEngine.Level.Fuel.Array.push(new FuelTank(locations[0].loc, locations[0].angle * Math.PI / 180));
        gEngine.Level.Fuel.Array.push(new FuelTank(locations[1].loc, locations[1].angle * Math.PI / 180));
}

export {locations}