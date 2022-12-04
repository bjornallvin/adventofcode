import { readLinesFromFile } from "../../utils";

const assignments = readLinesFromFile(__dirname + "/input_real.txt");

let total = 0;

for (const assignment of assignments) {
  const [left, right] = assignment.split(",");
  console.log(left, right);
  if (isOverlapping(left, right)) {
    console.log(left, " in ", right);
  }
}

console.log(total);

function isOverlapping(a: string, b: string) {
  const a_arr = a.split("-").map((x) => parseInt(x));
  const b_arr = b.split("-").map((x) => parseInt(x));
  console.log(a_arr, b_arr);
  if (a_arr[1] < b_arr[0] || a_arr[0] > b_arr[1]) {
    return false;
  }

  total += 1;
  return false;
}
