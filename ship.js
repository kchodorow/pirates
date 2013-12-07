goog.provide('pirates.Ship');

pirates.Ship = function() {
    lime.Sprite.call(this);

    this.setFill(pirates.resources.getShip())
	.setSize(pirates.Ship.size, pirates.Ship.size);
};

goog.inherits(pirates.Ship, lime.Sprite);

pirates.Ship.size = 20;

