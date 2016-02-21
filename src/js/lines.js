module.exports = [
 {
    start: 0,
    end: 2000,
    left: 50,
    top: 20,
    next: function (percent) {
      var startTop = 20;
      var endTop = 300;

      this.top = (endTop - startTop) * percent + startTop;
    }
 },
 {
    start: 2500,
    end: 4500,
    left: 200,
    top: 300,
    next: function (percent) {
      var startTop = 300;
      var endTop = 20;

      this.top = (endTop - startTop) * percent + startTop;
    }
 },
 {
    start: 5000,
    end: 6000,
    left: 50,
    top: 160,
    next: function (percent) {
      var startLeft = 50;
      var endLeft = 200;

      this.left = (endLeft - startLeft) * percent + startLeft;
    }
 },
 {
    start: 6500,
    end: 8500,
    left: 300,
    top: 20,
    next: function (percent) {
      var startTop = 20;
      var endTop = 300;

      this.top = endTop * percent + startTop;
    }
 },
 {
    start: 9000,
    end: 11000,
    left: 400,
    top: 20,
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
    next: function (percent) {
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
   next: function (percent) {
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
   next: function (percent) {
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
    next: function (percent) {
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
   next: function (percent) {
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
   next: function (percent) {
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
   next: function (percent) {
     var startLeft = 900;
     var endLeft = 950;
     var startTop = 680;
     var endTop = 350;

     this.top = (endTop - startTop) * percent + startTop;
     this.left = (endLeft - startLeft) * percent + startLeft;
   }
 },
];
