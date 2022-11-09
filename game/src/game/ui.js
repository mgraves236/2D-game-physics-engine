import {screen} from "../engineCore/screen.js";

let ctx = screen.mContext;

/**
 * Object to store game stats
 * @type {{score: number, lives: number, fuel: number}}
 */
let ui = {
    score: 0,
    lives: 0,
    fuel: 0
};

/**
 * Function to display stats on canvas
 */
export function displayUI() {
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Arial";
    ctx.fillText('SCORE', 5, 25);
    ctx.fillText(ui.score, 120, 25);
    ctx.fillText('LIVES', 5, 55);
    ctx.fillText(ui.lives, 120, 55);
    ctx.fillText('FUEL', 5, 85);
    ctx.fillText(ui.fuel, 120, 85);
    ctx.restore();
}

/**
 * Function to update stats in each loop run
 * @param score player score
 * @param lives player lives left
 * @param fuel player fuel
 */
export function updateUI(score, lives, fuel) {
    ui.score = score;
    ui.lives = lives;
    ui.fuel = fuel;
}