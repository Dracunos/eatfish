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
    canvas.width += 300;
}
document.getElementById("Thinner").onclick = function() {
    canvas.width -= 300;
}

var maxPlayerSpeed = 3.5;
function updatePagePlayerSpeed() {
    document.getElementById("playerSpeed").innerText = maxPlayerSpeed * 10;
    document.getElementById("playerSpeed").textContent = maxPlayerSpeed * 10;
}
updatePagePlayerSpeed();
var enemySpeed = 1;
function updatePageEnemySpeed() {
    document.getElementById("enemySpeed").innerText = enemySpeed.toFixed(2);
    document.getElementById("enemySpeed").textContent = enemySpeed.toFixed(2);
}

function checkVal(val, funcName) {
    if (val === undefined) {throw funcName + " given no value";}
}

var gameLevel = {
    centerPos: {x: 0, y: 0},
    levelSize: {width: 6000, height: 4000}
};

gameLevel.updateCenter = function updateCenter(pos) {
    var leftBound = canvas.width / (2 * screenSize);
    var rightBound = this.levelSize.width - canvas.width / (2 * screenSize);
    var topBound = canvas.height / (2 * screenSize);
    var bottomBound = this.levelSize.height - canvas.height / (2 * screenSize);
    this.centerPos.x = pos.x;
    this.centerPos.y = pos.y;
    if (canvas.width > this.levelSize.width * screenSize) {
        this.centerPos.x = this.levelSize.width / 2;
    } else if (pos.x < leftBound) {
        this.centerPos.x = leftBound;
    } else if (pos.x > rightBound) {
        this.centerPos.x = rightBound;
    }
    if (canvas.height > this.levelSize.height * screenSize) {
        this.centerPos.y = this.levelSize.height / 2;
    } else if (pos.y < topBound) {
        this.centerPos.y = topBound;
    } else if (pos.y > bottomBound) {
        this.centerPos.y = bottomBound;
    }
};



// requestAnimationFrame for IE polyfill (https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/)
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());