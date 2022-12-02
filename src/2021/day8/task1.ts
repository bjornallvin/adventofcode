import { readLinesFromFile } from "../../utils";

const lines = readLinesFromFile(__dirname + "/input_real.txt");

const output_numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const [patterns, output_str] = line.split(" | ");
  const output = output_str.split(" ");
  for (let j = 0; j < output.length; j++) {
    if (output[j].length == 2) {
      output_numbers[1] += 1; // 1
    }
    if (output[j].length == 3) {
      output_numbers[7] += 1; // 7:s
    }

    if (output[j].length == 4) {
      output_numbers[4] += 1; // 4:s
    }
    if (output[j].length == 7) {
      output_numbers[8] += 1; // 4:s
    }
  }

  console.log(output);
}

console.log(
  output_numbers,
  output_numbers.reduce((a, b) => a + b, 0)
);
