let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

let bird = { x: 50, y: 200, width: 30, height: 30, gravity: 0.5, jump: -10, speed: 0 };
let pipes = [];
let score = 0;
let gameOver = false;

document.addEventListener('keydown', () => {
    if (!gameOver) {
        bird.speed = bird.jump;
    }
});

function drawBird() {
    bird.speed += bird.gravity;
    bird.y += bird.speed;
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function createPipe() {
    let pipeHeight = Math.floor(Math.random() * (canvas.height - 200)) + 50;
    pipes.push({ x: canvas.width, y: pipeHeight });
}

function drawPipes() {
    pipes.forEach((pipe, index) => {
        pipe.x -= 3;
        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0, 50, pipe.y);
        ctx.fillRect(pipe.x, pipe.y + 150, 50, canvas.height - pipe.y - 150);

        if (pipe.x < 0) {
            pipes.splice(index, 1);
            score++;
        }
    });
}

function checkCollision() {
    if (bird.y > canvas.height || bird.y < 0) {
        gameOver = true;
    }

    pipes.forEach(pipe => {
        if (bird.x + bird.width > pipe.x && bird.x < pipe.x + 50) {
            if (bird.y < pipe.y || bird.y + bird.height > pipe.y + 150) {
                gameOver = true;
            }
        }
    });
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        drawBird();
        drawPipes();
        drawScore();
        checkCollision();
        if (Math.random() < 0.02) createPipe();
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over!', 130, 300);
        ctx.fillText('Score: ' + score, 150, 340);
    }
}

gameLoop();