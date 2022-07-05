class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(a) {
        this.x = this.x + a.x;
        this.y = this.y + a.y;
    }

    sub(a) {
        this.x = this.x - a.x;
        this.y = this.y - a.y;
    }

    mult(n) {
        this.x = n * this.x;
        this.y = n * this.y;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let mag = this.mag();
        this.x = this.x / mag;
        this.y = this.y / mag;
    }
}
