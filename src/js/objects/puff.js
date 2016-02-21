var sprite = new Image();
sprite.src = './src/img/smoke-puff.png';

var deg2rad = function (degrees) {
  return degrees * Math.PI / 180;
};

var Puff = function (options) {
  this.created = new Date();
  this.age = 0;
  this.top = options.top;
  this.left = options.left;
  this.rotation = Math.floor(Math.random() * 360);
};

Puff.prototype.getStyle = function () {
  var alpha;

  if (this.age < 1000) {
    // build up for 1 second
    alpha = Math.min(this.age * 0.005, 1);
  } else if (this.age > 15000) {
    // start decaying after 10 seconds.
    alpha = Math.max(0, 15000 / this.age );
  } else {
    alpha = 1;
  }
  return {
    top: this.top,
    left: this.left,
    width: Math.min(this.age * 0.2, 64),
    height: Math.min(this.age * 0.2, 64),
    alpha: alpha,
    rotation: deg2rad(this.rotation)
  };
};

Puff.prototype.render = function (context) {
  this.age = new Date() - this.created;
  var style = this.getStyle();

  context.translate(style.left + style.width / 2, style.top + style.height / 2);

  context.rotate(style.rotation);
  context.globalAlpha = style.alpha;
  // context.fillStyle = 'rgba(200, 0, 200, 0.2)';
  // context.fillRect(style.width / 2 * -1, style.height / 2 * -1, style.width, style.height);

  context.drawImage(sprite, style.width / 2 * -1, style.height / 2 * -1, style.width, style.height);
};

module.exports = Puff;
