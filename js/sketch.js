/*
==========

Face Swap
ICM Assignment.
October 2016.

cvalenzuela@nyu.edu

==========
*/

// p5 can not be executed the normal "global" way
// Instead a sketch instance has to be manually created
// This is done with the closure below
console.log("reading sketch...");

/* p5 Object Constructor */
var sketch = function(p5) {

  /* Setup Function */
  p5.setup = function() {

    /* Canvas */
    var c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    c.position(0,0);
    p5.clear();

    /* Define elements to track */
    var imgs = document.getElementsByTagName('img')
    //var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
    var tracker = new tracking.ObjectTracker(['face']); // Define what to track
    tracker.setStepSize(1.7); // Set up size of tracker

    /* Look for face recongition in every image in the imgs array */
    for(var i = 0; i < imgs.length ; i++){
      var currentImage = imgs[i];
      tracking.track(imgs[i], tracker);
    }

    /* Tracker Function when callback is executed */
    tracker.on('track', function(event) {
      for (var k = 0; k < event.data.length; k++){
        p5.fill(255,0,0);
      }

      event.data.forEach(function(rect) {
        window.plot(rect.x, rect.y, rect.width, rect.height);
      });

    });

    /* Draw a rectangle in x,y */
    window.plot = function(x, y, w, h) {
      p5.rect((currentImage.offsetLeft + x), (currentImage.offsetTop + y), w, h);
    };

  }

  p5.draw = function(){
  //  p5.ellipse(p5.mouseX, p5.mouseY, 10,10);
  }
}

/* The above function closure is passed into a p5 object constructor. this starts the sketch. */
var myp5 = new p5(sketch);
