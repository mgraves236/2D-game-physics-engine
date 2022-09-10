import {bulletSource} from "../../bullet/source.js";
import {Vector} from "../../lib/vector.js";


export function setBunkers() {
    let source = new bulletSource(5, new Vector(470, 0), new Vector(1, 0), new Vector(0, 2),0, [470, 1200], [-1000, 1000], 2000);
    let source2 = new bulletSource(10, new Vector(0, 150), new Vector(0, 1), new Vector(5, -2), 0, [-1000, 1000], [150, 320], 3500);
    let source3 = new bulletSource(10, new Vector(1133, 200), new Vector(0, 0), new Vector(-4, 1),24 * Math.PI / 180, [0, 0], [0,0]);
    let source4 = new bulletSource(10, new Vector(191, 670), new Vector(0, 0), new Vector(0.5, -6),20 * Math.PI / 180, [0, 0], [0,0], 2000);
    let source5 = new bulletSource(10, new Vector(1330, 705), new Vector(0, 0), new Vector(-1, -6),-5 * Math.PI / 180, [0, 0], [0,0], 2000);
    let source6 = new bulletSource(10, new Vector(815, 650), new Vector(0, 0), new Vector(4, -2),-55 * Math.PI / 180, [0, 0], [0,0]);
}