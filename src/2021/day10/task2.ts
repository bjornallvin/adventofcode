import { readLinesFromFile } from "../../utils";

const lines = readLinesFromFile(__dirname + "/input_real.txt");

const starters = ["(", "[", "{", "<"];
const closers = [")", "]", "}", ">"];
const scores = [];
let score = 0;

for (let i = 0; i < lines.length; i++) {
  const stack: string[] = [];
  const line = lines[i];
  //console.log(line);
  const cmds = line.split("");
  let corrupt = false;
  for (let j = 0; j < cmds.length; j++) {
    const found = cmds[j];
    //console.log(found);
    if (starters.includes(found)) {
      stack.push(found);
      //console.log("push", found);
    } else {
      const popped = stack.pop();
      if (closers.indexOf(found) !== starters.indexOf(popped || "")) {
        corrupt = true;
        const expected = closers[starters.indexOf(popped || "")];

        //console.log(`invalid found ${found} expected ${expected}`, i, j);
        //score += scores[closers.indexOf(found)];
      }
    }
  }
  if (!corrupt && stack.length > 0) {
    score = 0;
    console.log("incomplete", i, stack);
    let completion = "";
    while (stack.length > 0) {
      const popped = stack.pop();
      const closer = closers[starters.indexOf(popped || "")];
      completion += closer;
      score = score * 5 + starters.indexOf(popped || "") + 1;
      //console.log("score", score);
    }
    console.log("completion", completion);
    console.log(score);
    scores.push(score);
  }
}

console.log(scores.sort((a, b) => a - b).at(scores.length / 2));
