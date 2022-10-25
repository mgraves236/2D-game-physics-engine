import {screen} from "../../engineCore/screen.js";
import {Rectangle} from "../../rigidBody/rectangle.js";
import {Vector} from "../../lib/vector.js";
import {Triangle} from "../../rigidBody/triangle.js";
import {Circle} from "../../rigidBody/circle.js";

/**
 * Set terrain on level
 */
export function setTerrain() {
    new Terrain();
}

/**
 * Terrain object, stores all terrain elements
 * @constructor
 */
let Terrain = function () {
    let info = "terrain";
    // player base
    new Rectangle(0, new Vector(screen.mWidth / 2 , (900 + 40)  * screen.mHeight / 900), 100, 100, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 100,(900 + 30) * screen.mHeight / 900), 100, 100 , 80 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 100,(900 - 20) * screen.mHeight / 900), 400, 100, -90 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 - 50,(900 - 20) * screen.mHeight / 900), 100, 100, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 40 ,(900 - 142) * screen.mHeight / 900), 80, 100, -100 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 200,(900 - 150) * screen.mHeight / 900), 100, 300, 0, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 - 150,(900 - 220) * screen.mHeight / 900), 80, -45 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 -71,(900- 219) * screen.mHeight / 900), 180, 90, 25 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2,(900 - 169) * screen.mHeight / 900), 60, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 - 10,(900 + 50) * screen.mHeight / 900), 70, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 - 40 ,(900 - 30) * screen.mHeight / 900), 70, 70, -30 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 51,(900 - 220) * screen.mHeight / 900), 70, 170, -10 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 51,(900 - 142) * screen.mHeight / 900), 55, 70, 85 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 10 , (900 - 300) * screen.mHeight / 900), 100, 300, 0, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 - 10,(900 - 450) * screen.mHeight / 900), 50, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 100,(900 - 350) * screen.mHeight / 900), 200, 270, 20 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 - 172.5,(900 - 471) * screen.mHeight / 900), 150, 150, 50 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 41,(900 - 450) * screen.mHeight / 900), 150, 150, -5 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 - 230,(900 - 152) * screen.mHeight / 900), 150, -5 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 - 225,(900 - 300) * screen.mHeight / 900), 100, 200, 43 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 + 140,(900 + 22) * screen.mHeight / 900), 50, -5 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 200,(900 + 12) * screen.mHeight / 900), 50,100, -47 * Math.PI / 180, 0.4,0.1, false, info);



    // asteroid
    new Circle(0, new Vector(screen.mWidth / 2 + 300,(900 - 450) * screen.mHeight / 900), 60, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 + 250,(900 - 450) * screen.mHeight / 900), 50, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 280,(900 - 500) * screen.mHeight / 900), 65,10,-8 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 280,(900 - 400) * screen.mHeight / 900), 30,70,-90 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 280,(900 - 400) * screen.mHeight / 900), 80,50,0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 332,(900 - 415) * screen.mHeight / 900), 40,70,45 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 347,(900 - 475) * screen.mHeight / 900), 40,100,-5 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 292,(900 - 505) * screen.mHeight / 900), 20,70,60 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 310,(900 - 490) * screen.mHeight / 900), 70,70,22 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 228,(900 - 407) * screen.mHeight / 900), 50,70,160 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 206,(900 - 452) * screen.mHeight / 900), 25,45,2 * Math.PI / 180, 0.4,0.1, false, info);
    // asteroid big
    new Circle(0, new Vector(screen.mWidth / 2 + 650,(900 - 750)  * screen.mHeight / 900), 95, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 424,(900 - 753) * screen.mHeight / 900), 70, 86,11 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth / 2 + 550,(900 - 720) * screen.mHeight / 900), 100, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 550,(900 - 810) * screen.mHeight / 900), 120, 150, 62 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 640,(900 - 685) * screen.mHeight / 900), 120, 150, 62 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 545,(900 - 672.5) * screen.mHeight / 900), 120, 150, 0, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 462,(900 - 668) * screen.mHeight / 900), 120, 150, 161 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 40, (900 - 750) * screen.mHeight / 900), 120, 150, 45 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 65, (900 - 720) * screen.mHeight / 900), 120, 150, -10 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 91, (900 - 772) * screen.mHeight / 900), 120, 150, 0, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 220, (900 - 807) * screen.mHeight / 900), 118, 160, 60 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 313, (900 - 807) * screen.mHeight / 900), 50, 60, 45 * Math.PI / 180, 0.4,0.1, false, info);
    // asteroid little
    new Circle(0, new Vector(screen.mWidth / 2 + 130,(900 - 660) * screen.mHeight / 900), 30, 30 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 140,(900 - 655) * screen.mHeight / 900), 100, 40, 10 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 125,(900 - 677) * screen.mHeight / 900), 50, 40, 55 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 160,(900 - 670) * screen.mHeight / 900), 50, 60, -50 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 170,(900 - 645) * screen.mHeight / 900), 50, 60, -89 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth / 2 + 168,(900 - 620) * screen.mHeight / 900), 25, 60, 90 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 168,(900 - 625) * screen.mHeight / 900), 15, 60, 90 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 + 123,(900 - 641) * screen.mHeight / 900), 62, 40, 32 * Math.PI / 180, 0.4,0.1, false, info);

    // wall right
    new Circle(0, new Vector(screen.mWidth - 10, (900 - 450) * screen.mHeight / 900), 50, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 1, (900 - 490) * screen.mHeight / 900), 60,40,-30 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 10, (900 - 482) * screen.mHeight / 900), 60,40,-30 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 65, (900 - 445) * screen.mHeight / 900), 60,40,-25 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth + 100, (900) * screen.mHeight / 900), 400, 900, 0, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 101, (900 - 430) * screen.mHeight / 900), 37, 41, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth + 80 , (900 + 40) * screen.mHeight / 900), 400, 900, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth + 60, (900 + 40) * screen.mHeight / 900), 400, 500,-10 * Math.PI / 180 , 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 165, (900 - 135) * screen.mHeight / 900), 37, 50, -5 * Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth - 150, (900 - 70) * screen.mHeight / 900), 50,-10 * Math.PI / 180 , 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 120, (900 - 190) * screen.mHeight / 900), 37, 150, 5 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 160, (900 - 120) * screen.mHeight / 900), 37, 100, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 150, (900 + 40) * screen.mHeight / 900), 200, 150,0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 150, (900 + 40) * screen.mHeight / 900), 200, 150,0 , 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 190, (900 - 80) * screen.mHeight / 900), 85, 130,45 * Math.PI / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 246.6, (900 - 158) * screen.mHeight / 900), 20, 20,-10 * Math.PI / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 260, (900 - 90) * screen.mHeight / 900), 20, 100,-15 * Math.PI / 180 , 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 273, (900 - 100) * screen.mHeight / 900), 20, 20,-15 * Math.PI / 180 , 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 268, (900 - 50) * screen.mHeight / 900), 150, 100,-10 * Math.PI / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 315, (900) * screen.mHeight / 900), 70, 50,-0 * Math.PI / 180 , 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth - 345, (900 - 5.7) * screen.mHeight / 900), 20,5 * Math.PI / 180 , 0.4,0.1, false, info);
    new Triangle(0, new Vector(screen.mWidth - 366, (900 - 8) * screen.mHeight / 900), 20,30,30 * Math.PI / 180 , 0.4,0.1, false, info);
    new Circle(0, new Vector(screen.mWidth - 260, (900 - 90) * screen.mHeight / 900), 20,-15 * Math.PI / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 255, (900 - 158) * screen.mHeight / 900), 20, 20,0 / 180 , 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth - 250, (900 + 40) * screen.mHeight / 900), 30, 380,0 / 180 , 0.4,0.1, false, info);

    // top wall
    new Circle(0, new Vector(200, -200 * screen.mHeight / 900), 300 , 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(0, 42 * screen.mHeight / 900), 500, 150, -5 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(350, 135 * screen.mHeight / 900), 100, 180, 170 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(300, 135 * screen.mHeight / 900), 50, 130, 180 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(150, 90 * screen.mHeight / 900), 150, 130, 180 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(190, 90 * screen.mHeight / 900), 100, 150, 180 * Math.PI / 180, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(250, 80 * screen.mHeight / 900), 100, 50, 175 * Math.PI / 180, 0.4,0.1, false, info);


    // wall left
    new Rectangle(0, new Vector(0, 900 * screen.mHeight / 900), 200, 1000, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(200, (900 - 140) * screen.mHeight / 900), 200, 100, 38 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(350, (900 - 140) * screen.mHeight / 900), 200, 300, 20 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(360, (900 - 160) * screen.mHeight / 900), 100, 200, 0 / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(340, (900 - 160) * screen.mHeight / 900), 150, 200, -20 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(295, (900 - 130) * screen.mHeight / 900), 90, 200, 0 / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(250, (900 - 150) * screen.mHeight / 900), 100, 120,  20* Math.PI / 180, 0.4,0.1, false, info);
    new Circle(0, new Vector(80, (900 - 110) * screen.mHeight / 900), 150, 0, 0.4,0.1, false, info);
    new Rectangle(0, new Vector(screen.mWidth / 2 - 500 , (900 - 50) * screen.mHeight / 900), 500, 100, 0, 0.4,0.1, false, info);
    new Triangle(0, new Vector(120 , (900 - 200) * screen.mHeight / 900), 200, 500, -5 * Math.PI / 180, 0.4,0.1, false, info);
    new Triangle(0, new Vector(0 , (900 - 525) * screen.mHeight / 900), 200, 49, 0 / 180, 0.4,0.1, false, info);
};