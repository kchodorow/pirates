goog.provide('pirates.Ship');

goog.require('lime.Circle');

pirates.Ship = function() {
    lime.Sprite.call(this);

    this.warning_ = new lime.Circle().setFill('#0f0')
	.setSize(pirates.Ship.SAFE_SIZE, pirates.Ship.SAFE_SIZE);
    this.warning_.opacity_ = .2;
    this.appendChild(this.warning_);

    this.ship_ = new lime.Sprite().setFill(pirates.resources.getShip());
    this.appendChild(this.ship_);

    this.marker_ = new lime.Sprite().setFill(pirates.resources.getIsland())
	.setSize(20, 20);
    this.appendChild(this.marker_);
    this.done_ = false;

    this.createDomElement();
    goog.style.setStyle(this.domElement, 'z-index', 2);
};
goog.inherits(pirates.Ship, lime.Sprite);

pirates.Ship.prototype.getMinDistance = function() {
    // Radius
    return this.warning_.getSize().width/2;
};

pirates.Ship.prototype.setTarget = function(target) {
    this.target_ = target;
};

pirates.Ship.prototype.step = function(dt, rot) {
    if (this.done_ || goog.math.Coordinate.distance(
	this.target_.getPosition(), this.getPosition()) < 200) {
	this.removeChild(this.marker_);
	this.marker_ = null;
	this.done_ = true;
	return;
    }

    var diff = goog.math.Coordinate.difference(
	this.target_.getPosition(), this.getPosition());
    var vec = new goog.math.Vec2(diff.x, diff.y);
    vec.normalize().scale(pirates.Ship.MARKER_DIST);
    this.marker_.setPosition(vec.x, vec.y);
};

pirates.Ship.size = 20;
pirates.Ship.SAFE_SIZE = 250;
pirates.Ship.MARKER_DIST = 200;

