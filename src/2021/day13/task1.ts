import { exit } from "process";
import { readStringFromFile } from "../../utils";

const input = readStringFromFile(__dirname + "/input_real.txt");

const [grid_input, moves] = input.split("\n\n");

let grid: string[][] = [];
let max_x = 0;
let max_y = 0;

const grid_lines = grid_input.split("\n");
for (let j = 0; j < grid_lines.length; j++) {
  console.log("line", grid_lines[j]);
  const [x, y] = grid_lines[j].split(",").map((s) => parseInt(s));
  if (x > max_x) {
    max_x = x;
  }
  if (y > max_y) {
    max_y = y;
  }

  if (grid[y]) {
    grid[y][x] = "#";
  } else {
    grid[y] = [];
    grid[y][x] = "#";
  }
}

for (let j = 0; j < max_y + 1; j++) {
  if (!grid[j]) {
    //create an array filled with "."
    grid[j] = Array(max_x + 1).fill(".");
  } else {
    for (let i = 0; i < max_x + 1; i++) {
      if (!grid[j][i]) {
        grid[j][i] = ".";
      }
    }
  }
}

//printGrid();
console.log("initial count", countDots());
let folds = 0;

const moves_arr = moves.split("\n");

for (let i = 0; i < moves_arr.length; i++) {
  const move = moves_arr[i];
  //if (folds < 2) {
  const [axis, val] = move.replace("fold along ", "").split("=");
  console.log("fold", axis, val);
  if (axis === "y") {
    horizontalFold(parseInt(val));
    folds++;
  } else {
    verticalFold(parseInt(val));
    folds++;
  }
  //printGrid();
  console.log("max", max_x, max_y);
  console.log("count", countDots());
  //exit after 1 fold
  //}
}

printGrid();

function verticalFold(col: number) {
  for (let y = 0; y <= max_y; y++) {
    for (let x = col + 1; x <= max_x; x++) {
      // if 8 => 7 - 8 + 7 = 6
      // if 10 => 7 - 10 + 7 = 4
      const folded_x = 2 * col - x;
      if (folded_x >= 0 && grid[y][folded_x] !== "#") {
        grid[y][folded_x] = grid[y][x];
      }
    }
  }
  max_x = col;
}

function horizontalFold(line: number) {
  for (let y = line + 1; y <= max_y; y++) {
    for (let x = 0; x <= max_x; x++) {
      // if 8 => 7 - 8 + 7 = 6
      // if 10 => 7 - 10 + 7 = 4
      const folded_y = 2 * line - y;
      if (folded_y >= 0 && grid[folded_y][x] !== "#") {
        grid[folded_y][x] = grid[y][x];
      }
    }
  }
  max_y = line;
}

function printGrid() {
  //print grid
  for (let j = 0; j <= max_y; j++) {
    console.log(grid[j].join("").slice(0, max_x));
  }
}

function countDots() {
  let count = 0;
  for (let j = 0; j <= max_y; j++) {
    for (let i = 0; i <= max_x; i++) {
      if (grid[j][i] === "#") {
        count++;
      }
    }
  }
  return count;
}
