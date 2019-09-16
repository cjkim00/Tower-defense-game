//this script contains information for the towers

var gravityConstant = .0004;

function Tower(game, x, y, towerType, towerName) {
    this.x = game.mouse.x; ///game board coordinates
    this.y = game.mouse.y;
    this.boundX = 48;
    this.boundY = 220;
    this.radius = 110;
    this.game = game;
    this.ctx = game.ctx;
    this.type = towerType;
    this.fireRate = 0.5;
    this.level = 1;
    this.upgradeCost = 50 + (5 * towerType);
    this.sellCost = 15 + (30 * level) + (3 * towerType);
    this.target; //= new Enemy1(this.gameEngine, AM.getAsset("./img/level1flying_132w_102h_1pd_8fr.png"));
    this.targetIsSet = 0;
    this.damage = 17 + (3 * towerType);
    this.spawnTime = game.timer.gameTime;
    this.fireRateCount = 0;
    this.name = towerName;
    Entity.call(this, game, x, y);

}
Tower.prototype = new Entity();
Tower.prototype.constructor = Tower;

function createArrowTower() {
    isBuilding = 1;
    towerType = 0; //change value with each different tower
}
function createCannonTower() {
    isBuilding = 1;
    towerType = 3; //change value with each different tower
}

function createMagicTower() {
    isBuilding = 1;
    towerType = 6; //change value with each different tower
}
Tower.prototype = new Entity();
Tower.prototype.constructor = Tower;

Tower.prototype.update = function () {
    var time = this.game.timer.gameTime - this.spawnTime;
    if (time >= this.fireRate * this.fireRateCount) {
        this.checkCC(this.game);
        this.fireRateCount = this.fireRateCount + 1;
    }
    if (this.targetIsSet == 1) {
        if (this.target.isDead == 1 || !this.collide(this.target)) {
            this.targetIsSet = 0;
        }
    }

    if (this.targetIsSet != 0) {
        if (this.target.isDead == 1 || !this.collide(this.target)) {
            this.checkTarget(this.game);
        }
    }
    Entity.prototype.update.call(this);
}

Tower.prototype.draw = function () {
    tower[this.type].draw(this.game, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

//////////////Type of towers in an array of objects//////////////// 0 = arrow, 1 = cannon, 2 = magic
var tower = [
    {
        ////Arrow tower type
        animation: ArrowAnimate = new Animation(AM.getAsset("./img/towers/tower_a1_48w_107h.png"), 48, 107, 48, 0.05, 1, true, 1.0, 0),
        draw: function (game, ctx, x, y) {
            ArrowAnimate.drawFrame(game.clockTick, ctx, x, y)
        },


    },

    {
        ////Arrow tower type
        animation: ArrowAnimate2 = new Animation(AM.getAsset("./img/towers/tower_a2_48w_111h.png"), 48, 111, 48, 0.05, 1, true, 1.0, 0),
        draw: function (game, ctx, x, y) {
            ArrowAnimate2.drawFrame(game.clockTick, ctx, x, y)


        },


    },

    {
        ////Arrow tower type
        animation: ArrowAnimate3 = new Animation(AM.getAsset("./img/towers/tower_a3_48w_116h.png"), 48, 116, 48, 0.05, 1, true, 1.0, 0),
        draw: function (game, ctx, x, y) {
            ArrowAnimate3.drawFrame(game.clockTick, ctx, x, y)
        },
    },
    {
        ///Cannon tower type
        animation: CannonAnimate1 = new Animation(AM.getAsset("./img/towers/tower_c1_48w_96h.png"), 48, 107, 48, 0.05, 1, true, 1.0, 0),

        draw: function (game, ctx, x, y) {
            CannonAnimate1.drawFrame(game.clockTick, ctx, x, y)
        },
    },
    {
        ///Cannon tower type
        animation: CannonAnimate2 = new Animation(AM.getAsset("./img/towers/tower_c2_48w_96h.png"), 48, 107, 48, 0.05, 1, true, 1.0, 0),
        draw: function (game, ctx, x, y) {
            CannonAnimate2.drawFrame(game.clockTick, ctx, x, y)
        },
    },
    {
        ///Cannon tower type
        animation: CannonAnimate3 = new Animation(AM.getAsset("./img/towers/tower_c3_48w_100h.png"), 48, 107, 48, 0.05, 1, true, 1.0, 0),
        //cost: 25,
        //damage: 35,
        attack: function () {
        },
        draw: function (game, ctx, x, y) {
            CannonAnimate3.drawFrame(game.clockTick, ctx, x, y)
        },
    },
    {
        ////Magic tower type
        animation: MagicAnimate1 = new Animation(AM.getAsset("./img/towers/tower_m1_48w_102h.png"), 48, 102, 48, 0.05, 1, true, 1.0, 0),

        draw: function (game, ctx, x, y) {
            MagicAnimate1.drawFrame(game.clockTick, ctx, x, y)

        },
    },

    {
        ////Magic tower type
        animation: MagicAnimate2 = new Animation(AM.getAsset("./img/towers/tower_m2_48w_102h.png"), 48, 102, 48, 0.05, 1, true, 1.0, 0),

        draw: function (game, ctx, x, y) {
            MagicAnimate2.drawFrame(game.clockTick, ctx, x, y)

        },

    },

    {
        ////Magic tower type
        animation: MagicAnimate3 = new Animation(AM.getAsset("./img/towers/tower_m3_48w_108h.png"), 48, 108, 48, 0.05, 1, true, 1.0, 0),

        draw: function (game, ctx, x, y) {
            MagicAnimate3.drawFrame(game.clockTick, ctx, x, y)

        },
    }

];////////////////End list of tower types

////////////////////////////////////UTILITY FOR TOWERS

Tower.prototype.checkCC = function (game) {
    var that = this;
    for (var i = 2; i <= game.entities.length - 1; i++) {
        //alert(game.entities.length);
        if (this.collide(game.entities[i])) {
            if (game.entities[i].name == "enemy") {
                if (this.targetIsSet == 0 && game.entities[i].isDead == 0) { //if the tower has no target and the entity is not dead
                    this.target = game.entities[i];//set the new target
                    this.targetIsSet = 1;
                }

                if (this.target == game.entities[i]) {
                    //this is where we call a flag to fire
                    switch (this.type) {
                        case 0: //make arrow
                            var inTheKnee = new Arrow(that.game, that.x, that.y, that, game.entities[i]);
                            game.addTower(inTheKnee);
                            inTheKnee.fire = true;
                            break;
                        case 3: //make cannon
                            var boomBoom = new CannonBall(that.game, that.x, that.y, that, game.entities[i]);
                            game.addTower(boomBoom);
                            boomBoom.fire = true;

                            break;
                        case 6: //make magic
                            var theGathering = new Magic(that.game, that.x, that.y, that, game.entities[i]);
                            game.addTower(theGathering);
                            theGathering.fire = true;

                            break;

                    }
                     game.entities[i].health = game.entities[i].health - this.damage;            /////moved this to projectiles
                }
            }

        }
    }
}

Tower.prototype.checkTarget = function (game) {

    var furthestEntity, furthestDistance = -1;
    for (var i = 2; i <= game.entities.length - 1; i++) {
        if (this.collide(game.entities[i])) {
            var dist = this.getDistance(game.entities[i]);
            if (dist > furthestDistance) {
                furthestDistance = dist;
                furthestEntity = game.entities[i];
            }
        }
    }

    if (distance == -1) {
        this.targetIsSet = 0;
    } else {
        this.target = furthestEntity;
        this.targetIsSet = 1;
    }

}

Tower.prototype.collide = function (monster) {

    var myCircle = { 'x': this.recenterBoundX(), 'y': this.recenterBoundY(), 'r': this.radius };
    var otherCirle = { 'x': monster.recenterBoundX(), 'y': monster.recenterBoundY(), 'r': monster.radius };
    var dx = myCircle.x - otherCirle.x;
    var dy = myCircle.y - otherCirle.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < myCircle.r + otherCirle.r);
}

Tower.prototype.getDistance = function (monster) {
    var myCircle = { 'x': this.recenterBoundX(), 'y': this.recenterBoundY(), 'r': this.radius };
    var otherCirle = { 'x': monster.recenterBoundX(), 'y': monster.recenterBoundY(), 'r': monster.radius };
    var dx = myCircle.x - otherCirle.x;
    var dy = myCircle.y - otherCirle.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
}





////////////////////////////END UTILITY FOR TOWERS

/////////////////////////////////////////END 
//Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, padWidth)
//////////projectiles
function CannonBall(game, x, y, tower, monster) {
    this.game = game;
    this.fire = false;
    this.hit = false;
    this.done = false;
    this.x = x;
    this.y = y;
    this.boundX = 86;
    this.boundY = 86;
    this.radius = 21;
    this.towerInfo = tower;
    this.cTarget = monster;
    this.speed = 20;
    this.onFire = new Animation(AM.getAsset("./img/towers/p_cannon_86w_86h_onFire_1fr_onHit1to10fr_1pd.png"), 86, 86, 870, 1.1, 2, true, .5, 1);
    this.cannonCollidedWithMonster = new Animation(AM.getAsset("./img/towers/p_cannon_86w_86h_onFire_1fr_onHit1to10fr_1pd.png"), 86, 86, 870, 0.12, 10, false, 1, 1);
    Entity.call(this, game, x, y);
}

CannonBall.prototype = new Entity();
CannonBall.prototype.constructor = CannonBall;

CannonBall.prototype.update = function () {
    if (this.fire) {
        this.shooting();
    }
    if (this.hit) { 
    for (var i = 0; i <= this.game.entities.length - 1; i++) {
        if (this.collide(this.game.entities[i])) {
  
            this.game.entities[i].health = this.game.entities[i].health - this.towerInfo.damage;
        }
    }
}
    if (this.done) {
        this.reload();
    }

    Entity.prototype.update.call(this);
}


CannonBall.prototype.draw = function () {

    if (this.fire) {
        //animation to onFire
        this.onFire.drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y);
        if (this.hit) {
            this.cannonCollidedWithMonster.drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y);
            if (this.cannonCollidedWithMonster.isDone()) {
                this.done = true;
            }
        }
        //animation to explode at monster
        //onHit.isdone then set on fire flag back to false
    }
    Entity.prototype.draw.call(this);
}

CannonBall.prototype.shooting = function () {
    var dx = this.cTarget.x - this.x;
    var dy = this.cTarget.y - this.y;


    this.x += dx * this.game.clockTick * 2;
    this.y += dy * this.game.clockTick * 2;

    if (this.collide(this.cTarget)) {
        this.hit = true;
    }
};

CannonBall.prototype.reload = function () {
    this.fire = false;
    this.hit = false;
    this.done = false;
    this.removeFromWorld = true;
}

CannonBall.prototype.collide = function (monster) {

    var myCircle = { 'x': this.recenterBoundX(), 'y': this.recenterBoundY(), 'r': this.radius };
    var otherCirle = { 'x': monster.recenterBoundX(), 'y': monster.recenterBoundY(), 'r': monster.radius };
    var dx = myCircle.x - otherCirle.x;
    var dy = myCircle.y - otherCirle.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < myCircle.r + otherCirle.r);
}
//////////////////////////////////////////////////////// arrow bullet
function Arrow(game, x, y, tower, monster) {
    this.game = game;
    this.fire = false;
    this.hit = false;
    this.done = false;
    this.x = x;
    this.y = y;
    this.boundX = 6;
    this.boundY = 59;
    this.radius = 20;
    this.towerInfo = tower;
    this.cTarget = monster;
    this.totalDistance
    this.speed = 20;
    this.shootArrow = new Animation(AM.getAsset("./img/towers/p_arrow_6w_59h_1fr_0pd.png"), 6, 59, 59, 0.16, 1, true, 1, 0);

    Entity.call(this, game, x, y);
}
Arrow.prototype = new Entity();
Arrow.prototype.constructor = Arrow;

Arrow.prototype.update = function () {

    if (this.fire) {
        //look for the right angle
        var dy = this.cTarget.y - this.y;
        var dx = this.cTarget.x - this.x;

        var m = (dy / dx);

        var angle = Math.tan(m);
        m = m * 180 / Math.PI;


        this.rotateAndCache(this.shootArrow, angle);

        this.x += dx * 2 * this.game.clockTick * 2;
        this.y += dy * 2 * this.game.clockTick * 2;

        if (this.collide(this.cTarget)) {
            this.hit = true;
        }
    }
    if (this.hit) {
        //take out damage from target
        // game.entities[i].health = game.entities[i].health - this.damage;  
        this.cTarget.health = this.cTarget.health - this.towerInfo.damage;
        this.done = true;
    }
    if (this.done) {
        this.reload();
    }
    Entity.prototype.update.call(this);
}

Arrow.prototype.draw = function () {

    if (this.fire) {
        this.shootArrow.drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y);
    }

    Entity.prototype.draw.call(this);
}
Arrow.prototype.reload = function () {
    this.fire = false;
    this.hit = false;
    this.done = false;
    this.removeFromWorld = true;
}


Arrow.prototype.collide = function (monster) {

    var myCircle = { 'x': this.recenterBoundX(), 'y': this.recenterBoundY(), 'r': this.radius };
    var otherCirle = { 'x': monster.recenterBoundX(), 'y': monster.recenterBoundY(), 'r': monster.radius };
    var dx = myCircle.x - otherCirle.x;
    var dy = myCircle.y - otherCirle.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < myCircle.r + otherCirle.r);
}

///////////////////////////////////////////////MagicBolt
function Magic(game, x, y, tower, monster) {
    this.game = game;
    this.fire = false;
    this.blastOff = false;
    this.x = x;
    this.y = y;
    this.boundX = 62;
    this.boundY = 75;
    this.radius = 25;
    this.towerInfo = tower;
    this.cTarget = monster;
    this.totalDistance
    this.speed = 22;
    this.magicCharge = new Animation(AM.getAsset("./img/towers/p_magic_62w_75h_oncharge_1to7fr_onFire_7to10fr_1pd_.png"), 62, 75, 630, 0.16, 4, false, 1, 1);
    this.magicBolt = new Animation(AM.getAsset("./img/towers/p_magic_62w_75h_oncharge_1to7fr_onFire_7to10fr_1pd_.png"), 62, 75, 630, 0.16, 10, true, 1, 1);

    Entity.call(this, game, x -10, y -25);
}

Magic.prototype = new Entity();
Magic.prototype.constructor = Magic;

Magic.prototype.update = function () {

    if (this.fire) {
      
            this.x = this.x;
            this.y = this.y;
      
    }
    this.blastOff = true;

    if (this.blastOff) {
        var dx = this.cTarget.x - this.x;
        var dy = this.cTarget.y - this.y;

        this.x += dx * this.game.clockTick *this.speed/15;
        this.y += dy * this.game.clockTick *this.speed/15;

        for (var i = 0; i <= this.game.entities.length - 1; i++) {
            if (this.collide(this.game.entities[i])) {
                this.game.entities[i].health = this.game.entities[i].health - this.towerInfo.damage;
                this.reload();
            }
        }
    }
  
    if (this.x > 800 || this.x < 0 || this.y > 700 || this.y < 0) {
        this.reload();
    }
    Entity.prototype.update.call(this);
}

Magic.prototype.draw = function () {

    if (this.fire) {
        this.magicCharge.drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y);
       
    }
    if (this.blastOff) {
        this.magicBolt.drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}
Magic.prototype.reload = function () {
    this.fire = false;
    this.hit = false;
    this.done = false;
    this.removeFromWorld = true;
}



Magic.prototype.collide = function (monster) {

    var myCircle = { 'x': this.recenterBoundX(), 'y': this.recenterBoundY(), 'r': this.radius };
    var otherCirle = { 'x': monster.recenterBoundX(), 'y': monster.recenterBoundY(), 'r': monster.radius };
    var dx = myCircle.x - otherCirle.x;
    var dy = myCircle.y - otherCirle.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < myCircle.r + otherCirle.r);
}
