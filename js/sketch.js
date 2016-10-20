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
    p5.noStroke();

    var imgs = document.getElementsByTagName('img')
    //var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
    var tracker = new tracking.ObjectTracker(['face']); // Define what to track
    tracker.setStepSize(1.7); // Set up size of tracker

    /* Look for all faces in every image in the imgs array */
    for(var i = 0; i < imgs.length ; i++){
      var currentImage = imgs[i];
      tracking.track(currentImage, tracker);

      // Callback function
      tracker.on('track', function(event) {
        for (var m = 0; m < event.data.length; m++){
          drawRectangles(event.data[m].x, event.data[m].y, event.data[m].width, event.data[m].height);
        }
      });

      /* Draw a rectangle in x,y */
      drawRectangles = function(x, y, w, h) {
        p5.fill(p5.random(255),p5.random(255),p5.random(255));
        p5.rect((currentImage.offsetLeft + x), (currentImage.offsetTop + y), w, h);
      };
    }

  }

  p5.draw = function(){
    /* Define elements to track */

  }
}

/* The above function closure is passed into a p5 object constructor. this starts the sketch. */
var myp5 = new p5(sketch);
