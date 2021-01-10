
// Islamic Cityscape Composer
// by Guy Moorhouse
// @futurefabric

// CONSTANTS
const RENDERER_TYPE = "SVGRenderer";
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 960;
const CANVAS_CENTER_X = CANVAS_WIDTH / 2;
const CANVAS_CENTER_Y = CANVAS_HEIGHT / 2;
const COMPOSER = document.getElementById('composer');
const TWO_PARAMS = {
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  type: RENDERER_TYPE
};
const TWO = new Two(TWO_PARAMS).appendTo(COMPOSER);
const DICE_ROLL = Math.round(getRandomNumberInRange(1, 6));

// DRAWING VARIABLES
let grid_columns = 12;
let grid_block_width = grid_block_height = CANVAS_WIDTH/grid_columns;
let outer_inset_x = outer_inset_y = grid_block_width;
let stroke_weight = Math.floor(CANVAS_WIDTH / 240);

// COLOURS
let black = '#000000';
let white = '#FFFFFF';
let yellow = '#F3CE60';
let dark_green = '#60B9AA';
let pale_green = '#C2DCD7';
let red = '#EE7E6F';
let pink = '#F2AACD';


// HELPERS
function getRandomNumberInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function roundNumberToDecimalQuarter(number) {
  return (Math.round(number * 4) / 4).toFixed(2);
}

function roundNumberToInteger(number) {
  return Math.round(number);
}

// DRAWING:

// Background
let background = TWO.makeRectangle(CANVAS_CENTER_X, CANVAS_CENTER_Y, CANVAS_WIDTH, CANVAS_HEIGHT);
background.fill = white;
background.opacity = 0.1;
background.noStroke();

// Sun
let sun_x;

if (DICE_ROLL <= 3) {
  sun_x = roundNumberToInteger(getRandomNumberInRange(2, 4)) * grid_block_width;
}else{
  sun_x = roundNumberToInteger(getRandomNumberInRange(8, 10)) * grid_block_width;
}
let sun_y = grid_block_height * 2;
let sun_radius = grid_block_width;
let sun = TWO.makeCircle(sun_x, sun_y, sun_radius);
sun.fill = yellow;
sun.linewidth = stroke_weight;

// Green Building
let flat_building_a_x = roundNumberToDecimalQuarter(getRandomNumberInRange(3, 9)) * grid_block_width;
let flat_building_a_y = grid_block_height * 8.25;
let flat_building_a_width = grid_block_width * 4;
let flat_building_a_height = grid_block_width * 5.5;
let flat_building_a = TWO.makeRectangle(flat_building_a_x, flat_building_a_y, flat_building_a_width, flat_building_a_height);
flat_building_a.fill = dark_green;
flat_building_a.linewidth = stroke_weight;

// Pale Green Building
let lowrise_building_x = roundNumberToDecimalQuarter(getRandomNumberInRange(3.125, 9)) * grid_block_width;
let lowrise_building_y = grid_block_height * 9.75;
let lowrise_building_width = grid_block_width * 4.5;
let lowrise_building_height = grid_block_width * 2.5;
let lowrise_building = TWO.makeRectangle(lowrise_building_x, lowrise_building_y, lowrise_building_width, lowrise_building_height);
lowrise_building.fill = pale_green;
lowrise_building.linewidth = stroke_weight;

TWO.update();