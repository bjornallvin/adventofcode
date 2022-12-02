import { readLinesFromFile } from "../../utils";

const lines = readLinesFromFile(__dirname + "/input_real.txt");

const output_numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let sum = 0;

for (let i = 0; i < lines.length; i++) {
  console.log("-------");

  const line = lines[i];
  const [patterns_str, output_str] = line.split(" | ");
  const output = output_str.split(" ");
  const patterns = patterns_str.split(" ");
  let right_side: string[] = [];
  let top_side: string[] = [];
  let left_and_middle: string[] = [];
  let topleft_middle: string[] = [];
  let top;
  let top_right;
  let bottom_right;

  console.log(patterns_str);

  // first find a 1
  for (let j = 0; j < patterns.length; j++) {
    const pattern = patterns[j];
    const pattern_arr = pattern.split("");

    if (pattern_arr.length == 2) {
      right_side = [...pattern_arr];
      //console.log({ right_side });
      break;
    }
  }

  // then find a 7
  for (let j = 0; j < patterns.length; j++) {
    const pattern = patterns[j];
    const pattern_arr = pattern.split("");

    if (pattern_arr.length == 3) {
      top_side = pattern_arr.filter((x: string) => !right_side.includes(x));
      top = top_side[0];
      //console.log({ top });
      break;
    }
  }

  // then find a 4
  for (let j = 0; j < patterns.length; j++) {
    const pattern = patterns[j];
    const pattern_arr = pattern.split("");

    if (pattern_arr.length == 4) {
      topleft_middle = pattern_arr.filter(
        (x: string) => !right_side.includes(x)
      );

      //console.log({ top });
      break;
    }
  }

  // then find a 6
  for (let j = 0; j < patterns.length; j++) {
    const pattern = patterns[j];
    const pattern_arr = pattern.split("");

    if (pattern_arr.length == 6) {
      if (
        pattern_arr.includes(right_side[0]) &&
        !pattern_arr.includes(right_side[1])
      ) {
        // this is 6
        //console.log({ pattern_arr });
        top_right = right_side[0];
        bottom_right = right_side[1];
        break;
      }
      if (
        pattern_arr.includes(right_side[0]) &&
        !pattern_arr.includes(right_side[1])
      ) {
        // this is 6
        //onsole.log({ pattern_arr });
        top_right = right_side[0];
        bottom_right = right_side[1];
        break;
      }

      if (
        pattern_arr.includes(right_side[0]) &&
        pattern_arr.includes(right_side[1])
      ) {
        // this is 6
        //onsole.log({ pattern_arr });
        top_right = right_side[0];
        bottom_right = right_side[1];
        break;
      }
    }
  }

  console.log({ right_side, topleft_middle, top, top_right, bottom_right });

  // figure out the output

  console.log(output_str);
  let output_dec_str = "";
  for (let j = 0; j < output.length; j++) {
    const output_str = output[j];
    if (output[j].length == 2) {
      output_dec_str += "1";
      //      console.log("1");
    }
    if (output[j].length == 3) {
      output_numbers[7] += 1; // 7:s
      //console.log("7");
      output_dec_str += "7";
    }

    if (output[j].length == 4) {
      output_numbers[4] += 1; // 4:s
      //console.log("4");
      output_dec_str += "4";
    }
    if (output[j].length == 7) {
      output_numbers[8] += 1; // 4:s
      //console.log("8");
      output_dec_str += "8";
    }

    if (output[j].length == 5) {
      if (
        output[j].includes(right_side[0]) &&
        output[j].includes(right_side[1])
      ) {
        //console.log("3");
        output_dec_str += "3";
        output_numbers[3] += 1; // 2:s
      } else {
        if (
          output[j].includes(topleft_middle[0]) &&
          output[j].includes(topleft_middle[1])
        ) {
          //console.log("5");
          output_dec_str += "5";
          output_numbers[5] += 1; // 2:s
        } else {
          //console.log("2");
          output_dec_str += "2";
          output_numbers[2] += 1; // 2:s
        }
      }
    }

    if (output[j].length == 6) {
      if (
        (!output[j].includes(right_side[0]) &&
          output[j].includes(right_side[1])) ||
        (output[j].includes(right_side[0]) &&
          !output[j].includes(right_side[1]))
      ) {
        //console.log("6");
        output_dec_str += "6";
        output_numbers[9] += 1; // 2:s
      } else {
        // 9 or 0
        if (
          output[j].includes(topleft_middle[0]) &&
          output[j].includes(topleft_middle[1])
        ) {
          //console.log("9");
          output_dec_str += "9";
          output_numbers[9] += 1; // 2:s
        } else {
          output_dec_str += "0";
        }
      }
    }
  }
  sum += parseInt(output_dec_str);
  console.log(output_dec_str);
}

console.log(sum);
