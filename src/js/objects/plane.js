var sprite = new Image();
sprite.src = './src/img/plane.png';

var deg2rad = function (degrees) {
  return degrees * Math.PI / 180;
};

var Plane = function (options) {
  this.top = options.top || 0;
  this.left = options.left || 0;
  this.rotation = Math.PI * 0.5;
  this.defer = true;
};

Plane.prototype.getStyle = function () {
  return {
    top: this.top - 32,
    left: this.left - 32,
    width: 64,
    height: 64,
    rotation: this.rotation
  };
};

Plane.prototype.render = function (context) {
  var style = this.getStyle();

  context.translate(style.left + style.width / 2, style.top + style.height / 2);
  context.rotate(style.rotation);
  context.drawImage(sprite, style.width / 2 * -1, style.height / 2 * -1, style.width, style.height);
};

module.exports = Plane;
