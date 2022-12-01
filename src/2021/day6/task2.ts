import { exit } from "process";
import { readStringFromFile } from "../../utils";

let fish = readStringFromFile(__dirname + "/input_real.txt")
  .split(",")
  .map((str) => parseInt(str));

let fishages: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

fish.forEach((fish) => {
  fishages[fish] += 1;
});

console.log("start:", fishages);

const days = 256;

for (let day = 0; day < days; day++) {
  let newfishes = fishages[0];

  fishages[0] = fishages[1];
  fishages[1] = fishages[2];
  fishages[2] = fishages[3];
  fishages[3] = fishages[4];
  fishages[4] = fishages[5];
  fishages[5] = fishages[6];
  fishages[6] = fishages[7] + newfishes;
  fishages[7] = fishages[8];
  fishages[8] = newfishes;

  console.log("Day " + day + ": ", fishages);
}

console.log(fishages.reduce((a, b) => a + b, 0));
