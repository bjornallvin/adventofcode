import { readLinesFromFile, readStringFromFile } from "../utils";
import * as fs from "fs";
var prompt = require("prompt-sync")();

export const day1_task2 = () => {
  console.log("Day 1 - Task 2", __dirname);
  const arr = readLinesFromFile(__dirname + "/input_real.txt");
  console.log(arr);
  const elves: number[] = [];
  let sum = 0;
  let elf_sum = 0;
  let max_calories = 0;
  let max_calories_index = 0;
  arr.map((num, index) => {
    console.log({
      num,
      index,
      length: arr.length,
      action: num !== "" || index === arr.length - 1,
    });
    if (num !== "" || index === arr.length - 1) {
      console.log("summating", num);
      elf_sum = elf_sum + parseInt(num);
      sum += parseInt(num);
    } else {
      console.log("pushing", elf_sum);
      elves.push(elf_sum);
      if (elf_sum > max_calories) {
        max_calories = elf_sum;
        max_calories_index = elves.length - 1;
      }
      elf_sum = 0;
    }
  });
  if (elf_sum !== 0) {
    elves.push(elf_sum);
    if (elf_sum > max_calories) {
      max_calories = elf_sum;
      max_calories_index = elves.length - 1;
    }
    elf_sum = 0;
  }

  const sorted = elves.sort((a, b) => b - a);

  const top3 = sorted.slice(0, 3);

  console.log(top3);

  //summarize array values
  const reducer = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;
  console.log(top3.reduce(reducer));
};
