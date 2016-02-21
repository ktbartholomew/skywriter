var Canvas = require('./canvas');
var Sky = require('./objects/sky');
var lines = require('./lines');
var Puff = require('./objects/puff');
var Plane = require('./objects/plane');

Canvas.init();
Canvas.addItem(Sky);

var start = new Date();

setInterval(function () {
  var elapsed = new Date() - start;

  lines.forEach(function (line) {
    if (line.start <= elapsed && line.end > elapsed) {
      line.next((elapsed - line.start)/(line.end - line.start));
      Canvas.addItem(new Puff({
        left: line.left,
        top: line.top
      }));
    }
  });
}, 50);

// Canvas.addItem(new Plane({
//   left: 200,
//   top: 200
// }));
