goog.provide('pirates.Island');

pirates.Island = function() {
    lime.Sprite.call(this);

    this.setFill(pirates.resources.getIsland());
};

goog.inherits(pirates.Island, lime.Sprite);
