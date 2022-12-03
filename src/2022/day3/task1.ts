import { readLinesFromFile } from "../../utils";

const sacks = readLinesFromFile(__dirname + "/input_real.txt");

let score = 0;

for (let i = 0; i < sacks.length; i++) {
  const sack = sacks[i];
  const part1 = sack.substring(0, sack.length / 2);
  const part2 = sack.substring(sack.length / 2, sack.length);
  console.log(part1, part2);
  for (let j = 0; j < part1.length; j++) {
    const found = part1[j];
    if (part2.indexOf(found) !== -1) {
      let value = found.charCodeAt(0);
      if (value >= 65 && value <= 90) {
        // A-Z -> 27-52
        value = value - 65 + 27;
      } else {
        // a-z -> 1-26
        value = value - 97 + 1;
      }
      score += value;
      console.log("found", found, found.charCodeAt(0), value, score);
      break;
    }
  }
}

console.log(score);
