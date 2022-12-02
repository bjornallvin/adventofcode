import { readLinesFromFile } from "../../utils";

const lines = readLinesFromFile(__dirname + "/input_real.txt");

const stack: string[] = [];
const starters = ["(", "[", "{", "<"];
const closers = [")", "]", "}", ">"];
const scores = [3, 57, 1197, 25137];
let score = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  console.log(line);
  const cmds = line.split("");
  for (let j = 0; j < cmds.length; j++) {
    const found = cmds[j];
    //console.log(found);
    if (starters.includes(found)) {
      stack.push(found);
      //console.log("push", found);
    } else {
      const popped = stack.pop();
      if (closers.indexOf(found) !== starters.indexOf(popped || "")) {
        const expected = closers[starters.indexOf(popped || "")];
        console.log(`invalid found ${found} expected ${expected}`, i, j);
        score += scores[closers.indexOf(found)];
      }
    }
  }
  if (stack.length > 0) {
    console.log("incomplete", i, cmds.length);
  }
}

console.log(score);
