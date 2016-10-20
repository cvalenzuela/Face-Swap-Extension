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

var imgs = document.getElementsByTagName('img')
//var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
var tracker = new tracking.ObjectTracker(['face']);
tracker.setStepSize(1.7);

for (var i = 0; i < imgs.length; i++){
  var currentTracking = imgs[i];

  tracking.track(currentTracking, tracker);

  tracker.on('track', function(event) {
    console.log(event.data);


    event.data.forEach(function(rect) {
      window.plot(rect.x, rect.y, rect.width, rect.height);
    });
  });

  window.plot = function(x, y, w, h) {
    var rect = document.createElement('div');
    document.querySelector('.demo-container').appendChild(rect);
    rect.classList.add('rect');
    rect.style.width = w + 'px';
    rect.style.height = h + 'px';
    rect.style.left = (currentTracking.offsetLeft + x) + 'px';
    rect.style.top = (currentTracking.offsetTop + y) + 'px';
    };

}

/* p5 Object Constructor */
var sketch = function(p5) {

  /* Setup Function */
  p5.setup = function() {

    /* Canvas */
    var c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    c.position(0,0);
    c.style('z-index:999');
    p5.clear();
  }

  p5.draw = function(){
    p5.ellipse(p5.mouseX, p5.mouseY, 10,10);
  }
}

/* The above function closure is passed into a p5 object constructor. this starts the sketch. */
var myp5 = new p5(sketch);
