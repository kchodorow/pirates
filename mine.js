goog.provide('pirates.Mine');
goog.provide('pirates.Box');

pirates.Mine = function() {
    lime.Sprite.call(this);

    this.setFill(pirates.resources.getMine());
};
goog.inherits(pirates.Mine, lime.Sprite);

pirates.Mine.prototype.blowup = function() {
    this.getParent().removeChild(this);
}

pirates.Box = function() {
    lime.Sprite.call(this);

    this.setFill(pirates.resources.getBox()).setSize(20, 20);
};
goog.inherits(pirates.Box, lime.Sprite);

pirates.Box.prototype.collect = function() {
    this.getParent().removeChild(this);
}

pirates.Mine.NUM = pirates.Box.NUM = 200;
