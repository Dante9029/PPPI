/**
 * Хранит canvas
 * Var HTMLElement canvas
 */
var canvas = document.getElementById("myCanvas");
/**
 * Хранит контекст рисования на холсте
 * Var any ctx
 */
var ctx = canvas.getContext("2d");
/**
 * Радиус шара
 * Var int ballRadius
 */
<<<<<<< HEAD
var ballRadius = 11;
=======
var ballRadius = 16;
>>>>>>> Konflict
/**
 * Координата x шара
 * Var double x
 */
var x = canvas.width / 2;
/**
 * Координата y шара
 * Var double y
 */
var y = canvas.height - 30;
/**
 * Скорость передвижения шара по x
 * Var int dx
 */
var dx = 2;
/**
 * Скорость передвижения шара по y
 * Var int dy
 */
var dy = -2;
/**
 * Высота передвижной досточки
 * Var int paddleHeight
 */
var paddleHeight = 15;
/**
 * Ширина передвижной досточки
 * Var int paddleWidth
 */
var paddleWidth = 70;
/**
 * Координата x передвижной досточки
 * Var double paddleX
 */
var paddleX = (canvas.width - paddleWidth) / 2;
/**
 * Cдвиг вправо
 * Var bool rightPressed
 */
var rightPressed = false;
/**
 * Cдвиг влево
 * Var bool leftPressed
 */
var leftPressed = false;
/**
 * Кол-во строк досточек
 * Var int brickRowCount
 */
var brickRowCount = 5;
/**
 * Кол-во колонок досточек
 * Var int brickColumnCount
 */
var brickColumnCount = 3;
/**
 * Ширина досточки
 * Var int brickWidth
 */
var brickWidth = 70;
/**
 * Высота досточки
 * Var int brickHeight
 */
var brickHeight = 20;
/**
 * Отступ между досточками
 * Var int brickPadding
 */
var brickPadding = 10;
/**
 * Отступ от верха
 * Var int brickOffsetTop
 */
var brickOffsetTop = 33;
/**
 * Отступ от левого края
 * Var int brickOffsetLeft
 */
var brickOffsetLeft = 30;
/**
 * Cчет
 * Var int score
 */
var score = 0;
/**
 * Жизни
 * Var int lives
 */
var lives = 3;

/**
 * Массив досточек
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

/**
 * Работа со свойствами rightPressed и leftPressed
 * Если код нажатой кнопки равен 39 rightPressed устанавливается true
 * Если код нажатой кнопки равен 37 leftPressed устанавливается true
 */
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
/**
 * Работа со свойствами rightPressed и leftPressed
 * Если код отпущенной кнопки равен 39 rightPressed устанавливается false
 * Если код отпущенной кнопки равен 37 leftPressed устанавливается false
 */
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}
/**
 * Работа со свойством paddleX
 * если координата курсора по оси х больше 0 и меньше чем ширина холста
 * Передвижной доске установится этот x
 */
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
/**
 * обнаружение столкновения
 * Если дощечка еще не уничтожена и координаты шара попадают в ее диапазон
 * Ей присваивается статус уничтожена, а счет увеличивается на 1
 * Если счет равен кол-во дощечек, значит все дощечки уничтожены
 * И выводится сообщение о победе
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
/**
 * отрисовка шара
 */
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
/**
 * отрисовка передвижной досточки
 */
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
/**
 * отрисовка досточек
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
/**
 * отрисовка результата
 */
function drawScore() {
    ctx.font = "16px Calibri";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
/**
 * отрисовка жизней
 */
function drawLives() {
    ctx.font = "16px Calibri";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

/**
 * отрисовка холста
 * Если x шара выходит за рамки холста, то мы инвертируем его скорость по x
 * Если y шара выходит за рамки холста вверх, то мы инвертируем его скорость по y
 * Если y шара выходит за рамки холста вниз и попадает на передвижную дощечку,
 * То мы инвертируем его скорость по y,
 * Если нет то уменьшаем кол-во жизней,
 * Если ко-во жизней будет равно 0, игра будет закончена и будет показано сообщение о поражении
 * Если свойство rightPressed включено и есть куда сдвинуться мы передвигаем дощечку вправо
 * Если свойство leftPressed включено и есть куда сдвинуться мы передвигаем дощечку влево
 * Прибавляем скорость шара к его координатм
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