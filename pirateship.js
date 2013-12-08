goog.provide('pirates.PirateShip');

pirates.PirateShip = function(target) {
    lime.Sprite.call(this);

    this.setFill(pirates.resources.getPirateShip());
    this.target_ = target;

    // Get starting pos
    var padding = 50;
    var target_pos = this.target_.getPosition();
    var rand_x = lib.random(3) - 1;
    var pos_x = WIDTH/2+(WIDTH/2-padding*rand_x);
    var rand_y = lib.random(3) - 1;
    var pos_y = HEIGHT/2+(HEIGHT/2-padding*rand_x);
    this.setPosition(pos_x, pos_y);
};
goog.inherits(pirates.PirateShip, lime.Sprite);

pirates.PirateShip.prototype.step = function(dt) {
    var dist = pirates.resources.BOAT_SPEED.PIRATE*dt;
    var diff = goog.math.Coordinate.difference(
	this.target_.getPosition(), this.getPosition());

    var theta = Math.atan(diff.y/diff.x);
    var dist_y = Math.sin(theta)*dist;
    var dist_x = Math.cos(theta)*dist;

    // Hackity hack
    // If this distance between pos-delta and target is less than the distance
    // between pos+delta and target, use -dist.
    if (goog.math.Coordinate.distance(
            this.getPosition().translate(0, -dist_y), this.target_.getPosition()) <
	goog.math.Coordinate.distance(
	    this.getPosition().translate(0, dist_y), this.target_.getPosition())) {
	dist_y = -dist_y;
    }
    if (goog.math.Coordinate.distance(
            this.getPosition().translate(-dist_x, 0), this.target_.getPosition()) <
	goog.math.Coordinate.distance(
	    this.getPosition().translate(dist_x, 0), this.target_.getPosition())) {
	dist_x = -dist_x;
    }
    this.setPosition(this.getPosition().translate(dist_x, dist_y));
};
