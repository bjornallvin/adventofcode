import { readLinesFromFile } from "../../utils";

const map = readLinesFromFile(__dirname + "/input_real.txt").map((line) =>
  line.split("").map((x) => parseInt(x))
);

function getNeighbours(x: number, y: number) {
  const neighbours = [];

  //get from left
  if (x > 0) {
    neighbours.push(map[y][x - 1]);
  }
  //get from right
  if (x < map[0].length - 1) {
    neighbours.push(map[y][x + 1]);
  }
  //get above
  if (y > 0) {
    neighbours.push(map[y - 1][x]);
  }
  //get below
  if (y < map.length - 1) {
    neighbours.push(map[y + 1][x]);
  }

  return neighbours;
}

function isLowpoint(x: number, y: number) {
  const neighbours = getNeighbours(x, y);
  return neighbours.every((n) => n > map[y][x]);
}

let totalRisk = 0;

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[0].length; x++) {
    if (isLowpoint(x, y)) {
      console.log("lowpoint", x, y);
      totalRisk += 1 + map[y][x];
    }
  }
}

console.log(totalRisk);
