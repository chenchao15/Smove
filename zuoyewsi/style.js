
var n = 4;                             //棋盘栅格数
var grid = 70;                         //棋盘格宽度
var h = -35 * n + 300;                 //棋盘上边距和侧边距
var white_x = h + grid / 2;            //白棋初始位置横坐标
var white_y = grid / 2 + h;            //白棋初始位置纵坐标
var myrect = { "x": 100, "y": 100 };   //方块的坐标
var stop = 1;                          //控制白棋是否可以移动
var count = 0;                         //标记白棋吃的方块数目
var speed = 10;                        //黑棋的频率
var blackList = [];                    //黑棋的出棋顺序表
var t;                                 //计时器
var score = 0;                         //当前得分
var best = 0;                          //最高得分
var barrier = 1;                       //关卡
var black_num = 0;                     //黑球出现回合次数
var single_black_num = 0;              //单局出现黑球回合次数
var time_length = 0;                   //之前失败之后所花的时间
var blackarray = [];                   //用于存储当前选中移动的黑棋
var select = 0;                        //判断当前界面的下一个界面选择
var finally_score = 0;                 //白棋吃黄色方块时的判断条件

var c = document.getElementById("chess");
var ctx = c.getContext('2d');

var startx, starty;
c.addEventListener("touchstart", function (event) {
    if (event.cancelable) {
        if (!event.defaultPrevented)
            event.preventDefault();
    }
    var touch = event.touches[0];
    startx = touch.pageX;
    starty = touch.pageY;
    if (select == 0) {
        ctx.rect(0, 0, 600, 600);
        ctx.fillStyle = "#ffb17f";
        ctx.fill();
        stop = 0;
        startgame();
        timedCount();
        select = 1;
    }
        //关卡界面
    else if (select == 3) {
        select = 1;
        ctx.rect(0, 0, 600, 600);
        ctx.fillStyle = "#ffb17f";
        ctx.fill();
        stop = 0;
        finally_score = 0;
        timedCount();
        if (barrier >= 3) {
            ctx.rect(0, 0, 600, 600);
            ctx.fillStyle = "#ffb17f";
            ctx.fill();
            n = 3;
            set_n(n);
        }
    }
        //结束界面
    else if (select == 4) {
        all_black_return();
        barrier = 1;
        count = 0;
        black_num = 0;
        score = 0;
        single_black_num = 0;
        ctx.rect(0, 0, 600, 600);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#ffb17f";
        ctx.fill();
        startinterface();
        select = 0;
        finally_score = 0;
        n = 4;
        set_n(n);
    }
}, false);

c.addEventListener("touchend", function (event) {
    if (event.cancelable) {
        if (!event.defaultPrevented)
            event.preventDefault();
    }
    var touch = event.changedTouches[0];
    var degreex = touch.pageX - startx;
    var degreey = touch.pageY - starty;
    if (Math.abs(degreex) >= Math.abs(degreey)) {
        if (degreex >= 20) {
            if (white_x != (-35 * n + 300) + grid * (2 * n - 1) / 2 && select == 1 && stop == 0) {
                cleaning(white_x, white_y, "#ffb17f");
                white_x = white_x + grid;
                next_draw(white_x, white_y, "white");
            }
        }
        else if (degreex <= -20) {
            if (white_x != (-35 * n + 300) + grid / 2 && select == 1 && stop == 0) {
                cleaning(white_x, white_y, "#ffb17f");
                white_x = white_x - grid;
                next_draw(white_x, white_y, "white");
            }
        }
    }
    else {
        if (degreey >= 20) {
            if (white_y != (-35 * n + 300) + grid * (2 * n - 1) / 2 && select == 1 && stop == 0) {
                cleaning(white_x, white_y, "#ffb17f");
                white_y = white_y + grid;
                next_draw(white_x, white_y, "white");
            }
        }
        else if (degreey <= -20) {
            if (white_y != (-35 * n + 300) + grid / 2 && select == 1 && stop == 0) {
                cleaning(white_x, white_y, "#ffb17f");
                white_y = white_y - grid;
                next_draw(white_x, white_y, "white");
            }
        }
    }

}, false);

var left = [{ "x": -25, "y": -35 * n + 300 + grid / 2, "index": 0 },           //左1
              { "x": -25, "y": -35 * n + 300 + 3 * grid / 2, "index": 0 },     //左2
              { "x": -25, "y":  - 35 * n + 300 + 5 * grid / 2, "index": 0 },   //左3
              { "x": -25, "y": -35 * n + 300 + 7 * grid / 2, "index": 0 },     //左4
];

var up = [{ "x": -35 * n + 300 + grid / 2, "y": -25, "index": 0 },             //上1
              { "x": -35 * n + 300 + 3 * grid / 2, "y": -25, "index": 0 },     //上2
              { "x": -35 * n + 300 + 5 * grid / 2, "y": -25, "index": 0 },     //上3
              { "x": -35 * n + 300 + 7 * grid / 2, "y": -25, "index": 0 },     //上4
];
var down = [{ "x":  -35 * n + 300 + grid / 2, "y": 625, "index": 0 },         //下1
              { "x": -35 * n + 300 + 3 * grid / 2, "y": 625, "index": 0 },    //下2
              { "x": -35 * n + 300 + 5 * grid / 2, "y": 625, "index": 0 },    //下3
              { "x": -35 * n + 300 + 7 * grid / 2, "y": 625, "index": 0 },    //下4
];
var right = [{ "x": 625, "y": -35 * n + 300 + grid / 2, "index": 0 },         //右1
              { "x": 625, "y": -35 * n + 300 + 3 * grid / 2, "index": 0 },    //右2
              { "x": 625, "y": -35 * n + 300 + 5 * grid / 2, "index": 0 },    //右3
              { "x": 625, "y": -35 * n + 300 + 7 * grid / 2, "index": 0 },    //右4
];
var blackball = [left, right, up, down];

var first = [{ "x": -100, "y": -100 },
             { "x": -35 * n + 300 + grid / 2 - 15, "y": -35 * n + 300 + grid / 2 - 15 },                   //(1,1)
             { "x": (-35 * n + 300)  + 3 * grid / 2 - 15, "y": (-35 * n + 300)  + grid / 2 - 15 },         //(1,2)
             { "x": (-35 * n + 300)  + 5 * grid / 2 - 15, "y": (-35 * n + 300)  + grid / 2 - 15 },         //(1,3)
             { "x": (-35 * n + 300)  + 7 * grid / 2 - 15, "y": (-35 * n + 300)  + grid / 2 - 15 }          //(1,4)
];
var second = [{ "x": -100, "y": -100 },
              { "x": (-35 * n + 300)  + grid / 2 - 15, "y": (-35 * n + 300)  + 3 * grid / 2 - 15 },        //(2,1)
              { "x": (-35 * n + 300)  + 3 * grid / 2 - 15, "y": (-35 * n + 300)  + 3 * grid / 2 - 15 },    //(2,2)
              { "x": (-35 * n + 300)  + 5 * grid / 2 - 15, "y": (-35 * n + 300)  + 3 * grid / 2 - 15 },    //(2,3)
              { "x": (-35 * n + 300)  + 7 * grid / 2 - 15, "y": (-35 * n + 300)  + 3 * grid / 2 - 15 },    //(2,3)
];
var third = [{ "x": -100, "y": -100 },
              { "x": -35 * n + 300 + grid / 2 - 15, "y": (-35 * n + 300)  + 5 * grid / 2 - 15 },           //(3,1)
              { "x": (-35 * n + 300)  + 3 * grid / 2 - 15, "y": (-35 * n + 300)  + 5 * grid / 2 - 15 },    //(3,2)
              { "x": (-35 * n + 300)  + 5 * grid / 2 - 15, "y": (-35 * n + 300)  + 5 * grid / 2 - 15 },    //(3,3)
              { "x": (-35 * n + 300)  + 7 * grid / 2 - 15, "y": (-35 * n + 300)  + 5 * grid / 2 - 15 },    //(3,3)
];
var fourth = [{ "x": -100, "y": -100 },
              { "x": -35 * n + 300 + grid / 2 - 15, "y": (-35 * n + 300)  + 7 * grid / 2 - 15 },           //(4,1)
              { "x": (-35 * n + 300)  + 3 * grid / 2 - 15, "y": (-35 * n + 300)  + 7 * grid / 2 - 15 },    //(4,2)
              { "x": (-35 * n + 300)  + 5 * grid / 2 - 15, "y": (-35 * n + 300)  + 7 * grid / 2 - 15 },    //(4,3)
              { "x": (-35 * n + 300)  + 7 * grid / 2 - 15, "y": (-35 * n + 300)  + 7 * grid / 2 - 15 },    //(4,3)
];
var loc = [0,first,second,third,fourth];

function draw() {

    ctx.font = "bold 13px Arial";
    ctx.beginPath();
    //画棋盘
    ctx.moveTo((-35 * n + 300)  + 25, (-35 * n + 300) );
    ctx.lineTo((-35 * n + 300)  + grid * n -25, (-35 * n + 300) );

    for (var i = 1; i < n; i++) {
        ctx.moveTo((-35 * n + 300)  + 25, i * grid + (-35 * n + 300) );
        ctx.lineTo((-35 * n + 300)  + grid * n - 25, i * grid + (-35 * n + 300) );
    }
    for (var i = 1; i < n + 2; i++) {
        ctx.moveTo((-35 * n + 300)  + (i - 1) * grid, (-35 * n + 300) +25);
        ctx.lineTo((-35 * n + 300)  + (i - 1) * grid , grid * n + (-35 * n + 300) -25);
    }

    ctx.rect((-35 * n + 300) , (-35 * n + 300) , n * grid, n * grid);
    ctx.fillStyle = "#ffb17f";
    ctx.fill();

    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
    //画棋盘边缘的圆角矩形
    ctx.beginPath();
    ctx.rect((-35 * n + 300)  - 2, (-35 * n + 300)  - 2, 27, 27);
    ctx.fillStyle = "#ffb17f";
    ctx.fill();
    ctx.rect((-35 * n + 300)  - 24 + n * grid, (-35 * n + 300)  -2, 27, 27);
    ctx.fillStyle = "#ffb17f";
    ctx.fill();
    ctx.rect((-35 * n + 300)  - 2, (-35 * n + 300)  + n * grid - 24, 27, 27);
    ctx.fillStyle = "#ffb17f";
    ctx.fill();
    ctx.rect((-35 * n + 300)  - 24 + n * grid, (-35 * n + 300)  + n * grid - 24, 27, 27);
    ctx.fillStyle = "#ffb17f";
    ctx.fill();
    ctx.closePath();


    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo((-35 * n + 300)  + 25, (-35 * n + 300) );
    ctx.arcTo((-35 * n + 300) , (-35 * n + 300) , (-35 * n + 300) , (-35 * n + 300) +25, 25);
    ctx.lineTo((-35 * n + 300) , (-35 * n + 300)  + 25);
    ctx.lineWidth = 2;
    ctx.moveTo((-35 * n + 300)  +n * grid - 25, (-35 * n + 300) );
    ctx.arcTo((-35 * n + 300)  + n * grid, (-35 * n + 300) , (-35 * n + 300)  + n * grid, (-35 * n + 300)  + 25, 25);
    ctx.lineTo((-35 * n + 300)  + n * grid, (-35 * n + 300)  + 25);
    ctx.moveTo((-35 * n + 300)  + 25, (-35 * n + 300)  + n * grid);
    ctx.arcTo((-35 * n + 300) , (-35 * n + 300)  + n * grid, (-35 * n + 300) , (-35 * n + 300)  + n * grid - 25, 25);
    ctx.lineTo((-35 * n + 300) , (-35 * n + 300)  + n * grid - 25);
    ctx.moveTo((-35 * n + 300)  + n * grid - 25, (-35 * n + 300)  + n * grid);
    ctx.arcTo((-35 * n + 300)  + n * grid, (-35 * n + 300)  + n * grid, (-35 * n + 300)  + n * grid, (-35 * n + 300)  + n * grid - 25, 25);
    ctx.lineTo((-35 * n + 300)  + n * grid, (-35 * n + 300)  + n * grid - 25);
    ctx.stroke();
    ctx.closePath();

    ctx.lineWidth = 1;
    //画右上角分数统计
    ctx.beginPath();
    ctx.rect(430, 30, 160, 70);
    ctx.fillStyle = "#ffb17f";
    ctx.fill();
    ctx.closePath();
    ctx.font = "23px Verdana black";
    ctx.fillStyle = "#B2E0FF";
    ctx.fillText("Score: " + score, 500, 50);
    ctx.fillText("Best:  " + best, 500, 80);
    ctx.fillText("第" + barrier + "关",480,110);
}

//开始界面及关卡界面的字体设计
function font_design(string) {
    ctx.font = "italic bold 80px Verdana";
    var left = 300 - 80 * string.length / 2;
    var right = 300 + 80 * string.length / 2;
    var gradient = ctx.createLinearGradient(left, 0, right, 0);
    gradient.addColorStop("0", "yellow");
    gradient.addColorStop("0.5", "green");
    gradient.addColorStop("1.0", "blue");
    ctx.fillStyle = gradient;
    ctx.textAlign = "center";
    ctx.fillText(string, 300, 360);
}

//开始游戏界面
function startinterface() {
    //背景色
    $("#chess").css("background-color", "#ffb17f");
    //smove字体设置
    font_design("Smove");
}
//关卡界面
function barrierinterface(barrier) {
    ctx.rect(0, 0, 600, 600);
    ctx.fillStyle = "#ffb17f";
    ctx.fill();
    font_design("第 " + barrier + "关");
    black_num += single_black_num;
    t = 0;
}
//开始界面
function endinterface() {
    ctx.beginPath();
    ctx.rect(130, 100, 340, 340);
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.closePath();
    ctx.font = "23px Verdana black";
    ctx.fillStyle = "blue";
    ctx.fillText("Game Over ", 302, 200);
    ctx.fillText("Score: " + score, 302, 250);
    ctx.fillText("Best:  " + best, 302, 300);
}