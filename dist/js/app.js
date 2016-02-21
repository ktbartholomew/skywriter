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
	var Plane = __webpack_require__(5);

	Canvas.init();
	Canvas.addItem(Sky);

	var start = new Date();

	setInterval(function () {
	  var elapsed = new Date() - start;

	  lines.forEach(function (line) {
	    if (line.start <= elapsed && line.end > elapsed) {
	      line.next((elapsed - line.start) / (line.end - line.start));
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

	    this.contents.forEach(function (item) {
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

	module.exports = [{
	  start: 0,
	  end: 2000,
	  left: 50,
	  top: 20,
	  next: function next(percent) {
	    var startTop = 20;
	    var endTop = 300;

	    this.top = (endTop - startTop) * percent + startTop;
	  }
	}, {
	  start: 2500,
	  end: 4500,
	  left: 200,
	  top: 300,
	  next: function next(percent) {
	    var startTop = 300;
	    var endTop = 20;

	    this.top = (endTop - startTop) * percent + startTop;
	  }
	}, {
	  start: 5000,
	  end: 6000,
	  left: 50,
	  top: 160,
	  next: function next(percent) {
	    var startLeft = 50;
	    var endLeft = 200;

	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	}, {
	  start: 6500,
	  end: 8500,
	  left: 300,
	  top: 20,
	  next: function next(percent) {
	    var startTop = 20;
	    var endTop = 300;

	    this.top = endTop * percent + startTop;
	  }
	}, {
	  start: 9000,
	  end: 11000,
	  left: 400,
	  top: 20,
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
	  next: function next(percent) {
	    var startLeft = 400;
	    var endLeft = 545;
	    var startTop = 178;
	    var endTop = 300;

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
	  next: function next(percent) {
	    var startLeft = 645;
	    var endLeft = 800;
	    //  var startTop = 178;
	    //  var endTop = 300;

	    //  this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// middle of E
	{
	  start: 21000,
	  end: 22000,
	  left: 750,
	  top: 160,
	  next: function next(percent) {
	    var startLeft = 750;
	    var endLeft = 645;
	    //  var startTop = 178;
	    //  var endTop = 300;

	    //  this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// C
	{
	  start: 24000,
	  end: 27000,
	  left: 400,
	  top: 20,
	  next: function next(percent) {
	    var startRadian = Math.PI * 1.75;
	    var endRadian = Math.PI * 0.25;

	    var progressRadian = (endRadian - startRadian) * percent + startRadian;

	    this.left = 150 * 0.9 * Math.cos(progressRadian) + 350;
	    this.top = 150 * Math.sin(progressRadian) + 500;
	  }
	},
	// plus up
	{
	  start: 27500,
	  end: 28500,
	  left: 600,
	  top: 400,
	  next: function next(percent) {
	    //  var startLeft = 750;
	    //  var endLeft = 645;
	    var startTop = 550;
	    var endTop = 450;

	    this.top = (endTop - startTop) * percent + startTop;
	    //  this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// plus over
	{
	  start: 29000,
	  end: 30000,
	  left: 600,
	  top: 500,
	  next: function next(percent) {
	    var startLeft = 550;
	    var endLeft = 650;
	    //  var startTop = 550;
	    //  var endTop = 450;

	    //  this.top = (endTop - startTop) * percent + startTop;
	    this.left = (endLeft - startLeft) * percent + startLeft;
	  }
	},
	// W 1
	{
	  start: 31000,
	  end: 33000,
	  left: 750,
	  top: 350,
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
	  next: function next(percent) {
	    var startLeft = 900;
	    var endLeft = 950;
	    var startTop = 680;
	    var endTop = 350;

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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var sprite = new Image();
	sprite.src = './src/img/plane.png';

	var deg2rad = function deg2rad(degrees) {
	  return degrees * Math.PI / 180;
	};

	var Plane = function Plane(options) {
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

/***/ }
/******/ ]);