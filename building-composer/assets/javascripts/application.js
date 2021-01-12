
// Islamic Skyline Composer
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
let lowrise_building_x = roundNumberToDecimalQuarter(getRandomNumberInRange(3.125, 8.75)) * grid_block_width;
let lowrise_building_y = grid_block_height * 9.75;
let lowrise_building_width = grid_block_width * 4.5;
let lowrise_building_height = grid_block_width * 2.5;
let lowrise_building = TWO.makeRectangle(lowrise_building_x, lowrise_building_y, lowrise_building_width, lowrise_building_height);
lowrise_building.fill = pale_green;
lowrise_building.linewidth = stroke_weight;



// BUILDING WITH ARCHED DOORWAY
// ----------------------------
let door_arch_x = CANVAS_CENTER_X;
let door_arch_y = CANVAS_CENTER_Y;
let door_arch_radius;

let door_height;

let building_with_door_x = CANVAS_CENTER_X;
let building_with_door_y = CANVAS_CENTER_Y;
let building_with_door_width;
let building_with_door_height;

let step_height = 0.125 * grid_block_height;
let step_width;
let step_count = 10;

let building_with_arched_doorway_translation_x = 0;
let building_with_arched_doorway_translation_y = 0;

if (DICE_ROLL <= 3) {
  // large
  door_arch_radius = grid_block_width;
  door_height = 2 * grid_block_width;
  building_with_door_width = door_arch_radius * 4;
  building_with_door_height = door_height + 2 * grid_block_height;
  building_with_arched_doorway_translation_y = grid_block_height;
  building_with_arched_doorway_translation_x = grid_block_height * 3;
  step_width = building_with_door_width;
} else {
  // small
  door_arch_radius = 0.5 * grid_block_width;
  door_height = grid_block_width;
  building_with_door_width = door_arch_radius * 4;
  building_with_door_height = door_height + grid_block_height;
  building_with_arched_doorway_translation_y = grid_block_height * 2;
  building_with_arched_doorway_translation_x = grid_block_height * -4;
  step_width = building_with_door_width;
}

// DO DRAWING

// Draw building behind door
let building_with_door = TWO.makeRectangle(
  building_with_door_x, building_with_door_y, building_with_door_width, building_with_door_height
);
building_with_door.fill = white;
building_with_door.linewidth = stroke_weight;

// Draw arch opening above door opening
let door_arch = TWO.makeCircle(door_arch_x, door_arch_y, door_arch_radius);
door_arch.fill = pink;
door_arch.linewidth = stroke_weight;

// Draw door opening
let door = TWO.makePath(
  CANVAS_CENTER_X - door_arch_radius, CANVAS_CENTER_Y, 
  CANVAS_CENTER_X - door_arch_radius, CANVAS_CENTER_Y + door_height,
  CANVAS_CENTER_X + door_arch_radius, CANVAS_CENTER_Y + door_height, 
  CANVAS_CENTER_X + door_arch_radius, CANVAS_CENTER_Y, 
  true
);
door.fill = pink;
door.linewidth = stroke_weight;

// Steps
let steps = TWO.makeGroup();
for (let i = 0; i <= step_count; i++) {
  step = TWO.makeRectangle(
    CANVAS_CENTER_X, CANVAS_CENTER_Y + (building_with_door_height * 0.5) + (step_height * 0.5) + (i * step_height), step_width, step_height
  );
  step.fill = white;
  step.linewidth = stroke_weight;
  step.addTo(steps);
}

// Group elements and translate position for easier manipulation
let building_with_arched_doorway = TWO.makeGroup(building_with_door, door_arch, door, steps);
building_with_arched_doorway.translation.set(building_with_arched_doorway_translation_x, building_with_arched_doorway_translation_y);

// END BUILDING WITH ARCHED DOORWAY
// ----------------------------

TWO.update();