goog.provide('pirates.Cargo');

pirates.Cargo = function() {
    lime.Sprite.call(this);

    this.quantity_ = 100;
    this.label_ = lib.label(this.quantity_);
    this.appendChild(this.label_);
};
goog.inherits(pirates.Cargo, lime.Sprite);

pirates.Cargo.prototype.changeQuantity = function(amount) {
    this.quantity_ += amount;
    if (this.quantity_ < 0) {
	this.quantity_ = 0;
    }
    this.label_.setText(this.quantity_);
};
