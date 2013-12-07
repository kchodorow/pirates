goog.provide('pirates.Ocean');

goog.require('goog.events.KeyCodes');

goog.require('lime.Layer');

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

    this.ship_ = new pirates.Ship().setPosition(WIDTH/2, 700);
    this.appendChild(this.ship_);
    this.updateAnchorPoint();

    goog.events.listen(this, ['keydown'], this.keydown);
    goog.events.listen(this, ['keyup'], this.keyup);
};

goog.inherits(pirates.Ocean, lime.Layer);

// TODO: move to Level class.
pirates.Ocean.SIZE = 2048;

pirates.Ocean.prototype.updatePosition = function(dist) {
    var rot = this.getRotation();
    var pos = this.getPosition();
    var dist_x = Math.sin(goog.math.toRadians(rot)) * dist;
    var dist_y = Math.cos(goog.math.toRadians(rot)) * dist;
    this.setPosition(this.getPosition().translate(-dist_x, dist_y));
    this.ship_.setPosition(this.ship_.getPosition().translate(dist_x, -dist_y));

    this.updateAnchorPoint();
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
	// TODO
    case goog.events.KeyCodes.DOWN:
    case goog.events.KeyCodes.S:
	// TODO
    }
}

pirates.Ocean.prototype.keyup = function(e) {
    // TODO: add switch for multiple key pressses
    this.heading_ = 0;
};

pirates.Ocean.prototype.step = function(dt_ms) {
    var dt = dt_ms/1000;

    // Update heading.
    var rot = this.getRotation();
    rot = rot+dt*this.heading_*10;
    this.setRotation(rot);

    // Update position.
    this.updatePosition(dt * this.speed_);
};
