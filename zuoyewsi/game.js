//开始计时
function timedCount() {
    select_points(blackarray);
    //barrier_setting();
    black_return();
    t = setTimeout("timedCount()", speed);
    black_setting(t + 1 - time_length);
    rect_collision();
    if (black_occur_conclude(blackarray)) {
        for (var j = 0; j < blackarray.length; j++) {
            next_draw(blackball[blackarray[j][0]][blackarray[j][1]].x, blackball[blackarray[j][0]][blackarray[j][1]].y, "black");
        }
    }
    collision();
}
//暂停或停止
function stopCount() {
    clearTimeout(t);
}
//开始游戏
function startgame() {
    draw();
    ctx.beginPath();
    ctx.arc(white_x, white_y, 25, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();


    var row = Math.random() * n;
    var col = Math.random() * n;
    row = Math.ceil(row);
    col = Math.ceil(col);

    if (row == 1 && col == 1) {
        row = 3;
        col = 3;
    }
    myrect.x = loc[row][col].x;
    myrect.y = loc[row][col].y;

    ctx.beginPath();
    ctx.rect(myrect.x, myrect.y, 30, 30);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < n; j++) {
            ctx.beginPath();
            ctx.arc(blackball[i][j].x, blackball[i][j].y, 20, 0, Math.PI * 2, false);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();
        }
    }
}
//空格键事件判断
var _keyboard = function (evt) {
    evt = window.event || evt;
    //开始界面
    if (evt.keyCode == 32 && select == 0) {
        ctx.rect(0, 0, 600, 600);
        ctx.fillStyle = "#ffb17f";
        ctx.fill();
        stop = 0;
        startgame();
        timedCount();
        select = 1;
    }
    //游戏中
    else if (evt.keyCode == 32 && select == 1) {
        stopCount();
        select = 2;
        stop = 1;
    }
    //游戏暂停状态
    else if (evt.keyCode == 32 && select == 2) {
        timedCount();
        select = 1;
        stop = 0;
    }
    //关卡界面
    else if (evt.keyCode == 32 && select == 3) {
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
    else if (evt.keyCode == 32 && select == 4) {
        all_black_return();
        barrier = 1;
        count = 0;
        black_num = 0;
        score = 0;
        single_black_num = 0;
        ctx.rect(0, 0, 600, 600);
        ctx.globalAlpha =1;
        ctx.fillStyle = "#ffb17f";
        ctx.fill();
        startinterface();
        select = 0;
        finally_score = 0;
        n = 4;
        set_n(n);
    }
}

window.document.onkeydown = _keyboard;

startinterface();

