import {_engineCore as engineCore} from "../engineCore/core.js";
import {PlayerShip} from "./playerShip.js"
import {map, screen} from "../engineCore/screen.js";
import {Vector} from "../lib/vector.js";

var player = engineCore.mPlayer;

window.addEventListener("keydown", function (event) {

    var width = engineCore.mWidth;
    var height = engineCore.mHeight;
    var context = engineCore.mContext;


    if (event.defaultPrevented) {
        return;
    }


    switch (event.key) {
        case "Shift":
            setVelocity();
            break;
        case "ArrowLeft":
            player.velocity = player.velocity.rotate(-5).copy();
            console.log('------------PLAYER VELOCITY---------')
            console.log(player.velocity)
            // if (player.velocity.x !== 0 || player.velocity.y !== map(0)) {
            //     setVelocity();
            // }
           // changeDirection();
            break;
        case "ArrowRight":
            player.velocity = player.velocity.rotate(5).copy();
            console.log('------------PLAYER VELOCITY---------')
            console.log(player.velocity)
            // if (player.velocity.x !== 0 || player.velocity.y !== map(0)) {
            //     setVelocity();
            // }
            break;
        case "ArrowDown":
            let stop = new Vector(player.location.x, player.location.y+0.0000000001, player.location.x, player.location.y);
            player.velocity = stop;
            break;
        default:
            return;
    }
    event.preventDefault();
}, true);

function setVelocity() {
    let velocity = new Vector(0,0);

    player.location.addOrg()
}

function changeDirection() {
    let velocity = new Vector(0, 0);
    // direction change only
    console.log('orient x  ' + player.orientation.x)
    console.log('orient y  ' + player.orientation.y)
    console.log('mag orient   ' + player.orientation.mag())
    console.log(player.x)
    let magY = player.velocity.mag();
    console.log('velocity magY   ' + magY)
    let velCopy = player.velocity.copy();
    console.log(velCopy)
    velCopy.y = map(velCopy.y);
    let magX = velCopy.mag();
    console.log('velocity magX   ' + magX)
    player.velocity.x = (player.orientation.x - player.orientation.x0) * magX;
    console.log((player.orientation.x - player.orientation.x0) * magX)
    console.log(map((player.orientation.y - player.orientation.y0) * magY))
    player.velocity.y = map((player.orientation.y - player.orientation.y0) * magY);
    // if (player.orientation.x < player.x) {
    //     velocity.x = -math.abs(player.orientation.x - player.orientation.x0);
    // } else if (player.orientation.x > player.x) {
    //     velocity.x = math.abs(player.orientation.x - player.orientation.x0);
    // } else {
    //     velocity.x = 0;
    // }
    // // console.log('orient  ' + engineCore.mPlayer.orientation.y)
    // // console.log(engineCore.mPlayer.y)
    // if (player.orientation.y < player.y) {
    //     velocity.y = map(-math.abs(player.orientation.y - player.orientation.y0));
    // } else if (player.orientation.y > player.y) {
    //     velocity.y = map(math.abs(player.orientation.y - player.orientation.y0));
    // } else {
    //     velocity.y = map(0);
    // }
    //velocity.normalize();
}