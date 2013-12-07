goog.provide('pirates.data.Resources');

pirates.data.Resources = function() {

};

pirates.data.Resources.prototype.BOAT_SPEED = {
    SLOW: 30,
    MEDIUM: 60,
    PIRATE: 75,
    FAST: 90
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

