/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Canvas = __webpack_require__(1);
	var Sky = __webpack_require__(2);
	var lines = __webpack_require__(3);
	var Puff = __webpack_require__(4);
	var Dot = __webpack_require__(5);
	var Plane = __webpack_require__(6);

	Canvas.init();
	Canvas.addItem(Sky);

	var start = new Date();

	var thePlane = new Plane({
	  left: 0,
	  top: 0
	});

	Canvas.addItem(thePlane);

	var movePlane = function movePlane() {
	  requestAnimationFrame(function () {
	    var elapsed = new Date() - start;

	    lines.forEach(function (line) {
	      if (line.start <= elapsed && line.end > elapsed) {
	        var prev = {
	          left: line.left + 0,
	          top: line.top + 0
	        };

	        line.next((elapsed - line.start) / (line.end - line.start));

	        thePlane.left = line.left;
	        thePlane.top = line.top;

	        // Oddly, right angles are edge cases.
	        if (line.left == prev.left) {
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

	        var rotation = Math.atan((line.top - prev.top) / (line.left - prev.left));

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
	      line.next((elapsed - line.start) / (line.end - line.start));

	      Canvas.addItem(new Puff({
	        left: line.left,
	        top: line.top
	      }));
	    }
	  });
	}, 50);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var Canvas = {};

	Canvas.init = function () {
	  this.container = document.getElementById('canvas');
	  this.el = document.createElement('canvas');
	  this.context = this.el.getContext('2d');
	  this.contents = [];

	  this.size = {
	    width: function width() {
	      return window.innerWidth;
	      // return 1280;
	    },
	    height: function height() {
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
	    this.context.clearRect(0, 0, this.size.width(), this.size.height());
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var sprite = new Image();
	sprite.src = './src/img/sky.jpg';

	module.exports = {
	  render: function render(context) {
	    context.drawImage(sprite, 0, 0, window.innerWidth, window.innerHeight);
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [
	// H1
	{
	  start: 0,
	  end: 2000,
	  left: 50,
	  top: 20,
	  smoke: true,
	  next: function next(percent) {
	    var startTop = 20;
	    var endTop = 300;

	    this.top = (endTop - startTop) * percent + startTop;
	  }
	},
	// H1-H2
	{
	  start: 2000,
	  end: 2500,
	  left: 50,
	  top: 300,
	  smoke: false,
	  next: function next(percent) {
	    var startTop = 300;
	    var endTop = 300;

	    var startLeft = 50;
	    var endLeft = 200;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// H2
	{
	  start: 2500,
	  end: 4500,
	  left: 200,
	  top: 300,
	  smoke: true,
	  next: function next(percent) {
	    var startTop = 300;
	    var endTop = 20;

	    this.top = (endTop - startTop) * percent + startTop;
	  }
	},
	// H2-H3
	{
	  start: 4500,
	  end: 5000,
	  left: 200,
	  top: 20,
	  smoke: false,
	  next: function next(percent) {
	    var startTop = 20;
	    var endTop = 160;

	    var startLeft = 200;
	    var endLeft = 50;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	}, {
	  start: 5000,
	  end: 6000,
	  left: 50,
	  top: 160,
	  smoke: true,
	  next: function next(percent) {
	    var startLeft = 50;
	    var endLeft = 200;

	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// H-I
	{
	  start: 6000,
	  end: 6500,
	  left: 200,
	  top: 160,
	  smoke: false,
	  next: function next(percent) {
	    var startTop = 160;
	    var endTop = 20;

	    var startLeft = 200;
	    var endLeft = 300;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	}, {
	  start: 6500,
	  end: 8500,
	  left: 300,
	  top: 20,
	  smoke: true,
	  next: function next(percent) {
	    var startTop = 20;
	    var endTop = 300;

	    this.top = endTop * percent + startTop;
	  }
	},
	// I-R
	{
	  start: 8500,
	  end: 9000,
	  left: 300,
	  top: 300,
	  smoke: false,
	  next: function next(percent) {
	    var startTop = 300;
	    var endTop = 300;

	    var startLeft = 300;
	    var endLeft = 400;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	}, {
	  start: 9000,
	  end: 11000,
	  left: 400,
	  top: 20,
	  smoke: true,
	  next: function next(percent) {
	    var startTop = 300;
	    var endTop = 20;

	    this.top = (endTop - startTop) * percent + startTop;
	  }
	},
	// curve of R
	{
	  start: 11000,
	  end: 13000,
	  left: 400,
	  top: 20,
	  smoke: true,
	  next: function next(percent) {
	    var startRadian = Math.PI * 1.5;
	    var endRadian = Math.PI * 2.5;

	    var progressRadian = (endRadian - startRadian) * percent + startRadian;

	    this.left = 96 * 1.5 * Math.cos(progressRadian) + 400;
	    this.top = 96 * Math.sin(progressRadian) + 82;
	  }
	},
	// foot of R
	{
	  start: 13000,
	  end: 14000,
	  left: 400,
	  top: 177,
	  smoke: true,
	  next: function next(percent) {
	    var startLeft = 400;
	    var endLeft = 545;
	    var startTop = 178;
	    var endTop = 300;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// R-E
	{
	  start: 14000,
	  end: 16000,
	  left: 545,
	  top: 300,
	  smoke: false,
	  next: function next(percent) {
	    var startTop = 300;
	    var endTop = 300;

	    var startLeft = 545;
	    var endLeft = 800;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// base of E
	{
	  start: 16000,
	  end: 17000,
	  left: 800,
	  top: 300,
	  smoke: true,
	  next: function next(percent) {
	    var startLeft = 800;
	    var endLeft = 645;
	    //  var startTop = 178;
	    //  var endTop = 300;

	    //  this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// stem of E
	{
	  start: 17000,
	  end: 19000,
	  left: 645,
	  top: 300,
	  smoke: true,
	  next: function next(percent) {
	    var startTop = 300;
	    var endTop = 20;

	    this.top = (endTop - startTop) * percent + startTop;
	    //  this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// top of E
	{
	  start: 19000,
	  end: 20000,
	  left: 645,
	  top: 20,
	  smoke: true,
	  next: function next(percent) {
	    var startLeft = 645;
	    var endLeft = 800;
	    //  var startTop = 178;
	    //  var endTop = 300;

	    //  this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// E3-4
	{
	  start: 20000,
	  end: 21000,
	  left: 800,
	  top: 20,
	  smoke: false,
	  next: function next(percent) {
	    var startTop = 20;
	    var endTop = 160;

	    var startLeft = 800;
	    var endLeft = 750;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// middle of E
	{
	  start: 21000,
	  end: 22000,
	  left: 750,
	  top: 160,
	  smoke: true,
	  next: function next(percent) {
	    var startLeft = 750;
	    var endLeft = 645;
	    //  var startTop = 178;
	    //  var endTop = 300;

	    //  this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// E-C
	{
	  start: 22000,
	  end: 24000,
	  left: 645,
	  top: 160,
	  smoke: false,
	  next: function next(percent) {
	    var startTop = 160;
	    var endTop = 392;

	    var startLeft = 645;
	    var endLeft = 444;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// C
	{
	  start: 24000,
	  end: 27000,
	  left: 400,
	  top: 20,
	  smoke: true,
	  next: function next(percent) {
	    var startRadian = Math.PI * 1.75;
	    var endRadian = Math.PI * 0.25;

	    var progressRadian = (endRadian - startRadian) * percent + startRadian;

	    this.left = 150 * 0.9 * Math.cos(progressRadian) + 350;
	    this.top = 150 * Math.sin(progressRadian) + 500;
	  }
	},
	// C-plus
	{
	  start: 27000,
	  end: 27500,
	  left: 445,
	  top: 606,
	  smoke: false,
	  next: function next(percent) {
	    var startTop = 606;
	    var endTop = 550;

	    var startLeft = 445;
	    var endLeft = 600;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// plus up
	{
	  start: 27500,
	  end: 28500,
	  left: 600,
	  top: 550,
	  smoke: true,
	  next: function next(percent) {
	    //  var startLeft = 750;
	    //  var endLeft = 645;
	    var startTop = 550;
	    var endTop = 450;

	    this.top = (endTop - startTop) * percent + startTop;
	    //  this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// plus-plus
	{
	  start: 28500,
	  end: 29000,
	  left: 600,
	  top: 450,
	  smoke: false,
	  next: function next(percent) {
	    var startTop = 450;
	    var endTop = 500;

	    var startLeft = 600;
	    var endLeft = 550;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// plus over
	{
	  start: 29000,
	  end: 30000,
	  left: 550,
	  top: 500,
	  smoke: true,
	  next: function next(percent) {
	    var startLeft = 550;
	    var endLeft = 650;
	    //  var startTop = 550;
	    //  var endTop = 450;

	    //  this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// plus-W
	{
	  start: 30000,
	  end: 31000,
	  left: 650,
	  top: 450,
	  smoke: false,
	  next: function next(percent) {
	    var startTop = 500;
	    var endTop = 350;

	    var startLeft = 650;
	    var endLeft = 750;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// W 1
	{
	  start: 31000,
	  end: 33000,
	  left: 750,
	  top: 350,
	  smoke: true,
	  next: function next(percent) {
	    var startLeft = 750;
	    var endLeft = 800;
	    var startTop = 350;
	    var endTop = 680;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// W 2
	{
	  start: 33000,
	  end: 34000,
	  left: 800,
	  top: 680,
	  smoke: true,
	  next: function next(percent) {
	    var startLeft = 800;
	    var endLeft = 850;
	    var startTop = 680;
	    var endTop = 500;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// W 3
	{
	  start: 34000,
	  end: 35000,
	  left: 850,
	  top: 550,
	  smoke: true,
	  next: function next(percent) {
	    var startLeft = 850;
	    var endLeft = 900;
	    var startTop = 500;
	    var endTop = 680;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// W 4
	{
	  start: 35000,
	  end: 37000,
	  left: 850,
	  top: 550,
	  smoke: true,
	  next: function next(percent) {
	    var startLeft = 900;
	    var endLeft = 950;
	    var startTop = 680;
	    var endTop = 350;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// bye
	{
	  start: 37000,
	  end: 40000,
	  left: 950,
	  top: 350,
	  smoke: false,
	  next: function next(percent) {
	    var startLeft = 950;
	    var endLeft = 1300;
	    var startTop = 350;
	    var endTop = 100;

	    this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	}];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var sprite = new Image();
	sprite.src = './src/img/smoke-puff.png';

	var deg2rad = function deg2rad(degrees) {
	  return degrees * Math.PI / 180;
	};

	var Puff = function Puff(options) {
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
	    alpha = Math.max(0, 15000 / this.age);
	  } else {
	    alpha = 1;
	  }
	  return {
	    top: this.top - Math.min(this.age * 0.1, 32),
	    left: this.left - Math.min(this.age * 0.1, 32),
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
	  context.drawImage(sprite, style.width / 2 * -1, style.height / 2 * -1, style.width, style.height);
	};

	module.exports = Puff;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var Dot = function Dot(options) {
	  this.top = options.top;
	  this.left = options.left;
	};

	Dot.prototype.render = function (context) {
	  context.fillStyle = 'rgba(255, 0, 255, 1)';
	  context.fillRect(this.left - 1, this.top - 1, 2, 2);
	};

	module.exports = Dot;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var sprite = new Image();
	sprite.src = './src/img/plane.png';

	var deg2rad = function deg2rad(degrees) {
	  return degrees * Math.PI / 180;
	};

	var Plane = function Plane(options) {
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

/***/ }
/******/ ]);