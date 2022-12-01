import { readStringFromFile } from "../../utils";

let positions = readStringFromFile(__dirname + "/input_real.txt")
  .split(",")
  .map((str) => parseInt(str));

console.log(positions);

const min = positions.reduce((a, b) => Math.min(a, b), 0);
const max = positions.reduce((a, b) => Math.max(a, b), 0);

console.log(min, max);

let minFuelCost = 0;
let minFuelCostIndex = 0;

for (let pos = min; pos <= max; pos++) {
  let fuelcost = 0;

  for (let i = 0; i < positions.length; i++) {
    const position = positions[i];
    fuelcost += Math.abs(position - pos);
  }

  if (minFuelCost === 0 || fuelcost < minFuelCost) {
    minFuelCost = fuelcost;
    minFuelCostIndex = pos;
  }

  console.log("pos", pos, "cost", fuelcost);
}

console.log(minFuelCost, minFuelCostIndex);
