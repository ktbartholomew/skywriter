module.exports = [
  // H1
 {
    start: 0,
    end: 2000,
    left: 50,
    top: 20,
    smoke: true,
    next: function (percent) {
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
    next: function (percent) {
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
    next: function (percent) {
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
    next: function (percent) {
      var startTop = 20;
      var endTop = 160;

      var startLeft = 200;
      var endLeft = 50;

      this.top = (endTop - startTop) * percent + startTop;
      this.left = (endLeft - startLeft) * percent + startLeft;
    }
 },
 {
    start: 5000,
    end: 6000,
    left: 50,
    top: 160,
    smoke: true,
    next: function (percent) {
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
    next: function (percent) {
      var startTop = 160;
      var endTop = 20;

      var startLeft = 200;
      var endLeft = 300;

      this.top = (endTop - startTop) * percent + startTop;
      this.left = (endLeft - startLeft) * percent + startLeft;
    }
 },
 {
    start: 6500,
    end: 8500,
    left: 300,
    top: 20,
    smoke: true,
    next: function (percent) {
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
    next: function (percent) {
      var startTop = 300;
      var endTop = 300;

      var startLeft = 300;
      var endLeft = 400;

      this.top = (endTop - startTop) * percent + startTop;
      this.left = (endLeft - startLeft) * percent + startLeft;
    }
 },
 {
    start: 9000,
    end: 11000,
    left: 400,
    top: 20,
    smoke: true,
    next: function (percent) {
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
    next: function (percent) {
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
    next: function (percent) {
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
    next: function (percent) {
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
   next: function (percent) {
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
   next: function (percent) {
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
   next: function (percent) {
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
    next: function (percent) {
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
   next: function (percent) {
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
    next: function (percent) {
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
    next: function (percent) {
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
    next: function (percent) {
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
   next: function (percent) {
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
    next: function (percent) {
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
   next: function (percent) {
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
    next: function (percent) {
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
   next: function (percent) {
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
   next: function (percent) {
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
   next: function (percent) {
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
   next: function (percent) {
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
   next: function (percent) {
     var startLeft = 950;
     var endLeft = 1300;
     var startTop = 350;
     var endTop = 100;

     this.top = (endTop - startTop) * percent + startTop;
     this.left = (endLeft - startLeft) * percent + startLeft;
   }
 },
];
