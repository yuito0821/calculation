"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let four, number = [], score, errorCount, timer;

let startflag = true;

ctx.font = "40px sans-serif";
ctx.fillStyle = "black";
const startText = "SPACEキーでスタート";
let textWidth = ctx.measureText(startText).width;
ctx.fillText(startText, (canvas.width - textWidth) / 2, 300);

function start() {
    four = Math.floor(Math.random() * 4);
    score = 0, errorCount = 0;
    loop();
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
    let scoretext = "スコア：" + score + "　　ミス：" + errorCount;
    textWidth = ctx.measureText(scoretext).width;
    ctx.fillText(scoretext, (canvas.width - textWidth) / 2, 250);

}

let keycode = [];
let keypresstimes = 0;
let keyflag = true;
let Enterflag = true;

document.addEventListener('keypress', keypress);
function keypress(e) {
    if (e.keyCode === 32 && startflag == true) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        timer = 400;
        startflag = false;
        start();
    }

    if (e.keyCode >= 48 && e.keyCode <= 57 && keyflag == true) {
        keycode[keypresstimes] = e.keyCode - 48;
        Display();
    }

    if (e.key === 'Enter' && Enterflag == true) {
        keypresstimes = 0;
        Enterflag = false;
        Decision();
    }
    if (e.key === 'c') {
        keypresstimes = 0;
        keyflag = true;
        ctx.clearRect(370, 30, 260, 75);
    }
}

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
        ctx.clearRect(0, 0, canvas.width, 270);
        trigger();
    }, ms);
}

let countdown = setInterval(function () {
    timer--;


    if (startflag == false) {
        ctx.clearRect(100, 280, 400, 15);
        ctx.strokeRect(100, 280, 400, 15);
        ctx.font = "20px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText("TIME", 20, 294);
        ctx.fillRect(100, 280, timer, 15)
    }

    if (timer == 0) {
        End();
    }
}, 100)

function End() {
    startflag = true, Enterflag = false, keyflag = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "80px sans-serif";
    ctx.fillStyle = "black";
    const endText = "終了！";
    textWidth = ctx.measureText(endText).width;
    ctx.fillText(endText, (canvas.width - textWidth) / 2, 150);


}