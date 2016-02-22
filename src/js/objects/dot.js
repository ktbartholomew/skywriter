var Dot = function (options) {
  this.top = options.top;
  this.left = options.left;
};

Dot.prototype.render = function (context) {
  context.fillStyle = 'rgba(255, 0, 255, 1)';
  context.fillRect(this.left - 1, this.top - 1, 2, 2);
};

module.exports = Dot;
