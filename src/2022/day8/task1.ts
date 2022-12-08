import { readLinesFromFile } from "../../utils";

const grid = readLinesFromFile(__dirname + "/input_real.txt").map((line) =>
  line.split("").map((char) => parseInt(char))
);

let count = 0;

const visibilityGrid = grid.map((row) => [...row]);

console.log(grid);

for (let row = 0; row < grid.length; row++) {
  let checkFromLeft = true;
  let checkFromRight = true;
  let checkFromTop = true;
  let checkFromBottom = true;
  for (let col = 0; col < grid[row].length; col++) {
    const tree = grid[row][col];
    let treeVisibility = 0;

    if (isOnEdge(row, col)) {
      treeVisibility = 4;
    } else {
      //from above
      treeVisibility += visibleFromAbove(row, col, tree) ? 1 : 0;

      //from below

      treeVisibility += visibleFromBelow(row, col, tree) ? 1 : 0;

      //from left

      treeVisibility += visibleFromLeft(row, col, tree) ? 1 : 0;

      //from right

      treeVisibility += visibleFromRight(row, col, tree) ? 1 : 0;
    }
    visibilityGrid[row][col] = treeVisibility;
    if (treeVisibility > 0 || isOnEdge(row, col)) count += 1;
    treeVisibility = 0;
  }
}

console.log(grid, visibilityGrid, count);

function isOnEdge(row: number, col: number) {
  return (
    row === 0 ||
    row === grid.length - 1 ||
    col === 0 ||
    col === grid[0].length - 1
  );
}

function visibleFromAbove(row: number, col: number, tree: number) {
  for (let i = row - 1; i >= 0; i--) {
    if (grid[i][col] >= tree) {
      return false;
    }
  }
  console.log(row, col, tree, " not visible from above");
  return true;
}

function visibleFromBelow(row: number, col: number, tree: number) {
  for (let i = row + 1; i < grid.length; i++) {
    if (grid[i][col] >= tree) {
      return false;
    }
  }
  return true;
}

function visibleFromLeft(row: number, col: number, tree: number) {
  for (let i = col - 1; i >= 0; i--) {
    if (grid[row][i] >= tree) {
      return false;
    }
  }
  return true;
}

function visibleFromRight(row: number, col: number, tree: number) {
  for (let i = col + 1; i < grid[row].length; i++) {
    if (grid[row][i] >= tree) {
      return false;
    }
  }
  return true;
}
