import { readLinesFromFile } from "../../utils";

const map = readLinesFromFile(__dirname + "/input_real.txt").map((line) =>
  line.split("").map((x) => parseInt(x))
);

let flashes = 0;
let steps = 100;
let stepFlashes: Array<Array<number>> = [];

for (let step = 1; step < steps + 1; step++) {
  stepFlashes = [];

  //increase
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      map[row][col] += 1;
    }
  }

  //flash
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      flashIfLit(row, col);
    }
  }

  //clear
  for (let i = 0; i < stepFlashes.length; i++) {
    const [row, col] = stepFlashes[i];
    map[row][col] = 0;
  }
  console.log("After step", step);
  printMap();
}

console.log(flashes);

function printMap() {
  for (let row = 0; row < map.length; row++) {
    console.log(map[row].join(""));
  }
}

function flashIfLit(row: number, col: number) {
  if (map[row][col] > 9) {
    //console.log("flash", row, col);
    map[row][col] = 0;
    flashes++;
    stepFlashes.push([row, col]);
    energiseNeighbours(row, col);
  }
}

function energiseNeighbours(row: number, col: number) {
  const neighbours = [];

  // left neightbour
  const hasLeft = col > 0;
  const hasRight = col < map[row].length - 1;
  const hasAbove = row > 0;
  const hasBelow = row < map.length - 1;

  if (hasLeft) {
    map[row][col - 1] += 1;
    flashIfLit(row, col - 1);
  }
  // right neightbour
  if (hasRight) {
    map[row][col + 1] += 1;
    flashIfLit(row, col + 1);
  }
  //get above
  if (hasAbove) {
    map[row - 1][col] += 1;
    flashIfLit(row - 1, col);
  }
  //get below
  if (hasBelow) {
    map[row + 1][col] += 1;
    flashIfLit(row + 1, col);
  }

  if (hasLeft && hasAbove) {
    map[row - 1][col - 1] += 1;
    flashIfLit(row - 1, col - 1);
  }

  if (hasLeft && hasBelow) {
    map[row + 1][col - 1] += 1;
    flashIfLit(row + 1, col - 1);
  }
  if (hasRight && hasAbove) {
    map[row - 1][col + 1] += 1;
    flashIfLit(row - 1, col + 1);
  }
  if (hasRight && hasBelow) {
    map[row + 1][col + 1] += 1;
    flashIfLit(row + 1, col + 1);
  }
}
