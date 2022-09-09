"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let four, number = [], score, errorCount, timer;

let startflag = true, timerflag, tutorialflag = true;

ctx.font = "40px sans-serif";
ctx.fillStyle = "black";
let startText = "SPACEキー or タップ";
let textWidth = ctx.measureText(startText).width;
ctx.fillText(startText, (canvas.width - textWidth) / 2, 300);
startText = "スタート";
textWidth = ctx.measureText(startText).width;
ctx.fillText(startText, (canvas.width - textWidth) / 2, 380);

ctx.strokeRect(230, 500, 140, 60);
ctx.font = "30px sans-serif";
ctx.fillText("遊び方", 255, 540);
ctx.font = "40px sans-serif";

function start() {
    tutorialflag = false;
    startText = "スタート！！";
    textWidth = ctx.measureText(startText).width;
    ctx.fillText(startText, (canvas.width - textWidth) / 2, 400);

    const ms = 1000;
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(seven, 100, 400, 100, 100);
        ctx.drawImage(eight, 200, 400, 100, 100);
        ctx.drawImage(nine, 300, 400, 100, 100);

        ctx.drawImage(four4, 100, 500, 100, 100);
        ctx.drawImage(five, 200, 500, 100, 100);
        ctx.drawImage(six, 300, 500, 100, 100);

        ctx.drawImage(one, 100, 600, 100, 100);
        ctx.drawImage(two, 200, 600, 100, 100);
        ctx.drawImage(three, 300, 600, 100, 100);

        ctx.drawImage(zero, 400, 600, 100, 100);

        ctx.drawImage(clear, 400, 400, 100, 100);
        ctx.drawImage(decision, 400, 500, 100, 100);

        timer = 400;
        timerflag = true;
        keyflag = true;
        Enterflag = true;

        four = Math.floor(Math.random() * 4);
        score = 0, errorCount = 0;
        loop();
    }, ms);
}

function trigger() {
    keyflag = true, Enterflag = true;
    four = Math.floor(Math.random() * 4);
    loop();
}

function creatNumber() {
    number = [Math.floor(Math.random() * 99) + 1, Math.floor(Math.random() * 99) + 1];
    return;
}

function creatSubtraction() {
    number = [Math.floor(Math.random() * 99) + 1, Math.floor(Math.random() * 99) + 1];
    if (number[1] > number[0]) {
        creatSubtraction();
    }
    return;
}

function creatMultiplication() {
    number = [Math.floor(Math.random() * 13) + 4, Math.floor(Math.random() * 13) + 4];
    return;
}

function creatDivision() {
    number = [Math.floor(Math.random() * 95) + 5, Math.floor(Math.random() * 95) + 5];
    if ((number[0] % number[1] != 0) || (number[0] == number[1])) {
        creatDivision();
    }
    return;
}

let answer;

function loop() {
    creatNumber();
    if (four == 1 && number[1] > number[0]) {
        creatSubtraction();
    }
    if (four == 2 && (number[0] > 16 || number[1] > 16)) {
        creatMultiplication();
    }
    if (four == 3 && number[0] % number[1] != 0) {
        creatDivision();
    }


    ctx.font = "50px sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText(number[0], 40, 100);


    if (four == 0) {
        ctx.drawImage(addition, 120, 58, 50, 50); //+
        answer = number[0] + number[1];
    } else if (four == 1) {
        ctx.drawImage(subtraction, 120, 58, 50, 50); //-
        answer = number[0] - number[1];
    } else if (four == 2) {
        ctx.drawImage(multiplication, 120, 58, 50, 50); //*
        answer = number[0] * number[1];
    } else {
        ctx.drawImage(division, 120, 58, 50, 50); ///
        answer = number[0] / number[1];
    }
    console.log(answer);

    ctx.fillText(number[1], 195, 100);

    ctx.drawImage(equal, 275, 58, 50, 50); //=

    ctx.font = "30px sans-serif";
    let scoretext = "正解：" + score + "　　ミス：" + errorCount;
    textWidth = ctx.measureText(scoretext).width;
    ctx.fillText(scoretext, (canvas.width - textWidth) / 2, 250);

}

let keycode = [];
let keypresstimes = 0;
let keyflag = false;
let Enterflag = true;

document.addEventListener('keypress', keypress);
function keypress(e) {
    if (e.keyCode === 32 && startflag == true) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        startflag = false;
        start();
    }

    if (e.keyCode >= 48 && e.keyCode <= 57 && keyflag == true) {
        keycode[keypresstimes] = e.keyCode - 48;
        Display();
    }

    if (e.key === 'Enter' && Enterflag == true) {
        Enterflag = false;
        Decision();
    }
    if (e.key === 'c' || e.key === 'Backspace') {
        keypresstimes = 0;
        keyflag = true;
        ctx.clearRect(370, 30, 260, 75);
    }
}

canvas.addEventListener("click", e => {
    let rect = canvas.getBoundingClientRect();
    let point = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };

    let tutorialSquare = {
        x: 230, y: 500,
        w: 140, h: 60
    };

    let hitTutorial =
        (tutorialSquare.x <= point.x && point.x <= tutorialSquare.x + tutorialSquare.w)  // 横方向の判定
        && (tutorialSquare.y <= point.y && point.y <= tutorialSquare.y + tutorialSquare.h)  // 縦方向の判定
    if (hitTutorial && tutorialflag) {
        tutorial();
    }

    let startSquare = {
        x: 0, y: 0,
        w: canvas.width, h: 500
    };

    let hitStart =
        (startSquare.x <= point.x && point.x <= startSquare.x + startSquare.w)  // 横方向の判定
        && (startSquare.y <= point.y && point.y <= startSquare.y + startSquare.h)  // 縦方向の判定
    if (hitStart && startflag) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        startflag = false;
        start();
    }


    let square7 = {
        x: 100, y: 360,
        w: 100, h: 100
    };

    let hit7 =
        (square7.x <= point.x && point.x <= square7.x + square7.w)  // 横方向の判定
        && (square7.y <= point.y && point.y <= square7.y + square7.h)  // 縦方向の判定

    if (hit7 && keyflag == true) {
        keycode[keypresstimes] = 7;
        Display();
    }

    let square8 = {
        x: 199, y: 360,
        w: 100, h: 100
    };

    let hit8 =
        (square8.x <= point.x && point.x <= square8.x + square8.w)  // 横方向の判定
        && (square8.y <= point.y && point.y <= square8.y + square8.h)  // 縦方向の判定

    if (hit8 && keyflag == true) {
        keycode[keypresstimes] = 8;
        Display();
    }

    let square9 = {
        x: 298, y: 360,
        w: 100, h: 100
    };

    let hit9 =
        (square9.x <= point.x && point.x <= square9.x + square9.w)  // 横方向の判定
        && (square9.y <= point.y && point.y <= square9.y + square9.h)  // 縦方向の判定

    if (hit9 && keyflag == true) {
        keycode[keypresstimes] = 9;
        Display();
    }

    let square4 = {
        x: 100, y: 459,
        w: 100, h: 100
    };

    let hit4 =
        (square4.x <= point.x && point.x <= square4.x + square4.w)  // 横方向の判定
        && (square4.y <= point.y && point.y <= square4.y + square4.h)  // 縦方向の判定

    if (hit4 && keyflag == true) {
        keycode[keypresstimes] = 4;
        Display();
    }

    let square5 = {
        x: 199, y: 459,
        w: 100, h: 100
    };

    let hit5 =
        (square5.x <= point.x && point.x <= square5.x + square5.w)  // 横方向の判定
        && (square5.y <= point.y && point.y <= square5.y + square5.h)  // 縦方向の判定

    if (hit5 && keyflag == true) {
        keycode[keypresstimes] = 5;
        Display();
    }

    let square6 = {
        x: 298, y: 459,
        w: 100, h: 100
    };

    let hit6 =
        (square6.x <= point.x && point.x <= square6.x + square6.w)  // 横方向の判定
        && (square6.y <= point.y && point.y <= square6.y + square6.h)  // 縦方向の判定

    if (hit6 && keyflag == true) {
        keycode[keypresstimes] = 6;
        Display();
    }
    let square1 = {
        x: 100, y: 558,
        w: 100, h: 100
    };

    let hit1 =
        (square1.x <= point.x && point.x <= square1.x + square1.w)  // 横方向の判定
        && (square1.y <= point.y && point.y <= square1.y + square1.h)  // 縦方向の判定

    if (hit1 && keyflag == true) {
        keycode[keypresstimes] = 1;
        Display();
    }

    let square2 = {
        x: 199, y: 558,
        w: 100, h: 100
    };

    let hit2 =
        (square2.x <= point.x && point.x <= square2.x + square2.w)  // 横方向の判定
        && (square2.y <= point.y && point.y <= square2.y + square2.h)  // 縦方向の判定

    if (hit2 && keyflag == true) {
        keycode[keypresstimes] = 2;
        Display();
    }

    let square3 = {
        x: 298, y: 558,
        w: 100, h: 100
    };

    let hit3 =
        (square3.x <= point.x && point.x <= square3.x + square3.w)  // 横方向の判定
        && (square3.y <= point.y && point.y <= square3.y + square3.h)  // 縦方向の判定

    if (hit3 && keyflag == true) {
        keycode[keypresstimes] = 3;
        Display();
    }

    let square0 = {
        x: 199, y: 657,
        w: 100, h: 100
    };

    let hit0 =
        (square0.x <= point.x && point.x <= square0.x + square0.w)  // 横方向の判定
        && (square0.y <= point.y && point.y <= square0.y + square0.h)  // 縦方向の判定

    if (hit0 && keyflag == true) {
        keycode[keypresstimes] = 0;
        Display();
    }

    let squareC = {
        x: 397, y: 360,
        w: 100, h: 100
    };

    let hitC =
        (squareC.x <= point.x && point.x <= squareC.x + squareC.w)  // 横方向の判定
        && (squareC.y <= point.y && point.y <= squareC.y + squareC.h)  // 縦方向の判定

    if (hitC) {
        keypresstimes = 0;
        keyflag = true;
        ctx.clearRect(370, 30, 260, 75);
    }

    let squareD = {
        x: 397, y: 459,
        w: 100, h: 100
    };

    let hitD =
        (squareD.x <= point.x && point.x <= squareD.x + squareD.w)  // 横方向の判定
        && (squareD.y <= point.y && point.y <= squareD.y + squareD.h)  // 縦方向の判定

    if (hitD && Enterflag == true) {
        keypresstimes = 0;
        Enterflag = false;
        Decision();
    }

});

let response;

function Display() {
    ctx.clearRect(340, 30, 260, 75);

    if (keypresstimes == 1) {
        response = keycode[1] + (keycode[0] * 10);
    } else if (keypresstimes == 2) {
        response = keycode[2] + (keycode[1] * 10) + (keycode[0] * 100);
    } else {
        response = keycode[0];
    }
    ctx.font = "50px sans-serif"
    ctx.fillStyle = "black";
    ctx.fillText(response, 370, 100);
    keypresstimes++;

    if (response === 0) {
        keypresstimes = 0;
    }

    if (keypresstimes === 3) {
        keyflag = false;
    }

}

function Decision() {
    keypresstimes = 0;
    Check();
}

function Check() {
    keyflag = false;
    if (response === answer) {
        ctx.drawImage(correct, 335, 35, 50, 50);
        score++;
    } else {
        ctx.drawImage(error, 335, 35, 50, 50);
        errorCount++;
        ctx.font = "40px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText("正解　" + answer, 270, 160);
    }

    const ms = 500;
    setTimeout(() => {
        if (timerflag == true) {
            ctx.clearRect(0, 0, canvas.width, 270);
            trigger();
        }
    }, ms);
}

let countdown = setInterval(function () {
    timer--;


    if (timerflag == true) {
        ctx.clearRect(100, 280, 400, 15);
        ctx.strokeRect(100, 280, 400, 15);
        ctx.font = "20px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText("残り時間", 10, 294);
        ctx.fillRect(102, 282, timer, 11)
    }

    if (timer == 0) {
        timerflag = false;
        End();
    }
}, 100)

function End() {
    Enterflag = false, keyflag = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "80px sans-serif";
    ctx.fillStyle = "black";
    let endText = "終了！";
    textWidth = ctx.measureText(endText).width;
    ctx.fillText(endText, (canvas.width - textWidth) / 2, 150);

    let scr = (score + errorCount) * 56 + (score * 698) - (errorCount * 349);
    ctx.font = "40px sans-serif";
    const ms = 1000;
    setTimeout(() => {
        ctx.fillText("スコア：" + scr, 150, 350);
        ctx.fillText("　正解：" + score, 150, 420);
        ctx.fillText("　ミス：" + errorCount, 150, 490);

        let startText = "SPACEキー or タップ";
        let textWidth = ctx.measureText(startText).width;
        ctx.fillText(startText, (canvas.width - textWidth) / 2, 600);
        startText = "リスタート";
        textWidth = ctx.measureText(startText).width;
        ctx.fillText(startText, (canvas.width - textWidth) / 2, 680);

        startflag = true;
    }, ms);
}

function tutorial() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "80px sans-serif";
    let text = "遊び方";
    textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textWidth) / 2, 150);
    ctx.font = "25px sans-serif";
    ctx.fillText("・０〜９をタップまたはキーを押して入力します", 20, 300);
    ctx.fillText("・", 20, 340);
    ctx.drawImage(clear, 45, 315, 30, 30);
    ctx.fillText("をタップまたはCキーで取り消せます", 80, 340);
    ctx.fillText("・", 20, 380);
    ctx.drawImage(decision, 45, 355, 30, 30);
    ctx.fillText("をタップまたはEnterキーで回答できます", 80, 380);

    ctx.strokeRect(230, 500, 140, 60);
    ctx.font = "30px sans-serif";
    ctx.fillText("戻る", 270, 540);
    ctx.font = "40px sans-serif";


}