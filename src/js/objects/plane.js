var sprite = new Image();
sprite.src = './src/img/plane.png';

var deg2rad = function (degrees) {
  return degrees * Math.PI / 180;
};

var Plane = function (options) {
  this.top = options.top;
  this.left = options.left;
};

Plane.prototype.getStyle = function () {
  return {
    top: this.top - 32,
    left: this.left - 32,
    width: 64,
    height: 64,
    rotation: deg2rad(45)
  };
};

Plane.prototype.render = function (context) {
  var style = this.getStyle();

  context.translate(style.left, style.top);
  context.rotate(style.rotation);
  context.drawImage(sprite, 0, 0, style.width, style.height);
};

module.exports = Plane;
