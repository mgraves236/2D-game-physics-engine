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
            player.orientation = player.orientation.rotate(-5);
            console.log('------------')
            console.log(player.velocity)
            if (player.velocity.x !== 0 || player.velocity.y !== map(0)) {
                setVelocity();
            }
            break;
        case "ArrowRight":
            player.orientation = player.orientation.rotate(5);
            if (player.velocity.x !== 0 || player.velocity.y !== map(0)) {
                setVelocity();
            }
            break;
        case "ArrowDown":
            let stop = new Vector(0, 0, player.x, player.y);
            player.velocity = stop;
            break;
        default:
            return;
    }
    event.preventDefault();
}, true);

function setVelocity() {
    let velocity = new Vector(0, 0);
    // direction change only
    if (player.orientation.x < player.x) {
        velocity.x = - math.abs(player.orientation.x - player.orientation.x0);
    } else if (player.orientation.x > player.x) {
        velocity.x = math.abs(player.orientation.x - player.orientation.x0);
    } else {
        velocity.x = 0;
    }
    // console.log('orient  ' + engineCore.mPlayer.orientation.y)
    // console.log(engineCore.mPlayer.y)
    if (player.orientation.y < player.y) {
        velocity.y = map( - math.abs(player.orientation.y - player.orientation.y0));
    } else if (player.orientation.y > player.y) {
        velocity.y = map(math.abs(player.orientation.y - player.orientation.y0));
    } else {
        velocity.y = map(0);
    }
    // TODO  y velocity add gravity
    //velocity.normalize();
    player.velocity = velocity;
}

function changeDirection() {
    console.log(player.velocity)
    let velocity = new Vector(0, 0);
    // direction change only
    console.log('orient x  ' + player.orientation.x)
    console.log(player.x)
    if (player.orientation.x < player.x) {
        velocity.x = -math.abs(player.orientation.x - player.orientation.x0);
    } else if (player.orientation.x > player.x) {
        velocity.x = math.abs(player.orientation.x - player.orientation.x0);
    } else {
        velocity.x = 0;
    }
    // console.log('orient  ' + engineCore.mPlayer.orientation.y)
    // console.log(engineCore.mPlayer.y)
    if (player.orientation.y < player.y) {
        velocity.y = map(-math.abs(player.orientation.y - player.orientation.y0));
    } else if (player.orientation.y > player.y) {
        velocity.y = map(math.abs(player.orientation.y - player.orientation.y0));
    } else {
        velocity.y = map(0);
    }
    // TODO  y velocity add gravity
    //velocity.normalize();
}