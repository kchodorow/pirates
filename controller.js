goog.provide('pirates.Controller');

goog.require('pirates.PirateShip');

pirates.Controller = function() {
    this.actors_ = [];
};

pirates.Controller.PIRATE_CHANCE = 1000;

pirates.Controller.prototype.addOcean = function(ocean) {
    this.ocean_ = ocean;
    this.addActor(ocean);
};

pirates.Controller.prototype.addActor = function(actor) {
    if (goog.DEBUG && !('step' in actor)) {
	throw "no step in "+actor;
    } 
    this.actors_.push(actor);
};

// dt in milliseconds
pirates.Controller.prototype.step = function(dt) {
    if (lib.random(pirates.Controller.PIRATE_CHANCE) == 0) {
	var ship = new pirates.PirateShip();
	this.ocean_.addShip(ship)
	this.actors_.push(ship);
    }

    var len = this.actors_.length;
    for (var i = 0; i < len; ++i) {
	this.actors_[i].step(dt);
    }
};
