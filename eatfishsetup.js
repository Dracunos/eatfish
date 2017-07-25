var ECS = {};
var canvas = document.getElementById("display");

function checkVal(val, funcName) {
    if (val === undefined) {throw funcName + " given no value";}
}