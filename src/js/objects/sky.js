var sprite = new Image();
sprite.src = './src/img/sky.jpg';

module.exports = {
  render: function (context) {
    context.drawImage(sprite, 0, 0, window.innerWidth, window.innerHeight);
  }
};
