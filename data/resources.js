goog.provide('pirates.data.Resources');

pirates.data.Resources = function() {
};

pirates.data.Resources.prototype.HEADING = {
    LEFT : -1, RIGHT: 1, STRAIGHT: 0
};

pirates.data.Resources.prototype.BOAT_SPEED = {
    DIFF: 10,
    STOPPED: 0,
    SLOW: 10,
    MEDIUM: 20,
    PIRATE: 25,
    FAST: 30
};

pirates.data.Resources.prototype.getOcean = function() {
    return '#00f';
};

pirates.data.Resources.prototype.getShip = function() {
    return '#bb2';
};

pirates.data.Resources.prototype.getIsland = function() {
    return '#0f0';
};

pirates.data.Resources.prototype.getMine = function() {
    return '#f00';
};

pirates.data.Resources.prototype.changeSpeed = function(speed, dir) {
    var change = dir * this.BOAT_SPEED.DIFF;
    var new_speed = speed+change;
    if (new_speed < this.BOAT_SPEED.STOPPED || 
	new_speed > this.BOAT_SPEED.FAST) {
	return speed;
    }
    return new_speed;
};
