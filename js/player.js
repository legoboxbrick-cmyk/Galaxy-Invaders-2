export const player = {
    x: 425,
    y: 550,

    width: 50,
    height: 35,

    // Movement
    vx: 0,
    vy: 0,

    acceleration: 0.7,
    friction: 0.88,
    maxSpeed: 6,

    // Combat
    damage: 1,
    fireRate: 250,
    lastShot: 0,

    // Upgrades
    weaponLevel: 1,

    // Health
    maxHealth: 3,
    health: 3,

    // Shield
    shieldLevel: 0,
    shield: 0,

    // Invincibility
    invincible: false,
    invincibleTime: 0
};


// ==========================
// PLAYER UPDATE
// ==========================

export function updatePlayer(keys, canvas) {

    let movingX = false;
    let movingY = false;


    // LEFT

    if (keys["a"] || keys["arrowleft"]) {
        player.vx -= player.acceleration;
        movingX = true;
    }


    // RIGHT

    if (keys["d"] || keys["arrowright"]) {
        player.vx += player.acceleration;
        movingX = true;
    }


    // UP

    if (keys["w"] || keys["arrowup"]) {
        player.vy -= player.acceleration;
        movingY = true;
    }


    // DOWN

    if (keys["s"] || keys["arrowdown"]) {
        player.vy += player.acceleration;
        movingY = true;
    }


    // Limit speed

    player.vx = Math.max(
        -player.maxSpeed,
        Math.min(player.maxSpeed, player.vx)
    );

    player.vy = Math.max(
        -player.maxSpeed,
        Math.min(player.maxSpeed, player.vy)
    );


    // Friction

    if (!movingX) {
        player.vx *= player.friction;
    }

    if (!movingY) {
        player.vy *= player.friction;
    }


    // Move

    player.x += player.vx;
    player.y += player.vy;


    // ==========================
    // SCREEN BOUNDARIES
    // ==========================

    if (player.x < 0) {
        player.x = 0;
        player.vx = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
        player.vx = 0;
    }

    if (player.y < 0) {
        player.y = 0;
        player.vy = 0;
    }

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.vy = 0;
    }


    // Invincibility timer

    if (player.invincible) {

        player.invincibleTime--;

        if (player.invincibleTime <= 0) {
            player.invincible = false;
        }
    }
}


// ==========================
// DRAW PLAYER
// ==========================

export function drawPlayer(ctx) {

    // Flicker while invincible

    if (
        player.invincible &&
        Math.floor(player.invincibleTime / 5) % 2 === 0
    ) {
        return;
    }


    const x = player.x;
    const y = player.y;


    // Main ship

    ctx.fillStyle = "#00ffff";

    ctx.beginPath();

    ctx.moveTo(
        x + player.width / 2,
        y
    );

    ctx.lineTo(
        x,
        y + player.height
    );

    ctx.lineTo(
        x + player.width,
        y + player.height
    );

    ctx.closePath();

    ctx.fill();


    // Cockpit

    ctx.fillStyle = "white";

    ctx.fillRect(
        x + 20,
        y + 10,
        10,
        10
    );


    // Engine

    ctx.fillStyle = "#ff9900";

    ctx.fillRect(
        x + 20,
        y + player.height,
        10,
        12
    );


    // Shield

    if (player.shieldLevel > 0) {

        ctx.strokeStyle = "rgba(0, 200, 255, 0.7)";
        ctx.lineWidth = 3;

        ctx.beginPath();

        ctx.arc(
            x + player.width / 2,
            y + player.height / 2,
            38 + player.shieldLevel * 3,
            0,
            Math.PI * 2
        );

        ctx.stroke();
    }
}