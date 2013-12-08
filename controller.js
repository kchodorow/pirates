goog.provide('pirates.Controller');

goog.require('lime.scheduleManager');

goog.require('pirates.PirateShip');

pirates.Controller = function(scene) {
    this.scene_ = scene;
    this.actors_ = [];

    // Won't start until start() is done.
    lime.scheduleManager.schedule(this.step, this);
    this.addPauseButton();
};

pirates.Controller.PIRATE_CHANCE = 1000;

pirates.Controller.prototype.addPauseButton = function() {
    var controller = this;
    var pause = lib.label('Pause').setPosition(50, 50);
    this.scene_.appendChild(pause);
    this.paused_ = false;
    var toggle_pause = function(e) {
	this.paused_ = !this.paused_;
	if (this.paused_) {
	    lime.scheduleManager.unschedule(controller.step, controller);
	} else {
	    lime.scheduleManager.schedule(controller.step, controller);
	}
    };

    goog.events.listen(pause, ['keydown'], function(e) {
	if (e.event.keyCode == goog.events.KeyCodes.SPACE) {
	    toggle_pause();
	}
    });
    goog.events.listen(pause, ['mousedown','touchstart'], toggle_pause);
};

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
pirates.Controller.prototype.step = function(dt_ms) {
    var dt = dt_ms/1000;

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
