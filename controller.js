goog.provide('pirates.Controller');

goog.require('lime.scheduleManager');

goog.require('pirates.PirateShip');

pirates.Controller = function(scene) {
    this.scene_ = scene;
    this.actors_ = [];
    this.rotation_ = 0;
    this.heading_ = pirates.resources.HEADING.STRAIGHT;

    this.first_pirate_ = true;

    // Won't start until start() is done.
    lime.scheduleManager.schedule(this.step, this);
    goog.events.listen(this.scene_, ['keydown'], goog.bind(this.keydown, this));
    goog.events.listen(this.scene_, ['keyup'], goog.bind(this.keyup, this));
};

pirates.Controller.PIRATE_CHANCE = 500;

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
    }
}

pirates.Controller.prototype.keyup = function(e) {
    // TODO: add switch for multiple key pressses
    this.heading_ = pirates.resources.HEADING.STRAIGHT;
};

pirates.Controller.prototype.addPauseButton = function() {
    var pause = new lime.Sprite().setFill(pirates.resources.getPause())
	.setPosition(100, 50).setSize(180, 100);
    pause.appendChild(lib.label('Pause'));
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
    this.addActor(this.ocean_);
    this.addActor(this.ship_);

    this.addMines();
};

pirates.Controller.prototype.addMines = function() {
    this.mines_ = [];
    for (var i = 0; i < pirates.Mine.NUM; i++) {
	var mine = new pirates.Mine()
	    .setPosition(lib.random(pirates.Ocean.SIZE), lib.random(pirates.Ocean.SIZE));
	this.ocean_.add(mine);
	this.mines_.push(mine);
	mine.createDomElement();
        goog.style.setStyle(mine.domElement, 'visibility', 'hidden');
    }

    this.box_ = [];
    for (var i = 0; i < pirates.Box.NUM; i++) {
	var box = new pirates.Box()
	    .setPosition(lib.random(pirates.Ocean.SIZE), lib.random(pirates.Ocean.SIZE));
	this.ocean_.add(box);
	this.box_.push(box);
	box.createDomElement();
        goog.style.setStyle(box.domElement, 'visibility', 'hidden');
    }
};

pirates.Controller.prototype.addCargo = function(cargo) {
    this.cargo_ = cargo;
    this.cargo_.setPosition(WIDTH-50, 50);
    this.scene_.appendChild(this.cargo_);
}

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
	if (this.first_pirate_) {
	    this.first_pirate_ = false;
	    var msg = pirates.tutorial.pirates();
	    this.scene_.appendChild(msg);
	    msg.runAction(new lime.animation.FadeTo(0).setDuration(5));
	}
	var ship = new pirates.PirateShip(this.ship_);
	this.ocean_.add(ship)
	this.actors_.push(ship);
    }

    // Check for mines
    for (var i = 0; i < this.mines_.length; i++) {
	var dist = goog.math.Coordinate.distance(
	    this.mines_[i].getPosition(), this.ship_.getPosition());
	if (dist < this.ship_.getMinDistance()) {
	    if (goog.math.Coordinate.distance(
		this.mines_[i].getPosition(), this.ship_.getPosition()) < 15) {
		var label = lib.label(pirates.resources.HIT_MINE)
		    .setRotation(-this.rotation_);
		this.ship_.appendChild(label);
		label.runAction(new lime.animation.Spawn(
		    new lime.animation.MoveBy(0, -88),
		    new lime.animation.FadeTo(0)));
		this.cargo_.changeQuantity(pirates.resources.HIT_MINE);
		this.mines_[i].blowup();
		goog.array.removeAt(this.mines_, i);
		break;
	    }
            goog.style.setStyle(
		this.mines_[i].domElement, 'visibility', 'visible');
	    this.mines_[i].setRotation(-this.rotation_);
	}
    }

    // Check for boxes
    for (var i = 0; i < this.box_.length; i++) {
	var dist = goog.math.Coordinate.distance(
	    this.box_[i].getPosition(), this.ship_.getPosition());
	if (dist < this.ship_.getMinDistance()) {
	    if (goog.math.Coordinate.distance(
		this.box_[i].getPosition(), this.ship_.getPosition()) < 44) {
		var label = lib.label("+"+pirates.resources.HIT_BOX)
		    .setRotation(-this.rotation_);
		this.ship_.appendChild(label);
		label.runAction(new lime.animation.Spawn(
		    new lime.animation.MoveBy(0, -88),
		    new lime.animation.FadeTo(0)));
		this.cargo_.changeQuantity(pirates.resources.HIT_BOX);
		this.box_[i].collect();
		goog.array.removeAt(this.box_, i);
		break;
	    }
            goog.style.setStyle(
		this.box_[i].domElement, 'visibility', 'visible');
	    this.box_[i].setRotation(-this.rotation_);
	}
    }

    var len = this.actors_.length;
    for (var i = 0; i < len; ++i) {
	var done = this.actors_[i].step(dt, this.rotation_);
	if (done) {
	    var game_over = 
		lib.label("You made it with "+this.cargo_.quantity_+" ice creams left!");
	    game_over.setPosition(WIDTH/2, 200);
	    this.scene_.appendChild(game_over);
	    this.togglePaused();
	}
    }
};
