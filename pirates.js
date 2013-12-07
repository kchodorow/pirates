//set main namespace
goog.provide('pirates');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.scheduleManager');

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
    scene.appendChild(ocean);
    controller.addActor(ocean);

    var player = new pirates.Ship();
    player.setPosition(WIDTH/2, 700);
    scene.appendChild(player);

    var target = new goog.math.Coordinate(lib.random(1024), 0);
    var island = new pirates.Island();
    island.setPosition(target);
    ocean.appendChild(island);

    director.makeMobileWebAppCapable();

    //add some interaction
    // goog.events.listen(target,['mousedown','touchstart'],function(e){

    //                        //animate
    //                        target.runAction(new lime.animation.Spawn(
    //                                             new lime.animation.FadeTo(.5).setDuration(.2),
    //                                             new lime.animation.ScaleTo(1.5).setDuration(.8)
    //                                         ));

    //                        title.runAction(new lime.animation.FadeTo(1));

    //                        //let target follow the mouse/finger
    //                        e.startDrag();

    //                        //listen for end event
    //                        e.swallow(['mouseup','touchend'],function(){
    //                                      target.runAction(new lime.animation.Spawn(
    //                                                           new lime.animation.FadeTo(1),
    //                                                           new lime.animation.ScaleTo(1),
    //                                                           new lime.animation.MoveTo(512,384)
    //                                                       ));

    //                                      title.runAction(new lime.animation.FadeTo(0));
    //                                  });


    //                    });

    // set current scene active
    director.replaceScene(scene);

};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('pirates.start', pirates.start);
