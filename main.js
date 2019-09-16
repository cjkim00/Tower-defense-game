var AM = new AssetManager();
var spawnX = 0;
var spawnY = 0;
var baseX = 0;
var baseY = 0;
var lastX, lastY;
var distance = 24;
var level = 1;



var spawnX = 0;
var spawnY = 0;
var baseX = 0;
var baseY = 0;
var lastX, lastY;
var distance = 24;
var level = 1;
var isBuilding = 0;
var towerType;
var spawnInterval = 2.0;
var playerGold = 150;
var playerHealth = 100;
var arrowTowerPrice = 50;
var cannonTowerPrice = 65;
var magicTowerPrice = 80;
var currentTower;

var map = [['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '51', 'p', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '50', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '49', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '48', '-', '-'],
['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '47', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '13', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '46', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '14', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '45', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '15', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '44', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '16', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '43', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '17', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '42', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '18', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '41', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '19', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '40', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '20', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '39', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
];



var levels = [['1', '1', '1', '1', '1-2', '2', '2', '2', '2', '2', '2', '2', '2', '3'],
['1', '2', '1', '2', '4', '4', '5', '5', '4', '5', '2', '2', '4', '5',
    '4', '4', '4', '5', '5', '5', '5', '6'],
['4', '4', '5', '5', '7', '7', '7', '7', '8', '8', '8', '8', '8', '7',
    '7', '8', '7', '7', '8', '8', '8', '8', '7', '7', '7', '8', '8', '8', '8', '9'],
['7', '8', '7', '7', '8', '8', '8', '8', '7', '7', '7', '8', '8', '8', '8', '8',
    '10', '10', '10', '10', '11', '11', '11', '11', '11', '11', '10', '11', '10', '11', '10', '11',
    '10', '10', '11', '11', '11', '12'],
['3', '6', '10', '10', '10', '11', '11', '11', '11', '10', '10', '10', '10', '10', '11', '11',
    '10', '10', '10', '10', '11', '11', '11', '11', '11', '11', '10', '11', '10', '11', '10', '11',
    '10', '10', '11', '11', '11', '12']
];

/////////////////////////////////////////ANIMATION CLASS
function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, padWidth) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
    this.padWidth = padWidth;

}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var xOffset = this.padWidth;
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;

    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);
    var drawXpx = xindex * this.frameWidth + xOffset * xindex + xOffset;

    ctx.drawImage(this.spriteSheet,
        drawXpx, yindex * this.frameHeight,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

/////////////////////////////////////////END 
//Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, padWidth)

function base(game) {
    this.state = 0;
    this.animation = new Animation(AM.getAsset("./img/crystal_standing_35w_84h_1pd_6fr.png"), 35, 84, 216, .08, 6, true, 1, 1);
    this.ani_hurt = new Animation(AM.getAsset("./img/crystal_hurt_35w_84h_1pd_4fr.png"), 35, 84, 144, 2.0, 4, false, 1, 1);
    this.ani_dead = new Animation(AM.getAsset("./img/crystal_death_54w_84h_1pd_21fr.png"), 54, 84, 1155, 0.12, 21, false, 1, 1);
    this.ctx = game.ctx;
    this.name = "base";
    this.x = baseX;
    this.y = baseY;
    this.radius = 60;
    this.boundX = 35;
    this.boundY = 84;
    this.game = game;
    this.isDead = 0;
    Entity.call(this, game, baseX, baseY);
}



base.prototype = new Entity();
base.prototype.constructor = base;

base.prototype.update = function () {
    this.checkCC(this.game);

    Entity.prototype.update.call(this);
}

base.prototype.draw = function (ctx) {
    if (this.state == 1) {
        this.ani_hurt.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else if (this.state == 2) {
        this.ani_dead.drawFrame(this.game.clockTick, ctx, this.x - 25, this.y);
    }
    else if (this.state == 0) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}

base.prototype.checkCC = function (game) {
    for (var i = 0; i <= game.entities.length - 1; i++) {
        if (this.collide(game.entities[i]) && playerHealth > 0) {
            console.log('what');
            this.state = 1;
            playerHealth = playerHealth - game.entities[i].damage;
            playerGold = playerGold + game.entities[i].reward;
            UpdateUI();
            game.entities[i].removeFromWorld = true;
            return;
        }
        else if (this.collide(game.entities[i]) && playerHealth <= 0) {
            console.log('already dead');
            this.state = 2;
            playerHealth = playerHealth - game.entities[i].damage;
            playerGold = playerGold + game.entities[i].reward;
            UpdateUI();
            game.entities[i].removeFromWorld = true;
        }
        else if (playerHealth > 0) {
            this.state = 0;
        }

    }

}


base.prototype.collide = function (monster) {
    var myCircle = { 'x': this.recenterBoundX(), 'y': this.recenterBoundY(), 'r': this.radius };
    var otherCirle = { 'x': monster.recenterBoundX(), 'y': monster.recenterBoundY(), 'r': monster.radius };
    var dx = myCircle.x - otherCirle.x;
    var dy = myCircle.y - otherCirle.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < myCircle.r + otherCirle.r);
}


//////////////////////////////////SPAWN MACHINE FOR MONSTERS
function spawner(game, spritesheet) {
    this.animation = new Animation(spritesheet, 50, 50, 1, 0.15, 1, true, 1);
    this.ctx = game.ctx;
    this.name = "spawner";
    this.gameEngine = game;
    this.radius = 25;
    this.index = 0;
    this.currentLevel = 0;
    this.levelSpawn = levels[this.currentLevel];
    this.time = this.gameEngine.timer.gameTime;
    Entity.call(this, game, spawnX, spawnY);
}

spawner.prototype = new Entity();
spawner.prototype.constructor = spawner;

spawner.prototype.update = function () {
    var time = this.gameEngine.timer.gameTime - this.time;
    if (this.index < this.levelSpawn.length) {
        var groundBaseHealth = 200;
        var flyingBaseHealth = 160;
        var bossBaseHealth = 2000;
        //game, spritesheet, level, type, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, padWidth, XBuffer, YBuffer, health, damage, radius, reward, speed
        if (this.levelSpawn[this.index] == '1' && time >= spawnInterval * this.index) {
            var temp = new Enemy(this.gameEngine, AM.getAsset("./img/monsters/level1ground_atk_walk__8fr_41w_34h_1pd.png"), level, 0, 40, 34, 328, 0.11, 8, true, 1.5, 1, 0, 0, groundBaseHealth, 10, 25, 2, 40, false);
            this.gameEngine.addEntity(temp);
            this.index = this.index + 1;

            
        } else if (this.levelSpawn[this.index] == '1-2' && time >= spawnInterval * this.index) {
            var temp = new SplitEnemy(this.gameEngine, AM.getAsset("./img/monsters/level1ground_atk_walk__8fr_41w_34h_1pd.png"), level, 0, 40, 34, 328, 0.11, 8, true, 1.5, 1, 0, 0, groundBaseHealth, 10, 25, 2, 40, false);
            this.gameEngine.addEntity(temp);
            this.index = this.index + 1;
        }else if (this.levelSpawn[this.index] == '2' && time >= spawnInterval * this.index) {
            var temp = new Enemy(this.gameEngine, AM.getAsset("./img/level1flying_132w_102h_1pd_8fr.png"), level, 0, 132, 102, 1064, 0.11, 8, true, .8, 1, 0, 0, flyingBaseHealth, 15, 25, 3, 45, false);
            this.gameEngine.addEntity(temp);
            this.index = this.index + 1;
        } else if (this.levelSpawn[this.index] == '3' && time >= spawnInterval * this.index) {
            var temp = new Enemy(this.gameEngine, AM.getAsset("./img/monsters/level1boss_walking_116w_134h_1pd_6fr.png"), level, 0, 116, 134, 702, 0.11, 6, true, 1, 1, 0, 0, bossBaseHealth, 50, 50, 50, 30, false);
            this.gameEngine.addEntity(temp);
            this.index = this.index + 1;
        } else if (this.levelSpawn[this.index] == '4' && time >= spawnInterval * this.index) {
            var temp = new Enemy(this.gameEngine, AM.getAsset("./img/monsters/level2ground_walking_134w_140h_1pd_6fr.png"), level, 0, 134, 140, 810, 0.11, 6, true, 1, 1, 0, 0, groundBaseHealth * 1.6, 15, 50, 3, 45, false);
            this.gameEngine.addEntity(temp);
            this.index = this.index + 1;
        } else if (this.levelSpawn[this.index] == '5' && time >= spawnInterval * this.index) {
            var temp = new Enemy(this.gameEngine, AM.getAsset("./img/monsters/level2flying_walking_95w_122h_1pd_8fr.png"), level, 0, 95, 122, 768, 0.11, 8, true, 1, 1, 0, 0, flyingBaseHealth * 1.6, 12, 50, 4, 55, false);
            this.gameEngine.addEntity(temp);
            this.index = this.index + 1;
        } else if (this.levelSpawn[this.index] == '6' && time >= spawnInterval * this.index) {
            var temp = new Enemy(this.gameEngine, AM.getAsset("./img/monsters/level2boss_walking_196w_163h_1pd_6fr.png"), level, 0, 196, 163, 1182, 0.11, 6, true, 1, 1, 0, 0, bossBaseHealth * 1.5, 30, 50, 60, 35, false);
            this.gameEngine.addEntity(temp);
            this.index = this.index + 1;
        } else if (this.levelSpawn[this.index] == '7' && time >= spawnInterval * this.index) {
            var temp = new Enemy(this.gameEngine, AM.getAsset("./img/monsters/level3ground_walking_119w_136h_1pd_8fr.png"), level, 0, 119, 136, 960, 0.11, 8, true, 1, 1, 0, 0, groundBaseHealth * 2.1, 15, 50, 4, 45, false);
            this.gameEngine.addEntity(temp);
            this.index = this.index + 1;
        } else if (this.levelSpawn[this.index] == '8' && time >= spawnInterval * this.index) {
            var temp = new Enemy(this.gameEngine, AM.getAsset("./img/monsters/level3_flying_walking_112w_133h_1pd_6fr.png"), level, 0, 112, 133, 678, 0.11, 6, true, 1, 1, 0, 0, flyingBaseHealth * 2.1, 12, 50, 5, 55, false);
            this.gameEngine.addEntity(temp);
            this.index = this.index + 1;
        } else if (this.levelSpawn[this.index] == '9' && time >= spawnInterval * this.index) {
            var temp = new Enemy(this.gameEngine, AM.getAsset("./img/monsters/level3boss_walking_86w_118h_6fr_1pd.png"), level, 0, 86, 118, 522, 0.11, 6, true, 1, 1, 0, 0, bossBaseHealth * 1.7, 40, 50, 70, 35, false);
            this.gameEngine.addEntity(temp);
            this.index = this.index + 1;
        } else if (this.levelSpawn[this.index] == '10' && time >= spawnInterval * this.index) {
            var temp = new Enemy(this.gameEngine, AM.getAsset("./img/monsters/level4ground_walking_170_127h_1pd_9fr.png"), level, 0, 170, 127, 1539, 0.11, 9, true, 1, 1, 0, 0, groundBaseHealth * 2.6, 15, 50, 5, 45, false);
            this.gameEngine.addEntity(temp);
            this.index = this.index + 1;
        } else if (this.levelSpawn[this.index] == '11' && time >= spawnInterval * this.index) {
            var temp = new Enemy(this.gameEngine, AM.getAsset("./img/monsters/level4_flying_171w_268h_1pd_7fr.png"), level, 0, 171, 268, 1204, 0.11, 7, true, 0.7, 1, 0, 0, flyingBaseHealth * 2.6, 170, 50, 5, 55, false);
            this.gameEngine.addEntity(temp);
            this.index = this.index + 1;
        } else if (this.levelSpawn[this.index] == '12' && time >= spawnInterval * this.index) {
            var temp = new Enemy(this.gameEngine, AM.getAsset("./img/monsters/level4boss_walk_150_217_1pd_8fr.png"), level, 0, 150, 217, 1208, 0.11, 8, true, 1, 1, 0, 0, bossBaseHealth * 1.9, 50, 50, 80, 35, false);
            this.gameEngine.addEntity(temp);
            this.index = this.index + 1;
        }
        
    }

    if (this.index >= this.levelSpawn.length) {
        if (!this.areMonstersAlive()) {
            this.nextLevel();
            level++;
            UpdateUI();
            alert("next level");

        }

    }

    Entity.prototype.update.call(this);
}

spawner.prototype.areMonstersAlive = function () {
    var i;
    for (i = 0; i < this.game.entities.length; i++) {
        if (this.game.entities[i].name == "enemy") {
            return true;
        }
    }
    return false;
}

spawner.prototype.nextLevel = function () {
    this.currentLevel++;
    //update htlm
    if (this.currentLevel < levels.length) {
        this.levelSpawn = levels[this.currentLevel];
        this.index = 0;
        this.time = this.gameEngine.timer.gameTime;
        spawnInterval = spawnInterval - (0.1 * this.currentLevel);
    } else {
        //go on to next map
    }
}

spawner.prototype.draw = function () {

    Entity.prototype.draw.call(this);
}

function Enemy(game, spritesheet, level, type, frameWidth, frameHeight, sheetWidth,
    frameDuration, frames, loop, scale, padWidth, XBuffer, YBuffer, health, damage, radius, reward, speed, isNewSpawn) {
    //this.animation = new Animation(spritesheet, 132, 102, 1064, 0.11, 8, true, .8,1);
    this.animation = new Animation(spritesheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, padWidth);
    this.speed = speed + (1 * level);
    this.spritesheet = spritesheet;
    this.ctx = game.ctx;
    this.game = game;
    this.health = health + (40 * level);
    this.damage = damage + (3 * level);
    this.type = type;
    this.radius = radius;
    this.boundX = 132;
    this.boundY = 102;
    this.reward = reward;
    this.isDead = 0;
    this.findX;
    this.findY;
    this.pathIsNotFound = true;
    this.name = "enemy";

    if (isNewSpawn) {
        Entity.call(this, game, XBuffer, YBuffer);
    } else {
        Entity.call(this, game, spawnX + XBuffer, spawnY + YBuffer);
    }
}



Enemy.prototype = new Entity();
Enemy.prototype.constructor = Enemy;

Enemy.prototype.collide = function (other) {
    var difX = this.x - other.x;
    var difY = this.y - other.y;
    return Math.sqrt(difX * difX + difY * difY) < this.radius + other.radius;
};
Enemy.prototype.update = function () {
    if (this.health <= 0 && this.isDead == 0) {
        this.isDead = 1;
        playerGold = playerGold + this.reward;
        UpdateUI();
        this.removeFromWorld = true;
    }
    if (this.isDead != 1) {
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent.name == "base") {
                if (this.collide(ent)) {
                    playerHealth = playerHealth - this.damage;
                    this.isDead = 1;
                    UpdateUI();
                }
            }
        }
        var currentXFrame = Math.floor((this.x) / (800 / map[0].length));
        var currentYFrame = Math.floor((this.y) / (700 / map.length));

        if (isNumber(map[currentYFrame][currentXFrame])) {
            if (isNumber(map[currentYFrame][currentXFrame + 1])) {
                if (parseInt(map[currentYFrame][currentXFrame + 1]) > parseInt(map[currentYFrame][currentXFrame]) || map[currentYFrame][currentXFrame + 1] == 'p') {
                    this.x += this.game.clockTick * this.speed;
                }

            }
            if (isNumber(map[currentYFrame][currentXFrame - 1])) {
                if (parseInt(map[currentYFrame][currentXFrame - 1]) > parseInt(map[currentYFrame][currentXFrame]) || map[currentYFrame][currentXFrame - 1] == 'p') {
                    this.x -= this.game.clockTick * this.speed;
                }

            }
            if (isNumber(map[currentYFrame - 1][currentXFrame])) {
                if (parseInt(map[currentYFrame - 1][currentXFrame]) > parseInt(map[currentYFrame][currentXFrame]) || map[currentYFrame - 1][currentXFrame] == 'p') {
                    this.y -= this.game.clockTick * this.speed;
                }


            } if (isNumber(map[currentYFrame + 1][currentXFrame])) {
                if (parseInt(map[currentYFrame + 1][currentXFrame]) > parseInt(map[currentYFrame][currentXFrame]) || map[currentYFrame + 1][currentXFrame] == 'p') {
                    this.y += this.game.clockTick * this.speed;
                }

            }
        } else {
            if (this.pathIsNotFound) {
                var directions = findPath(currentXFrame, currentYFrame);
                this.findX = directions[0];
                this.findY = directions[1];
                this.pathIsNotFound = false;
            } else {
                if (this.findX < currentXFrame) {
                    this.x -= this.game.clockTick * this.speed;
                } else if (this.findX > currentXFrame) {
                    this.x += this.game.clockTick * this.speed;
                }

                if (this.findY < currentYFrame) {
                    this.y -= this.game.clockTick * this.speed;
                } else if (this.findY > currentYFrame) {
                    this.y += this.game.clockTick * this.speed;
                }
            }
        }
        Entity.prototype.update.call(this);
    }
}

Enemy.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function findPath(currentXFrame, currentYFrame) {
    var i, j;
    var closestX, closestY, closestDistance = 9999;
    for (i = currentYFrame + 1; i < map.length; i++) {
        for (j = currentXFrame + 1; j < map[0].length; j++) {
            if (isNumber(map[i][j])) {
                var distance = Math.sqrt(Math.pow(j - currentXFrame, 2) + Math.pow(i - currentYFrame, 2));
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestX = j;
                    closestY = i;
                }

            }
        }
    }

    if (closestX && closestY) {
        return [closestX, closestY];
    } else {
        return [0, 0];
    }

}


function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}


//////////////////////////////////////////////////Splitting Enemy Code

function SplitEnemy(game, spritesheet, level, type, frameWidth, frameHeight, sheetWidth,
    frameDuration, frames, loop, scale, padWidth, XBuffer, YBuffer, health, damage, radius, reward, speed) {
    //this.animation = new Animation(spritesheet, 132, 102, 1064, 0.11, 8, true, .8,1);
    this.animation = new Animation(spritesheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, padWidth);
    this.speed = speed + (1 * level);
    this.direction = 1;//1 = right 2 = up, 3 = down, 4 = left
    this.spritesheet = spritesheet;
    this.level = level;
    this.type = type;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frameDuration = frameDuration;
    this.frames = frames;
    this.loop = loop;
    this.scale = scale;
    this.padWidth = padWidth;
    this.XBuffer = XBuffer;
    this.YBuffer = YBuffer;
    this.damage = damage + (3 * level);
    this.radius = radius;
    this.ctx = game.ctx;
    this.game = game;
    this.baseHealth = health + (40 * level);
    this.health = health + (40 * level);
    this.damage = damage + (3 * level);
    this.type = type;
    this.radius = radius;
    this.boundX = 132;
    this.boundY = 102;
    this.reward = reward;
    this.isDead = 0;
    this.name = "enemy";
    Entity.call(this, game, spawnX + XBuffer, spawnY + YBuffer);
}



SplitEnemy.prototype = new Entity();
SplitEnemy.prototype.constructor = SplitEnemy;

SplitEnemy.prototype.collide = function (other) {
    var difX = this.x - other.x;
    var difY = this.y - other.y;
    return Math.sqrt(difX * difX + difY * difY) < this.radius + other.radius;
};
SplitEnemy.prototype.update = function () {
    if (this.health <= 0 && this.isDead == 0) {
        this.isDead = 1;
        playerGold = playerGold + this.reward;
        UpdateUI();


        //game, spritesheet, level, type, frameWidth, frameHeight, sheetWidth,frameDuration, frames, loop, scale, padWidth, XBuffer, YBuffer, health, damage, radius, reward, speed
        //spawn one upwards

        var temp = new Enemy(this.game, this.spritesheet, level, this.type, this.frameWidth, this.frameHeight, this.sheetWidth, this.frameDuration,
            this.frames, this.loop, this.scale * 0.5, this.padWidth, this.x, this.y + (this.radius * 2), this.baseHealth / 4, this.damage,
            this.radius, this.reward, this.speed, true);
        this.game.addEntity(temp);
        //spawn one below

        var temp = new Enemy(this.game, this.spritesheet, level, this.type, this.frameWidth, this.frameHeight, this.sheetWidth, this.frameDuration,
            this.frames, this.loop, this.scale * 0.5, this.padWidth, this.x, this.y + (-this.radius * 2), this.baseHealth / 4, this.damage,
            this.radius, this.reward, this.speed, true);
        this.game.addEntity(temp);

        //spawn one to the left
        var temp = new Enemy(this.game, this.spritesheet, level, this.type, this.frameWidth, this.frameHeight, this.sheetWidth, this.frameDuration,
            this.frames, this.loop, this.scale * 0.5, this.padWidth, this.x + (this.radius * 2), this.y, this.baseHealth / 4, this.damage,
            this.radius, this.reward, this.speed, true);
        this.game.addEntity(temp);
        //spawn one to the right
        var temp = new Enemy(this.game, this.spritesheet, level, this.type, this.frameWidth, this.frameHeight, this.sheetWidth, this.frameDuration,
            this.frames, this.loop, this.scale * 0.5, this.padWidth, this.x + (-this.radius * 2), this.y, this.baseHealth / 4, this.damage,
            this.radius, this.reward, this.speed, true);
        this.game.addEntity(temp);
        //spawn one to the bottom left
        var temp = new Enemy(this.game, this.spritesheet, level, this.type, this.frameWidth, this.frameHeight, this.sheetWidth, this.frameDuration,
            this.frames, this.loop, this.scale * 0.5, this.padWidth, this.x + (this.radius * 2), this.y + (-this.radius * 2), this.baseHealth / 4, this.damage,
            this.radius, this.reward, this.speed, true);
        this.game.addEntity(temp);
        //spawn one to the bottom right
        var temp = new Enemy(this.game, this.spritesheet, level, this.type, this.frameWidth, this.frameHeight, this.sheetWidth, this.frameDuration,
            this.frames, this.loop, this.scale * 0.5, this.padWidth, this.x + (-this.radius * 2), this.y + (this.radius * 2), this.baseHealth / 4, this.damage,
            this.radius, this.reward, this.speed, true);
        this.game.addEntity(temp);
        //spawn one to the top left
        var temp = new Enemy(this.game, this.spritesheet, level, this.type, this.frameWidth, this.frameHeight, this.sheetWidth, this.frameDuration,
            this.frames, this.loop, this.scale * 0.5, this.padWidth, this.x + (-this.radius * 2), this.y + (-this.radius * 2), this.baseHealth / 3, this.damage,
            this.radius, this.reward, this.speed, true);
        this.game.addEntity(temp);
        //spawn one to the top right
        var temp = new Enemy(this.game, this.spritesheet, level, this.type, this.frameWidth, this.frameHeight, this.sheetWidth, this.frameDuration,
            this.frames, this.loop, this.scale * 0.5, this.padWidth, this.x + (this.radius * 2), this.y + (this.radius * 2), this.baseHealth / 3, this.damage,
            this.radius, this.reward, this.speed, true);
        this.game.addEntity(temp);

        //}

        //}
        this.removeFromWorld = true;
    }
    if (this.isDead != 1) {
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent.name == "base") {
                if (this.collide(ent)) {
                    playerHealth = playerHealth - this.damage;
                    this.isDead = 1;
                    UpdateUI();
                }
            }
        }
        var currentXFrame = Math.floor((this.x) / (800 / map[0].length));
        var currentYFrame = Math.floor((this.y) / (700 / map.length));
        if (isNumber(map[currentYFrame][currentXFrame])) {
            if (isNumber(map[currentYFrame][currentXFrame + 1])) {
                if (parseInt(map[currentYFrame][currentXFrame + 1]) > parseInt(map[currentYFrame][currentXFrame]) || map[currentYFrame][currentXFrame + 1] == 'p') {
                    this.x += this.game.clockTick * this.speed;
                }

            }
            if (isNumber(map[currentYFrame][currentXFrame - 1])) {
                if (parseInt(map[currentYFrame][currentXFrame - 1]) > parseInt(map[currentYFrame][currentXFrame]) || map[currentYFrame][currentXFrame - 1] == 'p') {
                    this.x -= this.game.clockTick * this.speed;
                }

            }
            if (isNumber(map[currentYFrame - 1][currentXFrame])) {
                if (parseInt(map[currentYFrame - 1][currentXFrame]) > parseInt(map[currentYFrame][currentXFrame]) || map[currentYFrame - 1][currentXFrame] == 'p') {
                    this.y -= this.game.clockTick * this.speed;
                }


            } if (isNumber(map[currentYFrame + 1][currentXFrame])) {
                if (parseInt(map[currentYFrame + 1][currentXFrame]) > parseInt(map[currentYFrame][currentXFrame]) || map[currentYFrame + 1][currentXFrame] == 'p') {
                    this.y += this.game.clockTick * this.speed;
                }

            }
        } else {
            var directions = findPath(currentXFrame, currentYFrame);
            if (directions[0] < currentXFrame) {
                this.x -= this.game.clockTick * this.speed;
            } else if (directions[0] > currentXFrame) {
                this.x += this.game.clockTick * this.speed;
            }

            if (directions[1] < currentYFrame) {
                this.y -= this.game.clockTick * this.speed;
            } else if (directions[1] > currentYFrame) {
                this.y += this.game.clockTick * this.speed;
            }
        }
        Entity.prototype.update.call(this);
    }

}

SplitEnemy.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

//////////////////////////////////////////////////End of Splitting enemy code






//////////////////////////////////////////////////Start of shrinking enemy

function ShrinkEnemy(game, spritesheet, level, type, frameWidth, frameHeight, sheetWidth,
    frameDuration, frames, loop, scale, padWidth, XBuffer, YBuffer, health, damage, radius, reward, speed, isNewSpawn) {
    //this.animation = new Animation(spritesheet, 132, 102, 1064, 0.11, 8, true, .8,1);
    this.animation = new Animation(spritesheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, padWidth);
    this.speed = speed + (1 * level);
    this.spritesheet = spritesheet;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frameDuration = frameDuration;
    this.frames = frames;
    this.loop = loop;
    this.scale = scale;
    this.padWidth = padWidth;
    this.ctx = game.ctx;
    this.game = game;
    this.baseHealth = health + (40 * level);
    this.health = health + (40 * level);
    this.damage = damage + (3 * level);
    this.type = type;
    this.radius = radius;
    this.boundX = 132;
    this.boundY = 102;
    this.reward = reward;
    this.isDead = 0;
    this.findX;
    this.findY;
    this.pathIsNotFound = true;
    this.threshold75 = true;
    this.threshold50 = true;
    this.threshold25 = true;
    this.name = "enemy";

    if (isNewSpawn) {
        Entity.call(this, game, XBuffer, YBuffer);
    } else {
        Entity.call(this, game, spawnX + XBuffer, spawnY + YBuffer);
    }
}



ShrinkEnemy.prototype = new Entity();
ShrinkEnemy.prototype.constructor = ShrinkEnemy;

ShrinkEnemy.prototype.collide = function (other) {
    var difX = this.x - other.x;
    var difY = this.y - other.y;
    return Math.sqrt(difX * difX + difY * difY) < this.radius + other.radius;
};
ShrinkEnemy.prototype.update = function () {
    if (this.health <= 0 && this.isDead == 0) {
        this.isDead = 1;
        playerGold = playerGold + this.reward;
        UpdateUI();
        this.removeFromWorld = true;
    }
    if (this.isDead != 1) {
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent.name == "base") {
                if (this.collide(ent)) {
                    playerHealth = playerHealth - this.damage;
                    this.isDead = 1;
                    UpdateUI();
                }
            }
        }
        var currentXFrame = Math.floor((this.x) / (800 / map[0].length));
        var currentYFrame = Math.floor((this.y) / (700 / map.length));

        if (isNumber(map[currentYFrame][currentXFrame])) {
            if (isNumber(map[currentYFrame][currentXFrame + 1])) {
                if (parseInt(map[currentYFrame][currentXFrame + 1]) > parseInt(map[currentYFrame][currentXFrame]) || map[currentYFrame][currentXFrame + 1] == 'p') {
                    this.x += this.game.clockTick * this.speed;
                }

            }
            if (isNumber(map[currentYFrame][currentXFrame - 1])) {
                if (parseInt(map[currentYFrame][currentXFrame - 1]) > parseInt(map[currentYFrame][currentXFrame]) || map[currentYFrame][currentXFrame - 1] == 'p') {
                    this.x -= this.game.clockTick * this.speed;
                }

            }
            if (isNumber(map[currentYFrame - 1][currentXFrame])) {
                if (parseInt(map[currentYFrame - 1][currentXFrame]) > parseInt(map[currentYFrame][currentXFrame]) || map[currentYFrame - 1][currentXFrame] == 'p') {
                    this.y -= this.game.clockTick * this.speed;
                }


            } if (isNumber(map[currentYFrame + 1][currentXFrame])) {
                if (parseInt(map[currentYFrame + 1][currentXFrame]) > parseInt(map[currentYFrame][currentXFrame]) || map[currentYFrame + 1][currentXFrame] == 'p') {
                    this.y += this.game.clockTick * this.speed;
                }

            }
        } else {
            if (this.pathIsNotFound) {
                var directions = findPath(currentXFrame, currentYFrame);
                this.findX = directions[0];
                this.findY = directions[1];
                this.pathIsNotFound = false;
            } else {
                if (this.findX < currentXFrame) {
                    this.x -= this.game.clockTick * this.speed;
                } else if (this.findX > currentXFrame) {
                    this.x += this.game.clockTick * this.speed;
                }

                if (this.findY < currentYFrame) {
                    this.y -= this.game.clockTick * this.speed;
                } else if (this.findY > currentYFrame) {
                    this.y += this.game.clockTick * this.speed;
                }
            }
        }

        if(this.health / this.baseHealth <= 0.75 && this.threshold75) {
            this.animation = new Animation(this.spritesheet, this.frameWidth, this.frameHeight, this.sheetWidth, this.frameDuration, this.frames, this.loop, this.scale - 0.1, this.padWidth);
            this.threshold75 = false;
            this.speed += 10;
        }
        if(this.health / this.baseHealth <= 0.50 && this.threshold50) {
            this.animation = new Animation(this.spritesheet, this.frameWidth, this.frameHeight, this.sheetWidth, this.frameDuration, this.frames, this.loop, this.scale - 0.2, this.padWidth);
            this.threshold50 = false;
            this.speed += 10;
        }
        if(this.health / this.baseHealth <= 0.25 && this.threshold25) {
            this.animation = new Animation(this.spritesheet, this.frameWidth, this.frameHeight, this.sheetWidth, this.frameDuration, this.frames, this.loop, this.scale - 0.3, this.padWidth);
            this.threshold25 = false;
            this.speed += 10;
        }
        Entity.prototype.update.call(this);
    }
}

ShrinkEnemy.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


//////////////////////////////////////////////////End of shrinking enemy

//////////////////////////////////////////////////GAME BOARD CODE, used for enemy path and placing towers
function GameBoard(game) {

    Entity.call(this, game, 0, 0);
    this.grid = false;
    this.game = game;
    this.player = 1;
    this.board = [];
    this.towerLocations = [];
    this.size = 25;
    this.offset = -65;
    for (var i = 0; i < map.length; i++) {
        this.board.push([]);
        this.towerLocations.push([]);
        for (var j = 0; j < map[0].length; j++) {
            this.board[i].push(0);
            this.towerLocations[i].push([]);
        }
    }
}

GameBoard.prototype = new Entity();
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.update = function () {
    if (this.game.click) {
        //var name = "tower" + this.game.click.y + this.game.click.x;
        var name = this.towerLocations[this.game.click.y][this.game.click.x];
        var i;
        for (i = 0; i < this.game.towersList.length; i++) {
            var temp = this.game.towersList[i];
            if (temp.name == name) {
                //this.game.towersList[i].type = 3;
                currentTower = this.game.towersList[i];
                displayTower(this.game.towersList[i]);
                document.getElementById("Sell").style.visibility = "visible";
                document.getElementById("Upgrade").style.visibility = "visible";
            }
        }

    }
    if (this.game.click && isBuilding != 0 && this.towerLocations[this.game.click.y][this.game.click.x]) {
        isBuilding = 0;
        var name = "tower" + this.game.click.y + this.game.click.x;
        if (towerType == 0) {

            var tempTower = new Tower(this.game, this.game.mouse.x * this.size, this.game.mouse.y * this.size + this.offset, towerType, name);
            //this.board[this.game.click.x][this.game.click.y] = tempTower;
            this.board[this.game.click.y][this.game.click.x] = tempTower;//the original click location

            this.towerLocations[this.game.click.y][this.game.click.x] = name;
            this.towerLocations[this.game.click.y][this.game.click.x + 1] = name;

            this.towerLocations[this.game.click.y - 1][this.game.click.x] = name;
            this.towerLocations[this.game.click.y - 1][this.game.click.x + 1] = name;

            this.towerLocations[this.game.click.y - 2][this.game.click.x] = name;
            this.towerLocations[this.game.click.y - 2][this.game.click.x + 1] = name;

            this.towerLocations[this.game.click.y - 3][this.game.click.x] = name;
            this.towerLocations[this.game.click.y - 3][this.game.click.x + 1] = name;

            this.towerLocations[this.game.click.y - 4][this.game.click.x] = name;
            this.towerLocations[this.game.click.y - 4][this.game.click.x + 1] = name;

            this.game.addTower(tempTower);
            playerGold = playerGold - arrowTowerPrice;
        } else if (towerType == 3) {
            var tempTower = new Tower(this.game, this.game.mouse.x * this.size, this.game.mouse.y * this.size + this.offset, towerType, name);
            //this.board[this.game.click.x][this.game.click.y] = tempTower;
            this.board[this.game.click.y][this.game.click.x] = tempTower;//the original click location
            this.towerLocations[this.game.click.y][this.game.click.x] = name;
            this.towerLocations[this.game.click.y][this.game.click.x + 1] = name;

            this.towerLocations[this.game.click.y - 1][this.game.click.x] = name;
            this.towerLocations[this.game.click.y - 1][this.game.click.x + 1] = name;

            this.towerLocations[this.game.click.y - 2][this.game.click.x] = name;
            this.towerLocations[this.game.click.y - 2][this.game.click.x + 1] = name;

            this.towerLocations[this.game.click.y - 3][this.game.click.x] = name;
            this.towerLocations[this.game.click.y - 3][this.game.click.x + 1] = name;

            this.towerLocations[this.game.click.y - 4][this.game.click.x] = name;
            this.towerLocations[this.game.click.y - 4][this.game.click.x + 1] = name;
            this.game.addTower(tempTower);
            playerGold = playerGold - cannonTowerPrice;
        } else if (towerType == 6) {
            var tempTower = new Tower(this.game, this.game.mouse.x * this.size, this.game.mouse.y * this.size + this.offset, towerType, name);
            //this.board[this.game.click.x][this.game.click.y] = tempTower;
            this.board[this.game.click.y][this.game.click.x] = tempTower;//the original click location
            this.towerLocations[this.game.click.y][this.game.click.x] = name;
            this.towerLocations[this.game.click.y][this.game.click.x + 1] = name;

            this.towerLocations[this.game.click.y - 1][this.game.click.x] = name;
            this.towerLocations[this.game.click.y - 1][this.game.click.x + 1] = name;

            this.towerLocations[this.game.click.y - 2][this.game.click.x] = name;
            this.towerLocations[this.game.click.y - 2][this.game.click.x + 1] = name;

            this.towerLocations[this.game.click.y - 3][this.game.click.x] = name;
            this.towerLocations[this.game.click.y - 3][this.game.click.x + 1] = name;

            this.towerLocations[this.game.click.y - 4][this.game.click.x] = name;
            this.towerLocations[this.game.click.y - 4][this.game.click.x + 1] = name;
            this.game.addTower(tempTower);
            playerGold = playerGold - magicTowerPrice;
        }
        UpdateUI();
    }
    Entity.prototype.update.call(this);
}

GameBoard.prototype.draw = function (ctx) {

    //make the game board draw the background yo.
    ctx.drawImage(AM.getAsset("./img/maps/Map002.png"), this.x, this.y, 800, 700);


    if (isBuilding == 1) {

        // draw mouse shadow
        if (this.game.mouse && towerType == 0) {
            ctx.save();
            ctx.globalAlpha = 0.5;
            ctx.drawImage(AM.getAsset("./img/towers/tower_a1_48w_107h.png"), this.game.mouse.x * this.size, this.game.mouse.y * this.size + this.offset, 48, 107);
            ctx.restore();
        }

        if (this.game.mouse && towerType == 3) {
            ctx.save();
            ctx.globalAlpha = 0.5;
            ctx.drawImage(AM.getAsset("./img/towers/tower_c1_48w_96h.png"), this.game.mouse.x * this.size, this.game.mouse.y * this.size + this.offset, 48, 107);
            ctx.restore();
        }

        if (this.game.mouse && towerType == 6) {
            ctx.save();
            ctx.globalAlpha = 0.5;
            ctx.drawImage(AM.getAsset("./img/towers/tower_m1_48w_102h.png"), this.game.mouse.x * this.size, this.game.mouse.y * this.size + this.offset, 48, 102);
            ctx.restore();
        }
    }


    Entity.prototype.draw.call(this);
}


function displayTower(tower) {

    document.getElementById("Damage").innerHTML = "Damage: " + tower.damage;
    document.getElementById("Level").innerHTML = "Level: " + tower.level;
    document.getElementById("FireRate").innerHTML = "Fire Rate: " + tower.fireRate;
    document.getElementById("UpgradeCost").innerHTML = "Upgrade Cost: " + tower.upgradeCost;
    document.getElementById("SellCost").innerHTML = "Sell Price: " + tower.sellCost;
}



function upgrade(tower) {
    if (tower.level >= 3 || tower.level == "max") {
        return;
    }

    if (playerGold >= tower.upgradeCost) {
        playerGold -= tower.upgradeCost;
        tower.type++;
        tower.damage += 10;
        tower.level++;
        tower.upgradeCost += (5 * tower.type);
        tower.sellCost += (30 * level) + (3 * towerType);
        if (tower.level >= 3) {
            tower.level = "max";
            tower.upgradeCost = "N/A"
        }
        tower.fireRate -= 0.05;
        tower.radius += 15;
        displayTower(tower);
        UpdateUI();

    } else {
        return;
    }

}

function sell(tower) {
    playerGold += tower.sellCost;

    tower.removeFromWorld = true;
    document.getElementById("Sell").style.visibility = "hidden";
    document.getElementById("Upgrade").style.visibility = "hidden";
    document.getElementById("Damage").innerHTML = "";
    document.getElementById("Level").innerHTML = "";
    document.getElementById("FireRate").innerHTML = "";
    document.getElementById("UpgradeCost").innerHTML = "";
    document.getElementById("SellCost").innerHTML = "";
    UpdateUI();
}


function setSpawnPoint() {
    for (i = 0; i < map.length; i++) {
        for (j = 0; j < map[0].length; j++) {
            var temp = map[i][j];
            if (temp == '0') {
                spawnX = j * 800 / map[0].length;
                spawnY = i * 700 / map.length;
            }
            if (temp == 'p') {
                baseX = j * 800 / map[0].length;
                baseY = i * 700 / map.length;
            }
        }
    }
}


function UpdateUI() {
    var gold = document.getElementById("Gold");
    gold.innerHTML = "$" + playerGold;

    var health = document.getElementById("Health");
    health.innerHTML = "" + playerHealth;
    var wave = document.getElementById("Wave");
    wave.innerHTML = "" + level;
    //do the same with the other tower buttons
    if (playerGold < arrowTowerPrice) {
        document.getElementById("ArrowTowerButton").disabled = true;
    }
    if (playerGold >= arrowTowerPrice) {
        document.getElementById("ArrowTowerButton").disabled = false;
    }

    if (playerGold < cannonTowerPrice) {
        document.getElementById("CannonTowerButton").disabled = true;
    }
    if (playerGold >= cannonTowerPrice) {
        document.getElementById("CannonTowerButton").disabled = false;
    }

    if (playerGold < magicTowerPrice) {
        document.getElementById("MagicTowerButton").disabled = true;
    }
    if (playerGold >= magicTowerPrice) {
        document.getElementById("MagicTowerButton").disabled = false;
    }


}


AM.queueDownload("./img/maps/Map002.png");
AM.queueDownload("./img/towers/tower_a1_48w_107h.png");
AM.queueDownload("./img/towers/tower_a2_48w_111h.png");
AM.queueDownload("./img/towers/tower_a3_48w_116h.png");
AM.queueDownload("./img/towers/cannon1.png");
AM.queueDownload("./img/towers/tower_c1_48w_96h.png");
AM.queueDownload("./img/towers/tower_c2_48w_96h.png");
AM.queueDownload("./img/towers/tower_c3_48w_100h.png");
AM.queueDownload("./img/towers/magic1.png");
AM.queueDownload("./img/towers/tower_m1_48w_102h.png");
AM.queueDownload("./img/towers/tower_m2_48w_102h.png");
AM.queueDownload("./img/towers/tower_m3_48w_108h.png");
AM.queueDownload("./img/level1flying_132w_102h_1pd_8fr.png");
AM.queueDownload("./img/crystal_standing_35w_84h_1pd_6fr.png");
AM.queueDownload("./img/hero/hero_battleidle_68w_93h_1pd_6fr.png");
AM.queueDownload("./img/hero/hero_attack_117w_161h_1pd_7fr.png");
AM.queueDownload("./img/hero/hero_battleidle_68w_93h_1pd_6fr.png");
AM.queueDownload("./img/hero/hero_cast_51w_96h_0pd_1fr.png");
AM.queueDownload("./img/hero/hero_hurt_2fr_die_4fr_74w_85h_1pd.png");
AM.queueDownload("./img/hero/hero_walk_e_54w_95h_1pd_8fr.png");
AM.queueDownload("./img/hero/hero_walk_n_41w_97h_1pd_8fr.png");
AM.queueDownload("./img/hero/hero_walk_ne_48w_96h_1pd_8fr.png");
AM.queueDownload("./img/hero/hero_walk_nw_48w_96h_1pd_8fr.png");
AM.queueDownload("./img/hero/hero_walk_s_42w_97h_1pd_8fr.png");
AM.queueDownload("./img/hero/hero_walk_se_50w_96h_1pd_8fr.png");
AM.queueDownload("./img/hero/hero_walk_sw_50w_96h_1pd_8fr.png");
AM.queueDownload("./img/hero/hero_walk_w_54w_95h_1pd_8fr.png");
AM.queueDownload("./img/crystal_death_54w_84h_1pd_21fr.png");
AM.queueDownload("./img/crystal_hurt_35w_84h_1pd_4fr.png");
AM.queueDownload("./img/towers/p_cannon_86w_86h_onFire_1fr_onHit1to10fr_1pd.png");
AM.queueDownload("./img/towers/p_arrow_6w_59h_1fr_0pd.png");
AM.queueDownload("./img/towers/p_magic_62w_75h_oncharge_1to7fr_onFire_7to10fr_1pd_.png");
AM.queueDownload("./img/crystal_hurt_35w_84h_1pd_4fr.png")


AM.queueDownload("./img/monsters/level1flying_132w_102h_1pd_8fr.png");
AM.queueDownload("./img/monsters/level1ground_atk_walk__8fr_41w_34h_1pd.png");
AM.queueDownload("./img/monsters/level1boss_walking_116w_134h_1pd_6fr.png");

AM.queueDownload("./img/monsters/level2boss_walking_196w_163h_1pd_6fr.png");
AM.queueDownload("./img/monsters/level2flying_walking_95w_122h_1pd_8fr.png");
AM.queueDownload("./img/monsters/level2ground_walking_134w_140h_1pd_6fr.png");


AM.queueDownload("./img/monsters/level3_flying_walking_112w_133h_1pd_6fr.png");
AM.queueDownload("./img/monsters/level3boss_walking_86w_118h_6fr_1pd.png");
AM.queueDownload("./img/monsters/level3ground_walking_119w_136h_1pd_8fr.png");

AM.queueDownload("./img/monsters/level4boss_walk_150_217_1pd_8fr.png");
AM.queueDownload("./img/monsters/level4ground_walking_170_127h_1pd_9fr.png");
AM.queueDownload("./img/monsters/level4_flying_171w_268h_1pd_7fr.png");






AM.queueDownload("./img/Enemy1walk.png");
AM.queueDownload("./img/runningcat.png");
AM.queueDownload("./img/guy.jpg");
AM.queueDownload("./img/base2.png");
AM.queueDownload("./img/enemy2.png");
AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    var gameBoard = new GameBoard(gameEngine);
    var hero = new Hero(gameEngine);
    gameEngine.addEntity(gameBoard);
    gameEngine.addTower(hero);
    gameEngine.init(ctx);

    gameEngine.start();
    setSpawnPoint();
    document.getElementById("ArrowTowerButton").addEventListener("click", createArrowTower);
    document.getElementById("CannonTowerButton").addEventListener("click", createCannonTower);
    document.getElementById("MagicTowerButton").addEventListener("click", createMagicTower);
    UpdateUI();
    gameEngine.addTower(new base(gameEngine));
    gameEngine.addEntity(new spawner(gameEngine, AM.getAsset("./img/base2.png")));
    document.getElementById("Sell").style.visibility = "hidden";
    document.getElementById("Upgrade").style.visibility = "hidden";

    console.log("All Done!");
});
