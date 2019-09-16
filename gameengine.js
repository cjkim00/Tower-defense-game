// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
var foundTower = false;
var towerSelected;
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.entities = [];
    this.towersList = []; 
    this.uiList = [];
    this.showOutlines = false;  //////USE THIS TO TEST BOUNDS
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.timer = new Timer();
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}


var keys = [];

GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;
 

    var getXandY = function (e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        x = Math.floor(x / 25);
        y = Math.floor(y / 25);

        return { x: x, y: y };
    }

    this.ctx.canvas.addEventListener("mousemove", function (e) {
        //console.log(getXandY(e));
        that.mouse = getXandY(e);
    }, false);

    this.ctx.canvas.addEventListener("click", function (e) {
        // console.log(getXandY(e));
        that.click = getXandY(e);
    }, false);

    this.ctx.canvas.addEventListener("wheel", function (e) {
        //console.log(getXandY(e));
        that.wheel = e;
        //       console.log(e.wheelDelta);
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("contextmenu", function (e) {
        //console.log(getXandY(e));
        that.rightclick = getXandY(e);
        var queryX = that.rightclick.x;
        var queryY = that.rightclick.y;

        for (var i = 0; i <= towersList.length - 1; i++) {
            if (towersList[i].contains(queryX, queryY)) {
                foundTower = true;
                towerSelected = towersList[i];
                return towerSelected;
            }
        }
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keypress", function (e) {
       
        e.preventDefault();
        var keyCode = e.keyCode;
        // console.log(e);
       checkKeyPress(keyCode);
       
    }, false);

    this.ctx.canvas.addEventListener("keydown", function (e) {
        
        
        var keyCodeDown = e.keyCode;
        // console.log(e);
        movingByKey = true;
        checkKeyDown(keyCodeDown);
        e.preventDefault();
    }, false);
    
    this.ctx.canvas.addEventListener("keyup", function (e) {
    
        var keyCodeUp = e.keyCode;
        console.log(e);
        movingByKey = false;
        checkKeyUpHelper(e);
        Hero.prototype.checkKeyUp(keyCodeUp);
        e.preventDefault();
    }, false);

    console.log('Input started');
}


function checkKeyPress(e) {
    switch (e) {
        case 49: //1
            console.log('heal skill');
            Hero.prototype.skillHeal();
            break;
        case 50: //2
            console.log('thunder skill');
            Hero.prototype.skillThunder()
            break;
        case 51: //3 
            console.log('fire skill');
            Hero.prototype.skillFire();
            break;
        case 52: //4
            console.log('ice skill');
            Hero.prototype.skillIce();
            break;
        default:
            return;     
    }
};
function checkKeyDown(e) {
    keys[e.keyCode] = true;

    switch (e) {
        case 87: //w
            Hero.prototype.moveUp();
            break;
        case 65: //a
            Hero.prototype.moveLeft();
            break;
        case 83: //s
            Hero.prototype.moveDown();
            break;
        case 68: //d
            Hero.prototype.moveRight();
            break;
        default:
            return;
    }
}

function checkKeyUpHelper(e) {
    keys[e.keyCode] = false;
}

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    console.log(entity);
    this.entities.push(entity);
}

GameEngine.prototype.addTower = function (entity) {
    console.log('added tower');
    console.log(entity);
    this.towersList.push(entity);
}

GameEngine.prototype.addUI = function (entity) {
    console.log('added UI');
    console.log(entity);
    this.uiList.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    for (var i = 0; i < this.towersList.length; i++) {
        this.towersList[i].draw(this.ctx);
    }

    for (var i = 0; i < this.uiList.length; i++) {
        this.uiList[i].draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;
    var towersCount = this.towersList.length;
    var uiCount = this.uiList.length;

    for (var i = 0; i < towersCount; i++) {
        var tower = this.towersList[i];

        if (!tower.removeFromWorld) {
            tower.update();
        }
    }
    for (var i = 0; i < uiCount; i++) {
        var ui = this.uiList[i];

        if (!ui.removeFromWorld) {
            ui.update();
        }
    }

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
            console.log('removed entity')
        }
    }

    for (var i = this.uiList.length - 1; i >= 0; --i) {
        if (this.uiList[i].removeFromWorld) {
            this.uiList.splice(i, 1);
            console.log('removed entity')
        }
    }

    for (var i = this.towersList.length -1; i >= 0; --i) {
        if (this.towersList[i].removeFromWorld) {
            this.towersList.splice(i, 1);
            console.log('removed tower')
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.click = null;
    this.rightclick = null;
    this.wheel = null;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius && this.boundX && this.boundY) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "RED";
        this.game.ctx.arc(this.recenterBoundX(), this.recenterBoundY(), this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

//recenters the collision bounds for an entity based on its animation.
//only works if the entity has this.boundx and this.boundy in its properties
Entity.prototype.recenterBoundX = function () {
    var currentX = this.x;
    var newX;
    newX = currentX + (this.boundX/2);
    return newX;
}
Entity.prototype.recenterBoundY = function () {
    var currentY = this.y;
    var newY;
    newY = currentY + (this.boundY/2);
    return newY;
}




Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    // offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}


//////////////////UI ENTITY

function uiEntity(uiGameEng, uiBoard, uiHero) {
    
    this.game = uiGameEng;
    this.board = uiBoard;
    this.hero = uiHero;
    this.functionList = [];

    Entity.call();
}

uiEntity.prototype = new Entity();
uiEntity.prototype.constructor = uiEntity;

uiEntity.prototype.update = function() {
    Entity.prototype.update.call(this);
}

uiEntity.prototype.draw = function() {
    Entity.prototype.draw.call(this);
}

// uiEntity.prototype.addFunction = function(entity, funcName, doSomething) {
//     var obj = entity;
//     var e;

//     funcName => (obj function(obj){doSomething};
//     e = [funcName , doSomething];
//     this.functionList.push(e);
// }







////////////////////END UI ENTITY



