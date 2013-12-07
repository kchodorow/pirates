goog.provide('pirates.Island');

pirates.Island = function() {
    lime.Sprite.call(this);


    this.setFill(pirates.resources.getIsland())
	.setSize(20, 20);
};

goog.inherits(pirates.Island, lime.Sprite);
