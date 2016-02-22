var Canvas = {};

Canvas.init = function () {
  this.container = document.getElementById('canvas');
  this.el = document.createElement('canvas');
  this.context = this.el.getContext('2d');
  this.contents = [];

  this.size = {
    width: function () {
      return window.innerWidth;
      // return 1280;
    },
    height: function () {
      return window.innerHeight;
      // return 720;
    }
  };

  this.updateSize();
  this.container.appendChild(this.el);
  this.render();

  window.addEventListener('resize', function (e) {
    this.updateSize();
  }.bind(this));
};

Canvas.updateSize = function () {
  this.el.width = this.size.width();
  this.el.height = this.size.height();
};

Canvas.render = function () {
  requestAnimationFrame(function () {
    this.context.clearRect(0,0, this.size.width(), this.size.height());
    var deferred = [];

    this.contents.forEach(function (item) {
      this.context.save();
      if (item.defer) {
        return deferred.push(item);
      }

      item.render(this.context);
      this.context.restore();
    }.bind(this));

    deferred.forEach(function (item) {
      this.context.save();
      item.render(this.context);
      this.context.restore();
    }.bind(this));

    this.render();
  }.bind(this));
};

Canvas.addItem = function (item) {
  this.contents.push(item);
};

module.exports = Canvas;
