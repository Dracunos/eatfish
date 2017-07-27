var context = canvas.getContext("2d");
ECS.Systems = {};

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

ECS.Systems.Draw = function systemDraw(entities) {
    clearCanvas();
    var xOffset = gameLevel.centerPos.x - canvas.width / 2;
    var yOffset = gameLevel.centerPos.y - canvas.height / 2;
    
    for (var eid in entities) {
        var entity = entities[eid];
        context.fillStyle = entity.components.color.value;
        context.beginPath();
        context.arc(entity.components.position.x - xOffset,
                entity.components.position.y - yOffset,
                entity.components.size.value,
                0,2*Math.PI);
        context.fill();
    }
};

function checkCollision(id, entities) {
    for (var eid in entities) {
        if (id == eid) {continue;}
        if (entityTooClose(entities[id], entities[eid], 0)) {
            collide(entities[id], entities[eid]);
        }
    }
}

function collide(ent1, ent2) {
    var larger = ent1;
    var smaller = ent2;
    if (ent1.components.size.value < ent2.components.size.value) {
        larger = ent2;
        smaller = ent1;
    } else if (ent1.components.size.value == ent2.components.size.value){
        if (Math.random() > 0.5) {
            larger = ent2;
            smaller = ent2;
        }
    }
    smaller.addComponent(new ECS.Components.Dead());
    larger.components.size.value += smaller.components.size.value * 0.15;
}

ECS.Systems.Move = function systemMove(entities) {
    for (var eid in entities) {
        var entity = entities[eid];
        var pos = entity.components.position;
        var vect = entity.components.vector;
        var size = entity.components.size.value;
        pos.x += vect.x;
        pos.y += vect.y;
        var levelSize = gameLevel.levelSize;
        if (pos.x < 0 + size) { // Left bounding
            pos.x = 0 + size;
        } else if (pos.x > levelSize.width - size) { // Right bounding
            pos.x = levelSize.width - size;
        }
        if (pos.y < 0 + size) { // Top bounding
            pos.y = 0 + size;
        } else if (pos.y > levelSize.height - size) { // Bottom bounding
            pos.y = levelSize.height - size;
        }
        if (entity.components.playerControl && entity.components.playerControl.value) {
            gameLevel.updateCenter(pos);
        }
        checkCollision(eid, entities);
        // strong deceleration instead of instantly stopping
        vect.x *= 0.8;
        vect.y *= 0.8;
    }
};

ECS.Systems.Kill = function systemKill(entities) {
    for (var eid in entities) {
        var entity = entities[eid];
        if (entity.components.dead && entity.components.dead.value) {
            delete ECS.Entities[entity.id];
        }
    }
};

ECS.Systems.Input = function systemInput(entities) {
    for (var eid in entities) {
        var entity = entities[eid];
        var playerCtl = entity.components.playerControl;
        if (!playerCtl){
            continue;
        } else if (!playerCtl.value) {
            continue;
        }
        keys = ECS.Systems.Input.keys;
        vector = entity.components.vector;
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




