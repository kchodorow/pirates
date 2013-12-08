goog.provide('pirates.Controller');

goog.require('lime.scheduleManager');

goog.require('pirates.PirateShip');

pirates.Controller = function(scene) {
    this.scene_ = scene;
    this.actors_ = [];
    this.rotation_ = 0;
    this.heading_ = pirates.resources.HEADING.STRAIGHT;

    // Won't start until start() is done.
    lime.scheduleManager.schedule(this.step, this);
    goog.events.listen(this.scene_, ['keydown'], goog.bind(this.keydown, this));
    goog.events.listen(this.scene_, ['keyup'], goog.bind(this.keyup, this));
    this.addPauseButton();
};

pirates.Controller.PIRATE_CHANCE = 1000;

pirates.Controller.prototype.keydown = function(e) {
    switch (e.event.keyCode) {
    case goog.events.KeyCodes.LEFT:
    case goog.events.KeyCodes.A:
	this.heading_ = pirates.resources.HEADING.LEFT;
	break;
    case goog.events.KeyCodes.RIGHT:
    case goog.events.KeyCodes.D:
	this.heading_ = pirates.resources.HEADING.RIGHT;
	break;
    case goog.events.KeyCodes.UP:
    case goog.events.KeyCodes.W:
	this.ocean_.setSpeed(
	    pirates.resources.changeSpeed(this.ocean_.speed_, 1));
	break;
    case goog.events.KeyCodes.DOWN:
    case goog.events.KeyCodes.S:
	this.ocean_.setSpeed(
	    pirates.resources.changeSpeed(this.ocean_.speed_, -1));
	break;
    case goog.events.KeyCodes.SPACE:
	this.togglePaused();
	break;
    case goog.events.KeyCodes.E:
	pirates.endOfGame();
	break;
    }
}

pirates.Controller.prototype.keyup = function(e) {
    // TODO: add switch for multiple key pressses
    this.heading_ = pirates.resources.HEADING.STRAIGHT;
};

pirates.Controller.prototype.addPauseButton = function() {
    var pause = lib.label('Pause').setPosition(50, 50);
    this.scene_.appendChild(pause);
    this.paused_ = false;
    goog.events.listen(
	pause, ['mousedown','touchstart'], goog.bind(this.togglePaused, this));
};

pirates.Controller.prototype.togglePaused = function() {
    this.paused_ = !this.paused_;
    if (this.paused_) {
	lime.scheduleManager.unschedule(this.step, this);
    } else {
	lime.scheduleManager.schedule(this.step, this);
    }
}

pirates.Controller.prototype.addOcean = function(ocean) {
    this.ocean_ = ocean;
    this.ship_ = this.ocean_.ship_;
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
    this.rotation_ = this.rotation_+(dt*this.heading_*pirates.resources.ROT_SPEED);

    if (lib.random(pirates.Controller.PIRATE_CHANCE) == 0) {
	var ship = new pirates.PirateShip(this.ship_);
	this.ocean_.addShip(ship)
	this.actors_.push(ship);
    }

    var len = this.actors_.length;
    for (var i = 0; i < len; ++i) {
	this.actors_[i].step(dt, this.rotation_);
    }
};
