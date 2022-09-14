import {screen} from "../engineCore/screen.js";

let ctx = screen.mContext;

let ui = {
    score: 0,
    lives: 0,
    fuel: 0
};

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

export function updateUI(score, lives, fuel) {
    ui.score = score;
    ui.lives = lives;
    ui.fuel = fuel;
}