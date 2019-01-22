/*
 * ������ canvas
 * var HTMLElement canvas
 */
var canvas = document.getElementById("myCanvas");
/*
 * ������ �������� ��������� �� ������
 * var any ctx
 */
var ctx = canvas.getContext("2d");
/*
 * ������ ����
 * var int ballRadius
 */
var ballRadius = 10;
/*
 * ���������� x ����
 * var double x
 */
var x = canvas.width / 2;
/*
 * ���������� y ����
 * var double y
 */
var y = canvas.height - 30;
/*
 * �������� ������������ ���� �� x
 * var int dx
 */
var dx = 2;
/*
 * �������� ������������ ���� �� y
 * var int dy
 */
var dy = -2;
/*
 * ������ ����������� ��������
 * var int paddleHeight
 */
var paddleHeight = 15;
/*
 * ������ ����������� ��������
 * var int paddleWidth
 */
var paddleWidth = 75;
/*
 * ���������� x ����������� ��������
 * var double paddleX
 */
var paddleX = (canvas.width - paddleWidth) / 2;
/*
 * ����� ������
 * var bool rightPressed
 */
var rightPressed = false;
/*
 * ����� �����
 * var bool leftPressed
 */
var leftPressed = false;
/*
 * ���-�� ����� ��������
 * var int brickRowCount
 */
var brickRowCount = 5;
/*
 * ���-�� ������� ��������
 * var int brickColumnCount
 */
var brickColumnCount = 3;
/*
 * ������ ��������
 * var int brickWidth
 */
var brickWidth = 75;
/*
 * ������ ��������
 * var int brickHeight
 */
var brickHeight = 20;
/*
 * ������ ����� ����������
 * var int brickPadding
 */
var brickPadding = 10;
/*
 * ������ �� �����
 * var int brickOffsetTop
 */
var brickOffsetTop = 30;
/*
 * ������ �� ������ ����
 * var int brickOffsetLeft
 */
var brickOffsetLeft = 30;
/*
 * ����
 * var int score
 */
var score = 0;
/*
 * �����
 * var int lives
 */
var lives = 3;

/*
 * ������ ��������
 */
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

/*
 * ������ �� ���������� rightPressed � leftPressed
 * ���� ��� ������� ������ ����� 39 rightPressed ��������������� true
 * ���� ��� ������� ������ ����� 37 leftPressed ��������������� true
 */
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
/*
 * ������ �� ���������� rightPressed � leftPressed
 * ���� ��� ���������� ������ ����� 39 rightPressed ��������������� false
 * ���� ��� ���������� ������ ����� 37 leftPressed ��������������� false
 */
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}
/*
 * ������ �� ��������� paddleX
 * ���� ���������� x ������� ������ 0 � ������ ������ ������
 * ����������� ������� �������������� ���� x
 */
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
/*
 * ����������� ������������
 * ���� ������� ��� �� ���������� � ���������� ���� �������� � �� ��������
 * �� ������������� ������ ����������, � ���� ������������� �� 1
 * ���� ���� ����� ���-�� �������, ������ ��� ������� ����������
 * � ��������� ��������� � ������
 */
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}
/*
 * ��������� ����
 */
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
/*
 * ��������� ����������� ��������
 */
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
/*
 * ��������� ��������
 */
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
/*
 * ��������� ����������
 */
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
/*
 * ��������� ������
 */
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

/*
 * ��������� ������
 * ���� x ���� ������� �� ����� ������, �� �� ����������� ��� �������� �� x
 * ���� y ���� ������� �� ����� ������ �����, �� �� ����������� ��� �������� �� y
 * ���� y ���� ������� �� ����� ������ ���� � �������� �� ����������� �������,
 * �� �� ����������� ��� �������� �� y,
 * ���� ��� �� ��������� ���-�� ������,
 * ���� ��-�� ������ ����� ����� 0, ���� ����� ��������� � ����� �������� ��������� � ���������
 * ���� �������� rightPressed �������� � ���� ���� ���������� �� ����������� ������� ������
 * ���� �������� leftPressed �������� � ���� ���� ���������� �� ����������� ������� �����
 * ���������� �������� ���� � ��� ����������
 */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();