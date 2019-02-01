/*
 * ������ canvas
 * Var HTMLElement canvas
 */
var canvas = document.getElementById("myCanvas");
/*
 * ������ �������� ��������� �� ������
 * Var any ctx
 */
var ctx = canvas.getContext("2d");
/*
 * ������ ����
 * Var int ballRadius
 */
var ballRadius = 11;
/*
 * ���������� x ����
 * Var double x
 */
var x = canvas.width / 2;
/*
 * ���������� y ����
 * Var double y
 */
var y = canvas.height - 30;
/*
 * �������� ������������ ���� �� x
 * Var int dx
 */
var dx = 2;
/*
 * �������� ������������ ���� �� y
 * Var int dy
 */
var dy = -2;
/*
 * ������ ����������� ��������
 * Var int paddleHeight
 */
var paddleHeight = 15;
/*
 * ������ ����������� ��������
 * Var int paddleWidth
 */
var paddleWidth = 70;
/*
 * ���������� x ����������� ��������
 * Var double paddleX
 */
var paddleX = (canvas.width - paddleWidth) / 2;
/*
 * C���� ������
 * Var bool rightPressed
 */
var rightPressed = false;
/*
 * C���� �����
 * Var bool leftPressed
 */
var leftPressed = false;
/*
 * ���-�� ����� ��������
 * Var int brickRowCount
 */
var brickRowCount = 5;
/*
 * ���-�� ������� ��������
 * Var int brickColumnCount
 */
var brickColumnCount = 3;
/*
 * ������ ��������
 * Var int brickWidth
 */
var brickWidth = 70;
/*
 * ������ ��������
 * Var int brickHeight
 */
var brickHeight = 20;
/*
 * ������ ����� ����������
 * Var int brickPadding
 */
var brickPadding = 10;
/*
 * ������ �� �����
 * Var int brickOffsetTop
 */
var brickOffsetTop = 33;
/*
 * ������ �� ������ ����
 * Var int brickOffsetLeft
 */
var brickOffsetLeft = 30;
/*
 * C���
 * Var int score
 */
var score = 0;
/*
 * �����
 * Var int lives
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
 * ���� ���������� ������� �� ��� � ������ 0 � ������ ��� ������ ������
 * ����������� ����� ����������� ���� x
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
                        alert("YOU WIN, CONGRATULATION!!!");
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
    ctx.font = "16px Calibri";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
/*
 * ��������� ������
 */
function drawLives() {
    ctx.font = "16px Calibri";
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