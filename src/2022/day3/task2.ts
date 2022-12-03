import { readLinesFromFile } from "../../utils";

const sacks = readLinesFromFile(__dirname + "/input_real.txt");

let score = 0;

for (let i = 0; i < sacks.length; i += 3) {
  const sack1 = sacks[i];
  const sack2 = sacks[i + 1];
  const sack3 = sacks[i + 2];

  for (let j = 0; j < sack1.length; j++) {
    const found = sack1[j];
    if (sack2.indexOf(found) !== -1 && sack3.indexOf(found) !== -1) {
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
