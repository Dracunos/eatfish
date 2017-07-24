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
    
    gameLoop();
}