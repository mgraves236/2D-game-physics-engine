import {screen} from "../engineCore/screen.js";
import {Rectangle} from "../rigidBody/rectangle.js";
import {Vector} from "../lib/vector.js";
import {Triangle} from "../rigidBody/triangle.js";
import {Circle} from "../rigidBody/circle.js";

export function setTerrain() {
    let ctx = screen.mContext;

    let terrain = new Terrain();
}

let Terrain = function () {
    let info = "terrain";
    // player base
    new Rectangle(0, new Vector(screen.mWidth / 2 , screen.mHeight + 40), 100, 100, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 100,screen.mHeight + 30), 100, 100 , 80 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 100,screen.mHeight - 20), 400, 100, -90 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 - 50,screen.mHeight - 20), 100, 100, 0 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 40 ,screen.mHeight - 142), 80, 100, -100 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 200,screen.mHeight - 150), 100, 300, 0 * Math.PI / 180, 0.4,0.1, false, info);
    // new Triangle(0, new Vector(screen.mWidth / 2 - 280,screen.mHeight - 290), 100, 80, -45 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 - 150,screen.mHeight - 220), 80, -45 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 -71,screen.mHeight - 219), 180, 90, 25 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2,screen.mHeight - 169), 60, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 - 10,screen.mHeight + 50), 70, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 - 40 ,screen.mHeight - 30), 70, 70, -30 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 51,screen.mHeight - 220), 70, 170, -10 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 51,screen.mHeight - 142), 55, 70, 85 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 10 , screen.mHeight - 300), 100, 300, 0, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 - 10,screen.mHeight - 450), 50, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 100,screen.mHeight - 350), 200, 270, 20 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 - 172.5,screen.mHeight - 471), 150, 150, 50 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 41,screen.mHeight - 450), 150, 150, -5 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 - 230,screen.mHeight - 152), 150, -5 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 - 225,screen.mHeight - 300), 100, 200, 43 * Math.PI / 180, 0.4,0.1, false, info);



    // asteroid
    new Circle(0, new Vector(screen.mWidth / 2 + 300,screen.mHeight - 450), 60, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 + 250,screen.mHeight - 450), 50, 30 * Math.PI / 180, 0.4,0.1, false, info);
    // asteroid big
    new Circle(0, new Vector(screen.mWidth / 2 + 650,screen.mHeight - 750), 120, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 + 450,screen.mHeight - 750), 100, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 + 550,screen.mHeight - 720), 100, 30 * Math.PI / 180, 0.4,0.1, false, info);
    // asteroid little
    new Circle(0, new Vector(screen.mWidth / 2 + 130,screen.mHeight - 660), 30, 30 * Math.PI / 180, 0.4,0.1, false, info);

    // wall right
    new Rectangle(0, new Vector(screen.mWidth + 100, screen.mHeight), 400, 900, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth + 80 , screen.mHeight + 40), 400, 900, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth + 60, screen.mHeight + 40), 400, 500,-10 * Math.PI / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 150, screen.mHeight + 40), 200, 150,0 * Math.PI / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 250, screen.mHeight + 40), 50, 380,0 * Math.PI / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 350, screen.mHeight + 40), 40, 200,0 * Math.PI / 180 , 0.4,0.1, false, info);

    // top wall
    new Circle(0, new Vector(200, -200), 300 , 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(0, 42), 500, 150, -5 * Math.PI / 180, 0.4,0.1, false, info);


    // wall left
    new Rectangle(0, new Vector(0, screen.mHeight), 200, 1000, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(200, screen.mHeight - 140), 200, 100, 38 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(350, screen.mHeight - 140), 200, 300, 20 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(360, screen.mHeight - 160), 100, 200, 0 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(340, screen.mHeight - 160), 150, 200, -20 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(295, screen.mHeight - 130), 90, 200, 0* Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(250, screen.mHeight - 150), 100, 120,  20* Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(100, screen.mHeight - 100), 150, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 500 , screen.mHeight - 50), 500, 100, 0, 0.4,0.1, false, info);
    new Triangle(0, new Vector(120 , screen.mHeight - 200), 200, 500, -5 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(0 , screen.mHeight - 525), 200, 50, 0 * Math.PI / 180, 0.4,0.1, false, info);



};