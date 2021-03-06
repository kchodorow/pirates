goog.provide('pirates.data.Tutorial');

pirates.data.Tutorial = function() {
};

pirates.data.Tutorial.prototype.mission = function() {
    return lib.label('Mission: deliver your ice cream to the island.')
	.setPosition(WIDTH/2, 200);
};

pirates.data.Tutorial.prototype.pirates = function() {
    return lib.label('Jimmy Roger off the port bow!')
	.setPosition(WIDTH/2, 600);
};

pirates.data.Tutorial.prototype.directions = function() {
    var orig = FONT_SIZE;
    FONT_SIZE = 48;
    lib.label('Use the arrow keys:');
    var node = new lime.Node();
    var up = lib.label('Slower').setPosition(0, 50);
    var down = lib.label('Faster') .setPosition(0, -50);
    var left = lib.label('Right').setPosition(50, 0);
    var right = lib.label('Left').setPosition(-50, 0);

    node.appendChild(new lime.Sprite().setFill(pirates.resources.getArrow()).setPosition(10,0));
    node.appendChild(up);
    node.appendChild(down);
    node.appendChild(left);
    node.appendChild(right);

    FONT_SIZE = orig;
    return node;
};

