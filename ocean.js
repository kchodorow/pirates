goog.provide('pirates.Ocean');

goog.require('goog.events.KeyCodes');
goog.require('lime.Layer');

goog.require('pirates.Mine');

pirates.Ocean = function() {
    lime.Layer.call(this);
    this.ship_ = new pirates.Ship();
    this.setSize(pirates.Ocean.SIZE, pirates.Ocean.SIZE).setPosition(-500, -1200);

    this.tile_ = new lime.Sprite()
	.setFill(pirates.resources.getOcean())
	.setSize(pirates.Ocean.SIZE, pirates.Ocean.SIZE)
	.setPosition(pirates.Ocean.SIZE/2, pirates.Ocean.SIZE/2);
    this.appendChild(this.tile_);

    this.speed_ = pirates.resources.BOAT_SPEED.SLOW;

    this.ship_ = new pirates.Ship().setPosition(500+WIDTH/2, 1200+HEIGHT/2);
    this.appendChild(this.ship_);
    this.updateAnchorPoint();
};

goog.inherits(pirates.Ocean, lime.Layer);

// TODO: move to Level class.
pirates.Ocean.SIZE = 2048;

pirates.Ocean.prototype.setSpeed = function(speed) {
    this.speed_ = speed;
};

pirates.Ocean.prototype.updatePosition = function(dist) {
    var rot = this.getRotation();
    var pos = this.getPosition();
    var dist_x = Math.sin(goog.math.toRadians(rot)) * dist;
    var dist_y = Math.cos(goog.math.toRadians(rot)) * dist;
    this.setPosition(this.getPosition().translate(-dist_x, dist_y));
    this.ship_.setPosition(this.ship_.getPosition().translate(dist_x, -dist_y));

    this.updateAnchorPoint();

    this.target_.setRotation(-rot);
    this.ship_.ship_.setRotation(-rot);
};

pirates.Ocean.prototype.updateAnchorPoint = function() {
    this.setAnchorPoint(this.ship_.position_.x/pirates.Ocean.SIZE, 
			this.ship_.position_.y/pirates.Ocean.SIZE);
}

pirates.Ocean.prototype.addTarget = function(island) {
    this.target_ = island;
    this.ship_.setTarget(island)
    this.appendChild(island);
};

pirates.Ocean.prototype.add = function(thing) {
    this.appendChild(thing);
};

pirates.Ocean.prototype.step = function(dt, rot) {
    // Update heading.
    this.setRotation(rot);

    // Update position.
    this.updatePosition(dt * this.speed_);

    if (goog.math.Coordinate.distance(
	this.target_.getPosition(), this.ship_.getPosition()) < 44) {
	return true;
    }

    if (this.tile_.domElement) {
	goog.style.setStyle(this.tile_.domElement, 'background-size', '250px');
    }
};
