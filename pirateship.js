goog.provide('pirates.PirateShip');

pirates.PirateShip = function() {
    lime.Sprite.call(this);

    this.setFill(pirates.resources.getPirateShip());
};
goog.inherits(pirates.PirateShip, lime.Sprite);

pirates.PirateShip.prototype.step = function() {

};
