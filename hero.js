//this script contains the functions for the hero to use on the canvas
// var AM = new AssetManager();
var gameBoard2CanvasConversion = 25;
var currentMoveObj = [];
var movingByMouse = false;
var movingByKey = false;
var keyFired = false;
var isAttack = false;

//map of booleans for walking directions
var actionMap = new Map([

    ['n', false],
    ['ne', false],
    ['e', false],
    ['se', false],
    ['s', false],
    ['sw', false],
    ['w', false],
    ['nw', false],

    // hurt : false,
    // dead : false,
    // attack : false,
    // cast : false
]);

////this function contains information about the hero, health, speed, animation
function Hero(game) {
    this.speed = 60;
    this.hp = 100;
    this.game = game;
    this.ctx = game.ctx;
    this.radius = 50;
    this.boundX = 68;
    this.boundY = 93;
    this.x;
    this.y; 
    this.oldX;
    this.oldY;
    this.healCoolDown = 100;
  
    this.fireRate = 0.5;
    this.fireRateCount = 0;
    this.target;
    this.targetIsSet = 0;
    this.damage = 25;
    this.spawnTime = game.timer.gameTime;


    //action animations
    this.animation = new Animation(AM.getAsset("./img/hero/hero_battleidle_68w_93h_1pd_6fr.png"), 68, 93, 414, 0.12, 6, true, 1, 1);
    this.anim_n = new Animation(AM.getAsset("./img/hero/hero_walk_n_41w_97h_1pd_8fr.png"), 41, 97, 336, 0.12, 8, true, 1, 1);
    this.anim_ne = new Animation(AM.getAsset("./img/hero/hero_walk_ne_48w_96h_1pd_8fr.png"), 48, 96, 392, 0.12, 8, true, 1, 1);
    this.anim_e = new Animation(AM.getAsset("./img/hero/hero_walk_e_54w_95h_1pd_8fr.png"), 54, 95, 440, 0.12, 8, true, 1, 1);
    this.anim_se = new Animation(AM.getAsset("./img/hero/hero_walk_se_50w_96h_1pd_8fr.png"), 50, 96, 408, 0.12, 8, true, 1, 1);
    this.anim_s = new Animation(AM.getAsset("./img/hero/hero_walk_s_42w_97h_1pd_8fr.png"), 42, 97, 344, 0.12, 8, true, 1, 1);
    this.anim_sw = new Animation(AM.getAsset("./img/hero/hero_walk_sw_50w_96h_1pd_8fr.png"), 50, 96, 404, 0.12, 8, true, 1, 1);
    this.anim_w = new Animation(AM.getAsset("./img/hero/hero_walk_w_54w_95h_1pd_8fr.png"), 54, 95, 440, 0.12, 8, true, 1, 1);
    this.anim_nw = new Animation(AM.getAsset("./img/hero/hero_walk_nw_48w_96h_1pd_8fr.png"), 48, 96, 392, 0.12, 8, true, 1, 1);
    this.anim_hurt = new Animation(AM.getAsset("./img/hero/hero_hurt_2fr_die_4fr_74w_85h_1pd.png"), 74, 85, 300, 0.12, 2, false, 1, 1);
    this.anim_dead = new Animation(AM.getAsset("./img/hero/hero_hurt_2fr_die_4fr_74w_85h_1pd.png"), 74, 85, 300, 0.12, 4, false, 1, 1);
    this.anim_attack = new Animation(AM.getAsset("./img/hero/hero_attack_117w_161h_1pd_7fr.png"), 117, 161, 826, 0.12, 7, true, 1, 1);
    this.anim_cast = new Animation(AM.getAsset("./img/hero/hero_cast_51w_96h_0pd_1fr.png"), 51, 96, 51, .9, 2, false, 1, 0);

    Entity.call(this, game, 250, 300);
}

Hero.prototype = new Entity();
Hero.prototype.constructor = Hero;


////////////////////////UTILITY STUFF FOR HERO////////////////////

//find distance between two point objects
function calcDist(p1x, p1y, p2x, p2y) {
    var result;

    var dx = p2x - p1x;
    var dy = p2y - p1y;
    result = Math.sqrt(dx * dx + dy * dy)
    return (result);
}
//reset the direction of the hero
function resetDirections(value, key, map) {

    if (map.get(key) == true) {
        map.set(key, false);
    }
}


//sets boolean flag for direction animation and returns an array of points
//to move the hero
function makeMovementInfo(currentX, currentY, mouseX, mouseY, speed) {

    //currentX and currentY contains canvas coordinates
    //mouseX and mouseY contain mouse clicks on the gameBoard, which needs conversion to canvas.
    var nextX = mouseX * gameBoard2CanvasConversion;
    var nextY = mouseY * gameBoard2CanvasConversion;


    var dx = currentX - nextX; //keep dx and dy as neg and pos
    var dy = currentY - nextY; //for direction animation.

    var ddx = nextX - currentX; //use these for getting intervals
    var ddy = nextY - currentY;

    if (dx == 0 && dy > 0) {
        actionMap.set("n", true);
    }
    if (dx == 0 && dy < 0) {
        actionMap.set("s", true);
    }
    if (dx < 0 && dy == 0) {
        actionMap.set("e", true);
    }
    if (dx > 0 && dy == 0) {
        actionMap.set("w", true);
    }
    if (dx > 0 && dy > 0) {
        actionMap.set("nw", true);
    }
    if (dx < 0 && dy < 0) {
        actionMap.set("se", true);
    }
    if (dx < 0 && dy > 0) {
        actionMap.set("ne", true);
    }
    if (dx > 0 && dy < 0) {
        actionMap.set("sw", true);
    }
    var length = Math.sqrt(ddx * ddx + ddy * ddy);

    var moveObj = [];

    var incrementX = ddx / speed;
    var incrementY = ddy / speed;

    moveObj.push({
        'mX': incrementX,
        'mY': incrementY,
        'newX': nextX,
        'newY': nextY,
        'dist': length
    });
    return (moveObj);
}

Hero.prototype.moveUp = function () {
    actionMap.set('n', true);
}
Hero.prototype.moveLeft = function () {
    actionMap.set("w", true);
}
Hero.prototype.moveDown = function () {
    actionMap.set("s", true);
}
Hero.prototype.moveRight = function () {
    actionMap.set("e", true);
}
           
 
Hero.prototype.checkKeyUp = function (e) {
    switch (e) {
        case 87: //w
            
            actionMap.set("n", false);
            break;
        case 65: //a
            
            actionMap.set("w", false);
            break;
        case 83: //s
            
            actionMap.set("s", false);
            break;
        case 68: //d
            actionMap.set("e", false);
            break;
        default:
            return;
    }
}


////////////////////UPDATE HERO
Hero.prototype.update = function () {

    if (this.game.click && isBuilding != 1 && !movingByKey) { 
        isAttack = false;
        movingByMouse = true;//after mouse click
        movingByKey = false; //cancel movement by wasd
        this.oldX = this.x;
        this.oldY = this.y;
        currentMoveObj = makeMovementInfo(this.x, this.y, this.game.mouse.x, this.game.mouse.y, this.speed);
    } 
    if (movingByMouse && !movingByKey) { 
        isAttack = false;
        this.x += currentMoveObj[0].mX;
        this.y += currentMoveObj[0].mY;

        if(calcDist(this.oldX, this.oldY, this.x, this.y) >= currentMoveObj[0].dist) {
            movingByMouse = false;
            //stopped moving , go back to idle animation
            actionMap.forEach(resetDirections);
             //clear list of moveObj
             currentMoveObj.splice(0,currentMoveObj.length);
        }
    }
    if (movingByKey && !movingByMouse) {
        if (actionMap.get('n')) {
            this.y += -2;
        }else if (actionMap.get('s')) {
            this.y += 2;
        } else if (actionMap.get('w')) {
            this.x += -2;
        } else if (actionMap.get('e')) {
            this.x += 2;
        }
      
    }

    if (!movingByMouse && !movingByKey) {
        actionMap.forEach(resetDirections);
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
    }
    Entity.prototype.update.call(this);

}
///////////////////////////////END UPDATE
/////////////////////SKILLS

Hero.prototype.skillHeal = function () {
 

}
Hero.prototype.skillFire = function () {

}
Hero.prototype.skillThunder = function () {

}
Hero.prototype.skillIce = function () {

}



/////////////////////END SKILLS

/////////////////////DRAW HERO


Hero.prototype.draw = function (ctx) {

    if (isAttack) {
        this.anim_attack.drawFrame(this.game.clockTick,ctx, this.x - 35, this.y- 52);
    }

    if (actionMap.get('n')) {
        this.anim_n.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    }

    if (actionMap.get('ne')) {
        this.anim_ne.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    }

    if (actionMap.get('e')) {
        this.anim_e.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    }

    if (actionMap.get('se')) {
        this.anim_se.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    }

    if (actionMap.get('s')) {
        this.anim_s.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    }
    if (actionMap.get('sw')) {
        this.anim_sw.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    }

    if (actionMap.get('w')) {
        this.anim_w.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    }

    if (actionMap.get('nw')) {
        this.anim_nw.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    } 
    if (!movingByMouse && !movingByKey && !isAttack) {
        
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
   
    Entity.prototype.draw.call(this);
}
/////////////////////////////END DRAW

////////////////////////////////////UTILITY FOR HERO

Hero.prototype.checkCC = function (game) {
    for (var i = 2; i <= game.entities.length - 1; i++) {
        //alert(game.entities.length);
        if (this.collide(game.entities[i])) { 
            isAttack = true;
            if (game.entities[i].name == "enemy") {
                if (this.targetIsSet == 0 && game.entities[i].isDead == 0) { //if the tower has no target and the entity is not dead
                   
                    this.target = game.entities[i];//set the new target
                    this.targetIsSet = 1;
                }

                if (this.target == game.entities[i]) {
                    console.log(game.entities[i].health);
                    game.entities[i].health = game.entities[i].health - this.damage;
                    console.log(game.entities[i].health);
                }
            }
            
            console.log('towers for days!');
        }
    }
}

Hero.prototype.checkTarget = function (game) {

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

Hero.prototype.collide = function (monster) {

    var myCircle = { 'x': this.recenterBoundX(), 'y': this.recenterBoundY(), 'r': this.radius };
    var otherCirle = { 'x': monster.recenterBoundX(), 'y': monster.recenterBoundY(), 'r': monster.radius };
    var dx = myCircle.x - otherCirle.x;
    var dy = myCircle.y - otherCirle.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < myCircle.r + otherCirle.r);
}

Hero.prototype.getDistance = function (monster) {
    var myCircle = { 'x': this.recenterBoundX(), 'y': this.recenterBoundY(), 'r': this.radius };
    var otherCirle = { 'x': monster.recenterBoundX(), 'y': monster.recenterBoundY(), 'r': monster.radius };
    var dx = myCircle.x - otherCirle.x;
    var dy = myCircle.y - otherCirle.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
}



//////////////////////////////////////////////END UTILITY STUFF

