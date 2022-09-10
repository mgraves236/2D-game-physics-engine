import {screen} from "../engineCore/screen.js";
import {Rectangle} from "../rigidBody/rectangle.js";
import {Vector} from "../lib/vector.js";
import {Triangle} from "../rigidBody/triangle.js";
import {Circle} from "../rigidBody/circle.js";

export function setTerrain() {
    let ctx = screen.mContext;

    let terrain = new Terrain();
}

/**
 * Terrain object, stores all terrain elements
 * @constructor
 */
let Terrain = function () {
    let info = "terrain";
    // player base
    new Rectangle(0, new Vector(screen.mWidth / 2 , screen.mHeight + 40), 100, 100, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 100,screen.mHeight + 30), 100, 100 , 80 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 100,screen.mHeight - 20), 400, 100, -90 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 - 50,screen.mHeight - 20), 100, 100, 0 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 40 ,screen.mHeight - 142), 80, 100, -100 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 200,screen.mHeight - 150), 100, 300, 0 * Math.PI / 180, 0.4,0.1, false, info);
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
    new Circle(0, new Vector(screen.mWidth / 2 + 140,screen.mHeight + 22), 50, -5 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 200,screen.mHeight + 12), 50,100, -47 * Math.PI / 180, 0.4,0.1, false, info);



    // asteroid
    new Circle(0, new Vector(screen.mWidth / 2 + 300,screen.mHeight - 450), 60, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 + 250,screen.mHeight - 450), 50, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 280,screen.mHeight - 500), 65,10,-8 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 280,screen.mHeight - 400), 30,70,-90 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 280,screen.mHeight - 400), 80,50,0 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 332,screen.mHeight - 415), 40,70,45 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 347,screen.mHeight - 475), 40,100,-5 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 292,screen.mHeight - 505), 20,70,60 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 310,screen.mHeight - 490), 70,70,22 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 228,screen.mHeight - 407), 50,70,160 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 206,screen.mHeight - 452), 25,45,2 * Math.PI / 180, 0.4,0.1, false, info);
    // asteroid big
    new Circle(0, new Vector(screen.mWidth / 2 + 650,screen.mHeight - 750), 95, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 424,screen.mHeight - 753), 70, 86,11 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 + 550,screen.mHeight - 720), 100, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 550,screen.mHeight - 810), 120, 150, 62 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 640,screen.mHeight - 685), 120, 150, 62 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 545,screen.mHeight - 672.5), 120, 150, 0 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 462,screen.mHeight - 668), 120, 150, 161 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 40, screen.mHeight - 750), 120, 150, 45 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 65, screen.mHeight - 720), 120, 150, -10 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 91, screen.mHeight - 772), 120, 150, 0 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 220, screen.mHeight - 807), 118, 160, 60 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 313, screen.mHeight - 807), 50, 60, 45 * Math.PI / 180, 0.4,0.1, false, info);
    // asteroid little
    new Circle(0, new Vector(screen.mWidth / 2 + 130,screen.mHeight - 660), 30, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 140,screen.mHeight - 655), 100, 40, 10 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 125,screen.mHeight - 677), 50, 40, 55 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 160,screen.mHeight - 670), 50, 60, -50 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 170,screen.mHeight - 645), 50, 60, -89 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 168,screen.mHeight - 620), 25, 60, 90 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 168,screen.mHeight - 625), 15, 60, 90 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 123,screen.mHeight - 641), 62, 40, 32 * Math.PI / 180, 0.4,0.1, false, info);

    // wall right
    new Circle(0, new Vector(screen.mWidth - 10, screen.mHeight - 450), 50, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 1, screen.mHeight - 490), 60,40,-30 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 10, screen.mHeight - 482), 60,40,-30 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 65, screen.mHeight - 445), 60,40,-25 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth + 100, screen.mHeight), 400, 900, 0, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 101, screen.mHeight - 430), 37, 41, 0 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth + 80 , screen.mHeight + 40), 400, 900, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth + 60, screen.mHeight + 40), 400, 500,-10 * Math.PI / 180 , 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 165, screen.mHeight - 135), 37, 50, -5 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth - 150, screen.mHeight - 70), 50,-10 * Math.PI / 180 , 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 120, screen.mHeight - 190), 37, 150, 5 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 160, screen.mHeight - 120), 37, 100, 0 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 150, screen.mHeight + 40), 200, 150,0 * Math.PI / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 150, screen.mHeight + 40), 200, 150,0 * Math.PI / 180 , 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 190, screen.mHeight - 80), 85, 130,45 * Math.PI / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 246.6, screen.mHeight - 158), 20, 20,-10 * Math.PI / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 260, screen.mHeight - 90), 20, 100,-15 * Math.PI / 180 , 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 273, screen.mHeight - 100), 20, 20,-15 * Math.PI / 180 , 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 268, screen.mHeight - 50), 150, 100,-10 * Math.PI / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 315, screen.mHeight - 0), 70, 50,-0 * Math.PI / 180 , 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth - 345, screen.mHeight - 5.7), 20,5 * Math.PI / 180 , 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 366, screen.mHeight - 8), 20,30,30 * Math.PI / 180 , 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth - 260, screen.mHeight - 90), 20,-15 * Math.PI / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 255, screen.mHeight - 158), 20, 20,0 * Math.PI / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 250, screen.mHeight + 40), 30, 380,0 * Math.PI / 180 , 0.4,0.1, false, info);

    // top wall
    new Circle(0, new Vector(200, -200), 300 , 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(0, 42), 500, 150, -5 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(350, 135), 100, 180, 170 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(300, 135), 50, 130, 180 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(150, 90), 150, 130, 180 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(190, 90), 100, 150, 180 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(250, 80), 100, 50, 175 * Math.PI / 180, 0.4,0.1, false, info);


    // wall left
    new Rectangle(0, new Vector(0, screen.mHeight), 200, 1000, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(200, screen.mHeight - 140), 200, 100, 38 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(350, screen.mHeight - 140), 200, 300, 20 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(360, screen.mHeight - 160), 100, 200, 0 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(340, screen.mHeight - 160), 150, 200, -20 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(295, screen.mHeight - 130), 90, 200, 0* Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(250, screen.mHeight - 150), 100, 120,  20* Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(80, screen.mHeight - 110), 150, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 500 , screen.mHeight - 50), 500, 100, 0, 0.4,0.1, false, info);
    new Triangle(0, new Vector(120 , screen.mHeight - 200), 200, 500, -5 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(0 , screen.mHeight - 525), 200, 49, 0 * Math.PI / 180, 0.4,0.1, false, info);
};