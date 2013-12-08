goog.provide('pirates.Ship');

goog.require('lime.Circle');

pirates.Ship = function() {
    lime.Sprite.call(this);

    this.warning_ = new lime.Circle().setFill('#0f0')
		     .setSize(pirates.Ship.SAFE_SIZE, pirates.Ship.SAFE_SIZE);
    this.appendChild(this.warning_);

    var ship = new lime.Sprite().setFill(pirates.resources.getShip())
	.setSize(pirates.Ship.size, pirates.Ship.size);
    this.appendChild(ship);
};
goog.inherits(pirates.Ship, lime.Sprite);

pirates.Ship.prototype.getMinDistance = function() {
    // Radius
    return this.warning_.getSize().width/2;
};

pirates.Ship.prototype.alert = function() {
    this.warning_.setFill('#f00');
};

pirates.Ship.prototype.standDown = function() {
    this.warning_.setFill('#0f0');
};

pirates.Ship.size = 20;
pirates.Ship.SAFE_SIZE = 176;

