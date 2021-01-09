
// for easing a value for animation
function ease(p, g) {
  if (p < 0.5) {
    return 0.5 * Math.pow(2*p, g);
  }else{
    return 1 - 0.5 * Math.pow(2*(1 - p), g);
  }
}

function easeInOutCubic(p) {
  return p<0.5 ? 4*p*p*p : (p-1)*(2*p-2)*(2*p-2)+1;
}

function easeInOutElastic(t) {
  return (t -= 0.5) < 0 ? (0.01 + 0.01 / t) * Math.sin(50 * t) : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1;
}

// map a value from one range to another. eg 0-1 to 1-50
function map_range(value, istart, istop, ostart, ostop) {
  var outgoing = ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  return outgoing;
}

function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// check if number is even
function isEven(n) {
   return n % 2 === 0;
}

// check if number is odd
function isOdd(n) {
   return Math.abs(n % 2) == 1;
}
