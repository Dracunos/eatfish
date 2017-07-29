// Started with this example: http://vasir.net/blog/game-development/how-to-build-entity-component-system-in-javascript
// Thank you for such an easy to understand explanation on ECS.

var ECS = {};
var canvas = document.getElementById("display");
canvas.width = 1000;
canvas.height = 500;

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