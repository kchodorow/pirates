goog.provide('pirates.Mine');
goog.provide('pirates.Box');

goog.require('lime.animation.FadeTo');

pirates.Mine = function() {
    lime.Sprite.call(this);

    this.setFill(pirates.resources.getMine());
};
goog.inherits(pirates.Mine, lime.Sprite);

pirates.Mine.prototype.blowup = function() {
    this.setFill(pirates.resources.getExplosion());
    this.runAction(new lime.animation.FadeTo(0));
}

pirates.Box = function() {
    lime.Sprite.call(this);

    this.setFill(pirates.resources.getBox()).setSize(44, 35);
};
goog.inherits(pirates.Box, lime.Sprite);

pirates.Box.prototype.collect = function() {
    this.getParent().removeChild(this);
}

pirates.Mine.NUM = pirates.Box.NUM = 200;
