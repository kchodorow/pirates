goog.provide('pirates.Ocean');

goog.require('lime.Layer');

pirates.Ocean = function() {
    lime.Layer.call(this);

    var background = new lime.Sprite()
	.setFill(pirates.resources.getOcean()).setSize(WIDTH, HEIGHT)
	.setPosition(WIDTH/2, HEIGHT/2);
    this.appendChild(background);

    this.speed_ = pirates.resources.BOAT_SPEED.SLOW;
};

goog.inherits(pirates.Ocean, lime.Layer);

pirates.Ocean.prototype.step = function(dt_ms) {
    var dt = dt_ms/1000;
    var pos = this.getPosition();
    this.setPosition(pos.x, pos.y+this.speed_*dt);
};
