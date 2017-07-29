// Started with this example: http://vasir.net/blog/game-development/how-to-build-entity-component-system-in-javascript
// Thank you for such an easy to understand explanation on ECS.

var ECS = {};
var canvas = document.getElementById("eatfishdisplay");
canvas.width = 1000;
canvas.height = 500;

document.getElementById("Taller").onclick = function() {
    canvas.height += 150;
}
document.getElementById("Shorter").onclick = function() {
    canvas.height -= 150;
}
document.getElementById("Wider").onclick = function() {
    canvas.width += 150;
}
document.getElementById("Thinner").onclick = function() {
    canvas.width -= 150;
}

var maxPlayerSpeed = 2.5;
var enemySpeed = 1;
document.onkeypress = function(e) {
    var evtobj=window.event? event : e //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
    var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
    if (unicode >= 33 && unicode <= 36) {
        e.preventDefault();
    }
    if (unicode == 33) { // Page Up increases player speed
        maxPlayerSpeed += 0.5;
        document.getElementById("playerSpeed").innerText = maxPlayerSpeed * 10;
    }
    if (unicode == 34) { // Page Down decreases player speed
        maxPlayerSpeed -= 0.5;
        if (maxPlayerSpeed < 0) {
            maxPlayerSpeed = 0;
        }
        document.getElementById("playerSpeed").innerText = maxPlayerSpeed * 10;
    }
    if (unicode == 36) { // Home increases enemy speed
        enemySpeed += 0.05;
        document.getElementById("enemySpeed").innerText = enemySpeed.toFixed(2);
    }
    if (unicode == 35) { // End decreases enemy speed
        enemySpeed -= 0.05;
        if (enemySpeed < 0) {
            enemySpeed = 0;
        }
        document.getElementById("enemySpeed").innerText = enemySpeed.toFixed(2);
    }
}

function checkVal(val, funcName) {
    if (val === undefined) {throw funcName + " given no value";}
}

var gameLevel = {
    centerPos: {x: 0, y: 0},
    levelSize: {width: 3000, height: 2500}
};

gameLevel.updateCenter = function updateCenter(pos) {
    var leftBound = canvas.width / 2;
    var rightBound = this.levelSize.width - canvas.width / 2;
    var topBound = canvas.height / 2;
    var bottomBound = this.levelSize.height - canvas.height / 2;
    this.centerPos.x = pos.x;
    this.centerPos.y = pos.y;
    if (pos.x < leftBound) {
        this.centerPos.x = leftBound;
    } else if (pos.x > rightBound) {
        this.centerPos.x = rightBound;
    }
    if (pos.y < topBound) {
        this.centerPos.y = topBound;
    } else if (pos.y > bottomBound) {
        this.centerPos.y = bottomBound;
    }
};