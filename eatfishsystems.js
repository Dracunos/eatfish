var context = canvas.getContext("2d");
ECS.Systems = {};

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
};

ECS.Systems.Draw = function systemDraw(entities) {
    clearCanvas();
    
    for (var eid in entities) {
        var entity = entities[eid];
        context.fillStyle = entity.components["color"].value;
        context.beginPath();
        context.arc(entity.components["position"].x,
                entity.components["position"].y,
                entity.components["size"].value,
                0,2*Math.PI);
        context.fill();
    }
};

ECS.Systems.Move = function systemMove(entities) {
    for (var eid in entities) {
        var entity = entities[eid];
        var pos = entity.components["position"];
        var vect = entity.components["vector"];
        pos.x += vect.x;
        if (0 > pos.x) {pos.x = canvas.width;}
        else if (canvas.width < pos.x) {pos.x = 0;}
        pos.y += vect.y;
        if (0 > pos.y) {pos.y = canvas.height;}
        else if (canvas.height < pos.y) {pos.y = 0;}
        // strong deceleration instead of instantly stopping
        vect.x *= 0.8;
        vect.y *= 0.8;
    }
};

ECS.Systems.Input = function systemInput(entities) {
    for (var eid in entities) {
        var entity = entities[eid];
        var playerCtl = entity.components["playerControl"]
        if (!playerCtl){
            continue;
        } else if (!playerCtl.value) {
            continue;
        }
        keys = ECS.Systems.Input.keys;
        vector = entity.components["vector"]
        if (keys && keys[37] && vector.x > -3) {
            vector.x -= 0.5;
        }
        if (keys && keys[39] && vector.x < 3) {
            vector.x += 0.5;
        }
        if (keys && keys[38] && vector.y > -3) {
            vector.y -= 0.5;
        }
        if (keys && keys[40] && vector.y < 3) {
            vector.y += 0.5;
        }
    }
};

ECS.Systems.Input.keys = [];

window.addEventListener('keydown', function (e) {
    ECS.Systems.Input.keys = (ECS.Systems.Input.keys || []);
    ECS.Systems.Input.keys[e.keyCode] = (e.type == "keydown");
});
window.addEventListener('keyup', function (e) {
    ECS.Systems.Input.keys[e.keyCode] = (e.type == "keydown");            
});




