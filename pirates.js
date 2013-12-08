//set main namespace
goog.provide('pirates');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.scheduleManager');
goog.require('lime.transitions.SlideInDown');

goog.require('lib');
goog.require('pirates.data.Resources');
goog.require('pirates.data.Tutorial');
goog.require('pirates.data.Stats');

goog.require('pirates.Controller');
goog.require('pirates.Island');
goog.require('pirates.Ocean');
goog.require('pirates.Ship');

var WIDTH = 1024;
var HEIGHT = 768;

// entrypoint
pirates.start = function(){
    pirates.resources = new pirates.data.Resources();
    pirates.tutorial = new pirates.data.Tutorial();
    pirates.stats = new pirates.data.Stats();

    var controller = new pirates.Controller();
    lime.scheduleManager.schedule(controller.step, controller);

    var director = new lime.Director(document.body,1024,768);
    var scene = new lime.Scene();

    var ocean = new pirates.Ocean();
    controller.addActor(ocean);

    scene.appendChild(ocean);

    var target = new goog.math.Coordinate(lib.random(1024), 0);
    var island = new pirates.Island();
    island.setPosition(target);
    ocean.addTarget(island);
    ocean.addMines();

    var pause = lib.label('Pause').setPosition(50, 50);
    scene.appendChild(pause);
    this.paused = false;
    goog.events.listen(pause, ['mousedown','touchstart'], function(e) {
	this.paused = !this.paused;
	if (this.paused) {
	    lime.scheduleManager.unschedule(controller.step, controller);
	} else {
	    lime.scheduleManager.schedule(controller.step, controller);
	}
    });

    director.makeMobileWebAppCapable();

    // set current scene active
    director.replaceScene(scene);
    pirates.director = director;
};

pirates.endOfGame = function() {
    var scene = new lime.Scene().setSize(WIDTH, HEIGHT);
    var game_over = lib.label("Game Over");
    pos = lib.center(game_over, scene);
    game_over.setPosition(pos);

    scene.appendChild(game_over);
    pirates.director.replaceScene(scene, lime.transitions.SlideInDown);
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('pirates.start', pirates.start);
