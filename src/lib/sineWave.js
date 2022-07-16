export class SineWave {
    constructor(x,y, theta, amp) {
        this.x = x;
        this.y = y;
        this.length= 300000;
        this.amplitude = ( amp || 3);
        this.speed = 0.01;
        this.theta = (theta || 0);
    }
}