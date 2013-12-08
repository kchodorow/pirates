goog.provide('pirates.data.Resources');

goog.require('lime.parser.JSON');
goog.require('lime.ASSETS.pirates.json');
goog.require('lime.SpriteSheet');

FONT_COLOR = '#fff';

pirates.data.Resources = function() {
    this.spriteSheet_ = new lime.SpriteSheet(
        'assets/pirates.png', lime.ASSETS.pirates.json, lime.parser.JSON);
};

pirates.data.Resources.prototype.HIT_MINE = -5;

pirates.data.Resources.prototype.HEADING = {
    LEFT : -1, RIGHT: 1, STRAIGHT: 0
};

pirates.data.Resources.prototype.ROT_SPEED = 30;

pirates.data.Resources.prototype.BOAT_SPEED = {
    DIFF: 10,
    STOPPED: 0,
    SLOW: 10,
    PIRATE: 15,
    MEDIUM: 20,
    FAST: 30
};

pirates.data.Resources.prototype.getOcean = function() {
    return this.spriteSheet_.getFrame('water.png');
};

pirates.data.Resources.prototype.getShip = function() {
    return this.spriteSheet_.getFrame('ship.png');
};

pirates.data.Resources.prototype.getIsland = function() {
    return this.spriteSheet_.getFrame('island.png');
};

pirates.data.Resources.prototype.getMine = function() {
    return this.spriteSheet_.getFrame('mine.png');
};

pirates.data.Resources.prototype.getPirateShip = function() {
    return this.spriteSheet_.getFrame('ship.png');
};

//smoop
pirates.data.Resources.prototype.changeSpeed = function(speed, dir) {
    var change = dir * this.BOAT_SPEED.DIFF;
    var new_speed = speed+change;
    if (new_speed < this.BOAT_SPEED.STOPPED || 
	new_speed > this.BOAT_SPEED.FAST) {
	return speed;
    }
    return new_speed;
};
