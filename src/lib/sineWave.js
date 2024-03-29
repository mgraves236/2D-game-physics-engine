/**
 * Class that represents a sine wave used in DragArea animation
 * @class SineWave
 */
export class SineWave {
    constructor(x,y,s) {
        this.x = x;
        this.y = y;
        this.length = 500000; // frequency
        this.amplitude = 3;
        this.speed = s * 0.03;
    }
}