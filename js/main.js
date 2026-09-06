import {
    player,
    updatePlayer,
    drawPlayer
} from "./player.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 650;

let gameRunning = false;


// ==========================
// INPUT
// ==========================

const keys = {};

document.addEventListener("keydown", (event) => {

    keys[event.key.toLowerCase()] = true;

    if (event.code === "Space") {
        keys["space"] = true;
        event.preventDefault();
    }
});

document.addEventListener("keyup", (event) => {

    keys[event.key.toLowerCase()] = false;

    if (event.code === "Space") {
        keys["space"] = false;
    }
});


// ==========================
// START BUTTON
// ==========================

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {

    console.log("Game started!");

    document.getElementById("menu").style.display = "none";

    gameRunning = true;
});


// ==========================
// BACKGROUND
// ==========================

function drawBackground() {

    ctx.fillStyle = "#02020a";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}


// ==========================
// UPDATE
// ==========================

function update() {

    if (!gameRunning) return;

    updatePlayer(keys, canvas);
}


// ==========================
// DRAW
// ==========================

function draw() {

    drawBackground();

    drawPlayer(ctx);
}


// ==========================
// GAME LOOP
// ==========================

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(gameLoop);
}


// Start the game loop

gameLoop();