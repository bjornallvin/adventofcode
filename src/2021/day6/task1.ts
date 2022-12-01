import { readStringFromFile } from "../../utils";

let fish = readStringFromFile(__dirname + "/input_real.txt")
  .split(",")
  .map((str) => parseInt(str));

const days = 80;

for (let day = 0; day < days; day++) {
  let newfishes = 0;
  fish = fish.map((fish) => {
    if (fish === 0) {
      newfishes += 1;
      return 6;
    } else {
      return fish - 1;
    }
  });
  for (let i = 0; i < newfishes; i++) {
    fish.push(8);
  }

  console.log(fish, fish.length);
}
