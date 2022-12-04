import { readLinesFromFile } from "../../utils";

const assignments = readLinesFromFile(__dirname + "/input_real.txt");

let total = 0;

for (const assignment of assignments) {
  const [left, right] = assignment.split(",");
  console.log(left, right);
  if (isContainedIn(left, right)) {
    console.log(left, " in ", right);
  } else {
    if (isContainedIn(right, left)) {
      console.log(right, " in ", left);
    }
  }
}

console.log(total);

function isContainedIn(a: string, b: string) {
  const a_arr = a.split("-").map((x) => parseInt(x));
  const b_arr = b.split("-").map((x) => parseInt(x));
  console.log(a_arr, b_arr);
  if (a_arr[0] >= b_arr[0] && a_arr[1] <= b_arr[1]) {
    total += 1;
    return true;
  }
  return false;
}
