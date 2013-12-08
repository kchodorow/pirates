goog.provide('pirates.Ocean');

goog.require('goog.events.KeyCodes');
goog.require('lime.Layer');

goog.require('pirates.Mine');

pirates.Ocean = function() {
    lime.Layer.call(this);
    this.setSize(pirates.Ocean.SIZE, pirates.Ocean.SIZE);

    this.tile_ = new lime.Sprite()
	.setFill(pirates.resources.getOcean())
	.setSize(pirates.Ocean.SIZE, pirates.Ocean.SIZE)
	.setPosition(pirates.Ocean.SIZE/2, pirates.Ocean.SIZE/2);
    this.appendChild(this.tile_);

    this.speed_ = pirates.resources.BOAT_SPEED.SLOW;
    this.heading_ = pirates.resources.HEADING.STRAIGHT;

    var anchor = this.getAnchorPoint();

    this.ship_ = new pirates.Ship().setPosition(WIDTH/2, HEIGHT/2);
    this.appendChild(this.ship_);
    this.updateAnchorPoint();

    goog.events.listen(this, ['keydown'], this.keydown);
    goog.events.listen(this, ['keyup'], this.keyup);
};

goog.inherits(pirates.Ocean, lime.Layer);

// TODO: move to Level class.
pirates.Ocean.SIZE = 2048;

pirates.Ocean.prototype.addMines = function() {
    this.mines_ = [];
    for (var i = 0; i < pirates.Mine.NUM; i++) {
	var mine = new pirates.Mine()
	    .setPosition(lib.random(pirates.Ocean.SIZE), lib.random(pirates.Ocean.SIZE));
	this.appendChild(mine);
	this.mines_.push(mine);
	mine.createDomElement();
        goog.style.setStyle(mine.domElement, 'visibility', 'hidden');
    }
};

pirates.Ocean.prototype.updatePosition = function(dist) {
    var rot = this.getRotation();
    var pos = this.getPosition();
    var dist_x = Math.sin(goog.math.toRadians(rot)) * dist;
    var dist_y = Math.cos(goog.math.toRadians(rot)) * dist;
    this.setPosition(this.getPosition().translate(-dist_x, dist_y));
    this.ship_.setPosition(this.ship_.getPosition().translate(dist_x, -dist_y));

    this.updateAnchorPoint();

    if (this.tile_.domElement) {
	goog.style.setStyle(this.tile_.domElement, 'background-size', '250px');
    }
};

pirates.Ocean.prototype.updateAnchorPoint = function() {
    this.setAnchorPoint(this.ship_.position_.x/pirates.Ocean.SIZE, 
			this.ship_.position_.y/pirates.Ocean.SIZE);
}

pirates.Ocean.prototype.keydown = function(e) {
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
	this.speed_ = pirates.resources.changeSpeed(this.speed_, 1);
	break;
    case goog.events.KeyCodes.DOWN:
    case goog.events.KeyCodes.S:
	this.speed_ = pirates.resources.changeSpeed(this.speed_, -1);
	break;
    case goog.events.KeyCodes.E:
	pirates.endOfGame();
    }
}

pirates.Ocean.prototype.keyup = function(e) {
    // TODO: add switch for multiple key pressses
    this.heading_ = 0;
};

pirates.Ocean.prototype.addTarget = function(island) {
    this.target_ = island;
    this.appendChild(island);
};

pirates.Ocean.prototype.addShip = function(ship) {

};

pirates.Ocean.prototype.step = function(dt) {
    // Update heading.
    var rot = this.getRotation();
    rot = rot+dt*this.heading_*10;
    this.setRotation(rot);

    // Update position.
    this.updatePosition(dt * this.speed_);

    // Check for mines
    for (var i = 0; i < this.mines_.length; i++) {
	var dist = goog.math.Coordinate.distance(
	    this.mines_[i].getPosition(), this.ship_.getPosition());
	if (dist < this.ship_.getMinDistance()) {
	    if (goog.math.Coordinate.distance(
		this.mines_[i].getPosition(), this.ship_.getPosition()) < 15) {
		pirates.endOfGame();
		return;
	    }
            goog.style.setStyle(
		this.mines_[i].domElement, 'visibility', 'visible');
	}

    }

    if (goog.math.Coordinate.distance(
	this.target_.getPosition(), this.ship_.getPosition()) < 44) {
	pirates.endOfGame();
    }
};
