var Canvas = require('./canvas');
var Sky = require('./objects/sky');
var lines = require('./lines');
var Puff = require('./objects/puff');
var Dot = require('./objects/dot');
var Plane = require('./objects/plane');

Canvas.init();
Canvas.addItem(Sky);

var start = new Date();

var thePlane = new Plane({
  left: 0,
  top: 0
});

Canvas.addItem(thePlane);

var movePlane = function () {
  requestAnimationFrame(function () {
    var elapsed = new Date() - start;

    lines.forEach(function (line) {
      if (line.start <= elapsed && line.end > elapsed) {
        var prev = {
          left: line.left + 0,
          top: line.top + 0
        };

        line.next((elapsed - line.start)/(line.end - line.start));

        thePlane.left = line.left;
        thePlane.top = line.top;

        // Oddly, right angles are edge cases.
        if (line.left ==  prev.left) {
          if (line.top > prev.top) {
            // down
            thePlane.rotation = Math.PI * 0.5;
          } else {
            // up
            thePlane.rotation = Math.PI * 1.5;
          }

          return;
        }

        if (line.top == prev.top) {
          if (line.left > prev.left) {
            // right
            thePlane.rotation = 0;
          } else {
            thePlane.rotation = Math.PI;
          }

          return;
        }

        var rotation = Math.atan(
          (line.top - prev.top) / (line.left - prev.left)
        );

        if (line.left < prev.left) {
          rotation += Math.PI;
        }

        thePlane.rotation = rotation;
      }
    });

    movePlane();
  });
};

movePlane();

setInterval(function () {
  var elapsed = new Date() - start;

  lines.forEach(function (line) {
    if (line.smoke && line.start <= elapsed && line.end > elapsed) {
      line.next((elapsed - line.start)/(line.end - line.start));

      Canvas.addItem(new Puff({
        left: line.left,
        top: line.top
      }));
    }
  });
}, 50);
