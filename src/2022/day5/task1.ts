import { readStringFromFile } from "../../utils";

const [stacks_input, moves] = readStringFromFile(
  __dirname + "/input_real.txt"
).split("\n\n");

let stacks: string[][] = [];
//console.log(stacks_input);
const stack_lines = stacks_input.split("\n");
//console.log(stack_lines);
for (let j = stack_lines.length - 2; j >= 0; j--) {
  const line = stack_lines[j];
  //console.log("line", line);
  let stack_index = 0;
  for (let i = 0; i < line.length; i += 4) {
    const stack_content = line.slice(i, i + 3);
    //console.log("stack_content: '" + stack_content + "'");
    if (stack_content[1] !== " ") {
      if (stacks[stack_index]) {
        stacks[stack_index].push(stack_content[1]);
      } else {
        stacks[stack_index] = [stack_content[1]];
      }
    }
    stack_index++;
  }
}

console.log(stacks);

for (const move of moves.split("\n")) {
  console.log("move", move);
  const [amount, from, to] = move
    .replace("move ", "")
    .replace("from ", "")
    .replace("to ", "")
    .split(" ");

  console.log("move", amount, from, to);

  let tempStack: string[] = [];
  for (let i = 0; i < parseInt(amount); i++) {
    tempStack.push(stacks[parseInt(from) - 1].pop() || "");
  }
  while (tempStack.length > 0) {
    stacks[parseInt(to) - 1].push(tempStack.pop() || "");
  }
}

console.log(stacks);

console.log(stackTops().join(""));

function stackTops() {
  return stacks.map((stack) => stack[stack.length - 1]);
}

function moveFromTo(from: number, to: number) {
  stacks[to - 1].push(stacks[from - 1].pop() || "");
}
