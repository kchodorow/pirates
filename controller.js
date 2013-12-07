goog.provide('pirates.Controller');

pirates.Controller = function() {
    this.actors_ = [];
};

pirates.Controller.prototype.addActor = function(actor) {
    if (goog.DEBUG && !('step' in actor)) {
	throw "no step in "+actor;
    } 
    this.actors_.push(actor);
};

// dt in milliseconds
pirates.Controller.prototype.step = function(dt) {
    var len = this.actors_.length;
    for (var i = 0; i < len; ++i) {
	this.actors_[i].step(dt);
    }
};
