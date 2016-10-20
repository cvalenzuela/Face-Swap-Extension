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

  function trackFaces(img) {
    var tracker = new tracking.ObjectTracker(['face']); // Define what to track
    //var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);

    tracker.setStepSize(1.7); // Set up size of tracker
    tracking.track(img, tracker);

    // Callback function
    tracker.on('track', function(event) {
      for (var m = 0; m < event.data.length; m++){
        console.log(img);
        console.log(img.offsetLeft);
        var x = event.data[m].x;
        var y = event.data[m].y;
        var w = event.data[m].width;
        var h = event.data[m].height;
        p5.fill(p5.random(255),p5.random(255),p5.random(255));
        p5.rect((img.offsetLeft + x), (img.offsetTop + y), w, h);
      }
    });
  }

  /* Setup Function */
  p5.setup = function() {

    /* Canvas */
    var c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    c.position(0,0);
    p5.clear();
    p5.noStroke();

    var imgs = document.getElementsByTagName('img')

    /* Look for all faces in every image in the imgs array: use a closure for handling the data */
    for(var i = 0; i < imgs.length ; i++){
      var currentImage = imgs[i];
      trackFaces(currentImage);
    }

  }

  p5.draw = function(){
    /* Define elements to track */
  }
}

/* The above function closure is passed into a p5 object constructor. this starts the sketch. */
var myp5 = new p5(sketch);
