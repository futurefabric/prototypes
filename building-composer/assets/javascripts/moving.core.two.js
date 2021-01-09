var container;
var mouse_x = 0;
var two;
window.autoPlayAnimation = true;
var t = 0;

function animate() {
  if(recording !== true) {
    setTimeout( function() {
      requestAnimationFrame( animate );
    }, 1000/fps );
  }else{
    requestAnimationFrame( animate );
    capturer.capture(two.renderer.domElement);
  }
  render();
}

function render() {
  if(recording !== true) {
    var rangeInput = $(".animation-range-slider");
    rangeInput.attr({"max" : numFrames});

    $(".animation-range-slider").on('mouseenter touchstart', function(){
      window.autoPlayAnimation = false;
    });

    $(".animation-range-slider").on('mouseleave touchend', function(){
      window.autoPlayAnimation = true;
    });

    if(window.autoPlayAnimation === true) {
      // playing
      t += 1.0/numFrames;
      if(t >= 1) { t = 0; }
      rangeInput.val(Math.ceil(t * numFrames));
      draw();
    }else{

      //scrubbing
      t = rangeInput.val()/numFrames;
      draw();
    }
  }else{
    t = playHead*1.0/canvasWidth;
    playHead += (canvasWidth/numFrames);
    if(t > 1) { t = 1; }
    if(t === 0) { capturer.start(); }
    if(t < 1) { draw(); }
    if(t >= 1) { capturer.stop(); capturer.save(); recording = false; }
  }
}

function createTwoInstance() {
  var elem = document.getElementById('moving');
  var params = {
    width: canvasWidth,
    height: canvasHeight,
    type: rendererType
  };
  two = new Two(params).appendTo(elem);
}

function createCanvas(canvasColorHexString) {
  container = document.createElement( 'div' );
  container.style.backgroundColor = canvasColorHexString;
  container.id = "moving";
  document.getElementsByClassName("main")[0].appendChild(container);
  createTwoInstance();
}
