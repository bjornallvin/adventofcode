import { readLinesFromFile } from "../../utils";

const grid = readLinesFromFile(__dirname + "/input_real.txt").map((line) =>
  line.split("").map((char) => parseInt(char))
);

let maxScenicScore = 0;

const scenicGrid = grid.map((row) => [...row]);

console.log(grid);

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    const tree = grid[row][col];
    let scenicScore = 0;

    if (isOnEdge(row, col)) {
      scenicScore = 0;
    } else {
      //from above
      scenicScore = viewDistanceUpward(row, col, tree);

      //from below

      scenicScore *= viewDistanceDownward(row, col, tree);
      scenicScore *= viewDistanceLeft(row, col, tree);
      scenicScore *= viewDistanceRight(row, col, tree);

      //from left
      /*
      treeVisibility += visibleFromLeft(row, col, tree) ? 1 : 0;

      //from right

      treeVisibility += visibleFromRight(row, col, tree) ? 1 : 0;
      */
    }
    scenicGrid[row][col] = scenicScore;
    if (scenicScore > maxScenicScore) maxScenicScore = scenicScore;
    scenicScore = 0;
  }
}

console.log(grid, scenicGrid, maxScenicScore);

function isOnEdge(row: number, col: number) {
  return (
    row === 0 ||
    row === grid.length - 1 ||
    col === 0 ||
    col === grid[0].length - 1
  );
}

function viewDistanceUpward(row: number, col: number, tree: number) {
  let distance = 1;
  for (let i = row - 1; i >= 1; i--) {
    if (grid[i][col] < tree) {
      distance += 1;
    } else {
      break;
    }
  }
  //console.log("upwards distance: ", distance, " for ", row, col, tree, "");
  return distance;
}

function viewDistanceDownward(row: number, col: number, tree: number) {
  let distance = 1;

  for (let i = row + 1; i < grid.length - 1; i++) {
    //console.log("checking", i, col, grid[i][col]);
    if (grid[i][col] < tree) {
      //console.log("increase");
      distance += 1;
    } else {
      break;
    }
  }
  //console.log("downward distance: ", distance, " for ", row, col, tree, "");
  return distance;
}

function viewDistanceLeft(row: number, col: number, tree: number) {
  let distance = 1;
  for (let i = col - 1; i >= 1; i--) {
    if (grid[row][i] < tree) {
      distance += 1;
    } else {
      break;
    }
  }
  //console.log("left distance: ", distance, " for ", row, col, tree, "");
  return distance;
}

function viewDistanceRight(row: number, col: number, tree: number) {
  let distance = 1;
  for (let i = col + 1; i < grid[row].length - 1; i++) {
    if (grid[row][i] < tree) {
      distance += 1;
    } else {
      break;
    }
  }
  //console.log("right distance: ", distance, " for ", row, col, tree, "");
  return distance;
}

function visibleFromAbove(row: number, col: number, tree: number) {
  for (let i = row - 1; i >= 0; i--) {
    if (grid[i][col] >= tree) {
      return false;
    } else {
      break;
    }
  }
  //console.log(row, col, tree, " not visible from above");
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
