import { readLinesFromFile } from "../../utils";

const map = readLinesFromFile(__dirname + "/input_real.txt").map((line) =>
  line.split("").map((x) => parseInt(x))
);

const map2 = map.map((row) => row.map((x) => ({ height: x })));

let totalRisk = 0;
let basinPoints: Array<string> = [];
const basinSizes = [];

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[0].length; x++) {
    if (isLowpoint(x, y)) {
      console.log("lowpoint", x, y);
      totalRisk += 1 + map[y][x];
      basinPoints = [];
      addBasinPoints(x, y);
      //create set from array
      const uniqueBasinPoints = [...new Set(basinPoints)];
      console.log("basinPoints", uniqueBasinPoints, uniqueBasinPoints.length);
      basinSizes.push(uniqueBasinPoints.length);
    }
  }
}

console.log(
  basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b)
);

function addBasinPoints(x: number, y: number) {
  basinPoints.push(`${x}${y}`);
  const neighbours = getNeighbours(x, y);
  neighbours.forEach((n) => {
    if (n.height > map[y][x] && n.height < 9) {
      addBasinPoints(n.x, n.y);
    }
  });
}

function getNeighbours(x: number, y: number) {
  const neighbours = [];

  //get from left
  if (x > 0) {
    neighbours.push({ x: x - 1, y, height: map[y][x - 1] });
  }
  //get from right
  if (x < map[0].length - 1) {
    neighbours.push({ x: x + 1, y, height: map[y][x + 1] });
  }
  //get above
  if (y > 0) {
    neighbours.push({ x, y: y - 1, height: map[y - 1][x] });
  }
  //get below
  if (y < map.length - 1) {
    neighbours.push({ x, y: y + 1, height: map[y + 1][x] });
  }

  return neighbours;
}

function isLowpoint(x: number, y: number) {
  const neighbours = getNeighbours(x, y);
  return neighbours.every((n) => n.height > map[y][x]);
}
