function checkDistance(pos1, pos2) {
    var a = Math.abs(pos1.x - pos2.x);
    var b = Math.abs(pos1.y - pos2.y);
    return Math.sqrt(a*a + b*b);
}

function entityDistance(entity1, entity2) {
    return checkDistance(entity1.components.position, entity2.components.position);
}

function entitySpawnTooClose(entity1, entity2, buffer) {
    if (buffer === undefined) {
        buffer = 0;
    }
    var size1 = entity1.components.size.value;
    var size2 = entity2.components.size.value;
    var dist = entityDistance(entity1, entity2);
    if (dist > size1 + size2 + buffer) {
        return false;
    }
    return true;
}

function spawnEnemies(number, minSize, maxSize) {
    for (var i = 0; i < number; i++) {
        var goodPlacement = false;
        var attempts = 0;
        var maxAttempts = 500;
        while (!goodPlacement && attempts < maxAttempts) {
            goodPlacement = true;
            entity = new ECS.Entity();
            entity.addComponent(new ECS.Components.Size(Math.floor(Math.random() * (maxSize - minSize + 1) + minSize)));
            entity.addComponent(new ECS.Components.Color());
            entity.addComponent(new ECS.Components.Position([Math.random() * canvas.width, Math.random() * canvas.height]));
            entity.addComponent(new ECS.Components.Vector([0, 0]));
            for (var eid in ECS.Entities) {
                if (entitySpawnTooClose(ECS.Entities[eid], entity, 15)) {
                    goodPlacement = false;
                }
            }
            attempts++;
        }
        if (attempts < maxAttempts) {
            ECS.Entities[entity.id] = entity;
        } else {
            console.log("Failed to place entity, no space.");
        }
    }
}

function gameLoop() {
    for (var i=0; i < systems.length; i++){
        systems[i](ECS.Entities);
    }
    requestAnimationFrame(gameLoop);
}

var systems = [ECS.Systems.Input, ECS.Systems.Move, ECS.Systems.Draw];
ECS.Entities = {};

function startGame() {
    var entity = new ECS.Entity();
    entity.addComponent(new ECS.Components.Size(5));
    entity.addComponent(new ECS.Components.Color());
    entity.addComponent(new ECS.Components.Position([canvas.width/2, canvas.height/2]));
    entity.addComponent(new ECS.Components.Vector([0, 0]));
    entity.addComponent(new ECS.Components.PlayerControl(true));
    ECS.Entities[entity.id] = entity;
    
    spawnEnemies(10, 2, 4);
    spawnEnemies(6, 6, 10);
    
    gameLoop();
}