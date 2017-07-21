
//白棋键盘操作
function wwe() {
    var x;
    if (stop == 1)
        return;
    if (window.event) {
        x = event.keyCode;
    }
    else if (event.which) {
        x = event.which; 
    }
    keychar = String.fromCharCode(x);
    if ((keychar == "d") && white_x != (-35 * n + 300) + grid * (2 * n - 1) / 2) {
        cleaning(white_x, white_y, "#ffb17f");
        white_x = white_x + grid;
        next_draw(white_x, white_y, "white");
    }
    else if ((keychar == "w") && white_y != (-35 * n + 300) + grid / 2) {
        cleaning(white_x, white_y, "#ffb17f");
        white_y = white_y - grid;
        next_draw(white_x, white_y, "white");
    }
    else if ((keychar == "a") && white_x != (-35 * n + 300) + grid / 2) {
        cleaning(white_x, white_y, "#ffb17f");
        white_x = white_x - grid;
        next_draw(white_x, white_y, "white");
    }
    else if ((keychar == "s") && white_y != (-35 * n + 300) + grid * (2 * n - 1) / 2) {
        cleaning(white_x, white_y, "#ffb17f");
        white_y = white_y + grid;
        next_draw(white_x, white_y, "white");
    }
}

//白棋清除操作
function cleaning(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.stroke();
}

//白棋生成位置处理
function rect_location(x, y) {
        //方块生成位置在白棋上下相邻处
    if (x == white_x && (y == white_y + grid || y == white_y - grid)) {
        return true;
    }
        //方块生成位置在白棋左右相邻出
    else if ((x == white_x + grid || x == white_x - grid) && y == white_y) {
        return true;
    }
    else
        return false;
}


//白棋吃方块的判断
function rect_collision() {
    if (white_x == myrect.x + 15 && white_y == myrect.y + 15) {
        ctx.beginPath();
        ctx.rect(myrect.x, myrect.y, 30, 30);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        if(count < 15)
            score++;
        if (best < score) {
            best = score;
        }
        if (count < 15) {
            var row = Math.random() * n;
            var col = Math.random() * n;
            row = Math.ceil(row);
            col = Math.ceil(col);
            while (loc[row][col].x + 15 == white_x && loc[row][col].y + 15 == white_y || rect_location(loc[row][col].x + 15, loc[row][col].y + 15)) {
                row = Math.random() * n;
                col = Math.random() * n;
                row = Math.ceil(row);
                col = Math.ceil(col);
            }
            myrect.x = loc[row][col].x;
            myrect.y = loc[row][col].y;
            ctx.beginPath();
            ctx.rect(myrect.x, myrect.y, 30, 30);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
            count++;
        }
        else if (count == 15) {
            stop = 1;
            if (finally_score == 0) {
                score++;
                if (best < score) {
                    best = score;
                }
                finally_score = 1;
            }
            if ((t-time_length) % 325 == 0) {
                stopCount(); 
                count = 0;
                barrier++;
                select = 3;   //表示处于关卡界面
                barrierinterface(barrier);
                var row = Math.random() * n;
            var col = Math.random() * n;
            row = Math.ceil(row);
            col = Math.ceil(col);
            while (loc[row][col].x + 15 == white_x && loc[row][col].y + 15 == white_y || rect_location(loc[row][col].x + 15, loc[row][col].y + 15)) {
                row = Math.random() * n;
                col = Math.random() * n;
                row = Math.ceil(row);
                col = Math.ceil(col);
            }
            myrect.x = loc[row][col].x;
            myrect.y = loc[row][col].y;
            }
        }
    }
}
//白棋与黑棋相碰操作
function collision() {
    if (stop == 1)
        return;
    var i;
    var flag = 0;
    //左
    for (i = 0; i < n; i++) {
        if (blackball[0][i].x + 40 >= white_x && blackball[0][i].x <= white_x + 40 && blackball[0][i].y == white_y) {
            stop = 1;
            flag = 1;
            stopCount();
        }
    }
    //上
    for (i = 0; i < n; i++) {
        if ((blackball[2][i].y + 40 >= white_y && blackball[2][i].y <= white_y + 40) && blackball[2][i].x == white_x) {
            stop = 1;
            flag = 1;
            stopCount();
        }
    }
    //下
    for (i = 0; i < n; i++) {
        if (blackball[3][i].y <= white_y + 40 && blackball[3][i].y + 40 >= white_y && blackball[3][i].x == white_x) {
            stop = 1;
            flag = 1;
            stopCount();
        }
    }
    //右
    for (i = 0; i < n; i++) {
        if (blackball[1][i].x <= white_x + 40 && blackball[1][i].x + 40 >= white_x && blackball[1][i].y == white_y) {
            stop = 1;
            flag = 1;
            stopCount();
        }
    }

    if (flag == 1) {
        time_length = t;
        endinterface();
        select = 4;
    }
        
}

//重绘黑棋等物体实现动态效果
function select_points(a) {
    if (!black_occur_conclude(a))
        return;
    var detal = 2;
    for (var i = 0; i < a.length; i++) {
        pre_clean(blackball[a[i][0]][a[i][1]], a[i][0]);
    }
    draw();
    ctx.beginPath();
    ctx.arc(white_x, white_y, 25, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(myrect.x, myrect.y, 30, 30);
    if (count < 15)
        ctx.fillStyle = "white";
    else
        ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}
//覆盖之前的黑棋
function pre_clean(point, index) {
    if (index == 0) {
        point.x = point.x + 2;
        ctx.clearRect(point.x - 28, point.y - 26, 50, 52);
    }
    else if (index == 2) {
        point.y = point.y + 2;
        ctx.clearRect(point.x - 26, point.y - 28, 52, 50);
    }
    else if (index == 3) {
        point.y = point.y - 2;
        ctx.clearRect(point.x - 26, point.y - 22, 52, 50);
    }
    else if(index == 1){
        point.x = point.x - 2;
        ctx.clearRect(point.x - 22, point.y - 26, 50, 52);
    }
}
//绘制下一步的黑棋
function next_draw(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

//将消失的黑子归位
function black_return() {
    var i;
    for (i = 0; i < n; i++) {
        if (blackball[0][i].x >= 625)
            blackball[0][i].x = -25;
    }
    for (i = 0; i < n; i++) {
        if (blackball[2][i].y >= 625) {
            blackball[2][i].y = -25;
        }
    }
    for (i = 0; i < n; i++) {
        if (blackball[3][i].y <= -25) {
            blackball[3][i].y = 625;
        }
    }
    for (i = 0; i < n; i++) {
        if (blackball[1][i].x <= -25)
            blackball[1][i].x = 625;
    }
}

//将所有黑棋归位
function all_black_return() {
    left = [{ "x": -25, "y": (-35 * n + 300) + grid / 2, "index": 0 },        //左1
               { "x": -25, "y": (-35 * n + 300) + 3 * grid / 2, "index": 0 },    //左2
               { "x": -25, "y": (-35 * n + 300) + 5 * grid / 2, "index": 0 },    //左3
               { "x": -25, "y": (-35 * n + 300) + 7 * grid / 2, "index": 0 },    //左4
    ];

    up = [{ "x": (-35 * n + 300) + grid / 2, "y": -25, "index": 0 },        //上1
                  { "x": (-35 * n + 300) + 3 * grid / 2, "y": -25, "index": 0 },    //上2
                  { "x": (-35 * n + 300) + 5 * grid / 2, "y": -25, "index": 0 },    //上3
                  { "x": (-35 * n + 300) + 7 * grid / 2, "y": -25, "index": 0 },    //上4
    ];
    down = [{ "x": (-35 * n + 300) + grid / 2, "y": 625, "index": 0 },       //下1
                  { "x": (-35 * n + 300) + 3 * grid / 2, "y": 625, "index": 0 },   //下2
                  { "x": (-35 * n + 300) + 5 * grid / 2, "y": 625, "index": 0 },   //下3
                  { "x": (-35 * n + 300) + 7 * grid / 2, "y": 625, "index": 0 },   //下4
    ];
    right = [{ "x": 625, "y": (-35 * n + 300) + grid / 2, "index": 0 },       //右1
                  { "x": 625, "y": (-35 * n + 300) + 3 * grid / 2, "index": 0 },   //右2
                  { "x": 625, "y": (-35 * n + 300) + 5 * grid / 2, "index": 0 },   //右3
                  { "x": 625, "y": (-35 * n + 300) + 7 * grid / 2, "index": 0 },   //右4
    ];
    blackball = [left, right, up, down];
}

//改变栅格n
function set_n(value) {
    white_x = -35 * value + 300 + grid / 2;
    white_y = grid / 2 + -35 * value + 300;
    left = [{ "x": -25, "y": -35 * value + 300 + grid / 2, "index": 0 },        //左1
              { "x": -25, "y": -35 * value + 300 + 3 * grid / 2, "index": 0 },    //左2
              { "x": -25, "y": -35 * value + 300 + 5 * grid / 2, "index": 0 },    //左3
              { "x": -25, "y": -35 * value + 300 + 7 * grid / 2, "index": 0 },    //左4
    ];

    up = [{ "x": -35 * value + 300 + grid / 2, "y": -25, "index": 0 },        //上1
                  { "x": -35 * value + 300 + 3 * grid / 2, "y": -25, "index": 0 },    //上2
                  { "x": -35 * value + 300 + 5 * grid / 2, "y": -25, "index": 0 },    //上3
                  { "x": -35 * value + 300 + 7 * grid / 2, "y": -25, "index": 0 },    //上4
    ];
    down = [{ "x": -35 * value + 300 + grid / 2, "y": 625, "index": 0 },       //下1
                  { "x": -35 * value + 300 + 3 * grid / 2, "y": 625, "index": 0 },   //下2
                  { "x": -35 * value + 300 + 5 * grid / 2, "y": 625, "index": 0 },   //下3
                  { "x": -35 * value + 300 + 7 * grid / 2, "y": 625, "index": 0 },   //下4
    ];
    right = [{ "x": 625, "y": -35 * value + 300 + grid / 2, "index": 0 },       //右1
                  { "x": 625, "y": -35 * value + 300 + 3 * grid / 2, "index": 0 },   //右2
                  { "x": 625, "y": -35 * value + 300 + 5 * grid / 2, "index": 0 },   //右3
                  { "x": 625, "y": -35 * value + 300 + 7 * grid / 2, "index": 0 },   //右4
    ];
    blackball = [left, right, up, down];

    first = [{ "x": -100, "y": -100 },
                 { "x": -35 * value + 300 + grid / 2 - 15, "y": -35 * value + 300 + grid / 2 - 15 },             //(1,1)
                 { "x": (-35 * value + 300) + 3 * grid / 2 - 15, "y": (-35 * value + 300) + grid / 2 - 15 },         //(1,2)
                 { "x": (-35 * value + 300) + 5 * grid / 2 - 15, "y": (-35 * value + 300) + grid / 2 - 15 },         //(1,3)
                 { "x": (-35 * value + 300) + 7 * grid / 2 - 15, "y": (-35 * value + 300) + grid / 2 - 15 }          //(1,4)
    ];
    second = [{ "x": -100, "y": -100 },
                  { "x": (-35 * value + 300) + grid / 2 - 15, "y": (-35 * value + 300) + 3 * grid / 2 - 15 },        //(2,1)
                  { "x": (-35 * value + 300) + 3 * grid / 2 - 15, "y": (-35 * value + 300) + 3 * grid / 2 - 15 },    //(2,2)
                  { "x": (-35 * value + 300) + 5 * grid / 2 - 15, "y": (-35 * value + 300) + 3 * grid / 2 - 15 },    //(2,3)
                  { "x": (-35 * value + 300) + 7 * grid / 2 - 15, "y": (-35 * value + 300) + 3 * grid / 2 - 15 },    //(2,3)
    ];
    third = [{ "x": -100, "y": -100 },
                  { "x": -35 * value + 300 + grid / 2 - 15, "y": (-35 * value + 300) + 5 * grid / 2 - 15 },        //(3,1)
                  { "x": (-35 * value + 300) + 3 * grid / 2 - 15, "y": (-35 * value + 300) + 5 * grid / 2 - 15 },    //(3,2)
                  { "x": (-35 * value + 300) + 5 * grid / 2 - 15, "y": (-35 * value + 300) + 5 * grid / 2 - 15 },    //(3,3)
                  { "x": (-35 * value + 300) + 7 * grid / 2 - 15, "y": (-35 * value + 300) + 5 * grid / 2 - 15 },    //(3,3)
    ];
    fourth = [{ "x": -100, "y": -100 },
                  { "x": -35 * value + 300 + grid / 2 - 15, "y": (-35 * value + 300) + 7 * grid / 2 - 15 },        //(4,1)
                  { "x": (-35 * value + 300) + 3 * grid / 2 - 15, "y": (-35 * value + 300) + 7 * grid / 2 - 15 },    //(4,2)
                  { "x": (-35 * value + 300) + 5 * grid / 2 - 15, "y": (-35 * value + 300) + 7 * grid / 2 - 15 },    //(4,3)
                  { "x": (-35 * value + 300) + 7 * grid / 2 - 15, "y": (-35 * value + 300) + 7 * grid / 2 - 15 },    //(4,3)
    ];
    loc = [0, first, second, third, fourth];

    var row = Math.random() * value;
    var col = Math.random() * value;
    row = Math.ceil(row);
    col = Math.ceil(col);

    if (row == 1 && col == 1) {
        row = 3;
        col = 3;
    }
    myrect.x = loc[row][col].x;
    myrect.y = loc[row][col].y;
}

//设置给定黑棋可移动
function black_occur_start(arr) {
    for (var i = 0; i < arr.length; i++) {
        blackball[arr[i][0]][arr[i][1]].index = 1;
    }
}
//设置给定黑棋不可移动
function black_occur_stop(arr) {
    for (var i = 0; i < arr.length; i++) {
        blackball[arr[i][0]][arr[i][1]].index = 0;
    }
}
//判断给定黑棋是否可移动
function black_occur_conclude(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (blackball[arr[i][0]][arr[i][1]].index == 0)
            return false;
    }
    return true;
}
//根据不同关卡的黑棋设置
function black_setting(value) {
    single_black_num = parseInt(value / 325) - black_num;

    switch (barrier) {
        case 1: {
            speed = 10;
            if (single_black_num == 0) {
                blackarray = [[0, 0]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 1) {
                black_occur_stop(blackarray);
                blackarray = [[3, 2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 2) {
                black_occur_stop(blackarray);
                blackarray = [[0, 1]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 3) {
                black_occur_stop(blackarray);
                blackarray = [[3, 3]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 4) {
                black_occur_stop(blackarray);
                blackarray = [[1, 2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 5) {
                black_occur_stop(blackarray);
                blackarray = [[3, 1]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 6) {
                black_occur_stop(blackarray);
                blackarray = [[2, 3]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 7) {
                black_occur_stop(blackarray);
                blackarray = [[3, 0]];
                black_occur_start(blackarray);
            }
            break;
        }
        case 2: {
            speed = 8;
            if (single_black_num == 0) {
                black_occur_stop(blackarray);
                blackarray = [[2, 0], [3, 2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 1) {
                black_occur_stop(blackarray);
                blackarray = [[2, 1], [3, 3]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 2) {
                black_occur_stop(blackarray);
                blackarray = [[0, 1], [1, 1]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 3) {
                black_occur_stop(blackarray);
                blackarray = [[0, 3], [1, 2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 4) {
                black_occur_stop(blackarray);
                blackarray = [[2, 2], [3, 0]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 5) {
                black_occur_stop(blackarray);
                blackarray = [[0, 1], [2, 0]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 6) {
                black_occur_stop(blackarray);
                blackarray = [[3, 2], [2, 3]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 7) {
                black_occur_stop(blackarray);
                blackarray = [[2, 3], [1, 3]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 8) {
                black_occur_stop(blackarray);
                blackarray = [[1, 2], [2, 0]];
                black_occur_start(blackarray);
            }
            break;
        }
        case 3: {
            speed = 8;
            if (single_black_num == 0) {
                black_occur_stop(blackarray);
                blackarray = [[0, 0], [0, 1]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 1) {
                black_occur_stop(blackarray);
                blackarray = [[3, 0], [3, 1], [2, 1]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 2) {
                black_occur_stop(blackarray);
                blackarray = [[2, 1], [2, 2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 3) {
                black_occur_stop(blackarray);
                blackarray = [[0, 1], [0, 2], [2, 2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 4) {
                black_occur_stop(blackarray);
                blackarray = [[0, 0], [1, 0], [2, 1], [3, 1]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 5) {
                black_occur_stop(blackarray);
                blackarray = [[1, 1], [1, 2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 6) {
                black_occur_stop(blackarray);
                blackarray = [[0, 0], [0, 1]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 7) {
                black_occur_stop(blackarray);
                blackarray = [[2, 1], [3, 0], [3, 1]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 8) {
                black_occur_stop(blackarray);
                blackarray = [[1, 2], [3, 1], [0, 2]];
                black_occur_start(blackarray);
            }
            break;
        }
        case 4: {
            speed = 7;
            if (single_black_num == 0) {
                black_occur_stop(blackarray);
                blackarray = [[0, 2], [2, 0], [1, 0], [3, 2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 1) {
                black_occur_stop(blackarray);
                blackarray = [[3, 0], [3, 1]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 2) {
                black_occur_stop(blackarray);
                blackarray = [[0, 0], [2, 2], [3, 0], [1, 2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 3) {
                black_occur_stop(blackarray);
                blackarray = [[0, 1], [0, 2], [2, 0], [3, 1]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 4) {
                black_occur_stop(blackarray);
                blackarray = [[1, 1], [1, 2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 5) {
                black_occur_stop(blackarray);
                blackarray = [[0, 0], [0, 1], [3, 0], [3, 1]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 6) {
                black_occur_stop(blackarray);
                blackarray = [[0, 2], [2, 0], [1, 0], [3, 2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 7) {
                black_occur_stop(blackarray);
                blackarray = [[0, 1], [2, 1], [1, 2]];
                black_occur_start(blackarray);
            }
            break;
        }
        case 5: {
            speed = 6;
            if (single_black_num == 0) {
                black_occur_stop(blackarray);
                blackarray = [[0, 0], [0, 1], [2, 1], [2, 2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 1) {
                black_occur_stop(blackarray);
                blackarray = [[2,0],[3,1],[0,0]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 2) {
                black_occur_stop(blackarray);
                blackarray = [[0,1], [2,1], [1,2], [3,2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 3) {
                black_occur_stop(blackarray);
                blackarray = [[2,0], [2,1], [1,1]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 4) {
                black_occur_stop(blackarray);
                blackarray = [[1, 0], [2, 0],[0,2],[3,2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 5) {
                black_occur_stop(blackarray);
                blackarray = [[0, 0], [0, 1], [3, 0], [3, 1]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 6) {
                black_occur_stop(blackarray);
                blackarray = [[0, 2], [2, 0], [1, 0], [3, 2]];
                black_occur_start(blackarray);
            }
            else if (single_black_num == 7) {
                black_occur_stop(blackarray);
                blackarray = [[0, 1], [2, 1], [1, 2]];
                black_occur_start(blackarray);
            }
            break;
        }
    }
}