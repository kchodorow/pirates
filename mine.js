goog.provide('pirates.Mine');

pirates.Mine = function() {
    lime.Sprite.call(this);

    this.setFill(pirates.resources.getMine());
};
goog.inherits(pirates.Mine, lime.Sprite);

pirates.Mine.prototype.blowup = function() {
    this.getParent().removeChild(this);
}

pirates.Mine.size = 20;
pirates.Mine.NUM = 200;


