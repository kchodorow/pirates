goog.provide('pirates.Mine');

pirates.Mine = function() {
    lime.Sprite.call(this);

    this.setFill(pirates.resources.getMine())
	.setSize(pirates.Mine.size, pirates.Mine.size);
};

goog.inherits(pirates.Mine, lime.Sprite);

pirates.Mine.size = 20;
pirates.Mine.NUM = 200;


