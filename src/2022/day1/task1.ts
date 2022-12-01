import { readLinesFromFile, readStringFromFile } from "../../utils";
import * as fs from "fs";
var prompt = require("prompt-sync")();

console.log("Day 1 - Task 1", __dirname);
const arr = readLinesFromFile(__dirname + "/input_real.txt");
console.log(arr);
const elves: number[] = [];

let elf_sum = 0;
let max_calories = 0;
let max_calories_index = 0;

for (let i = 0; i < arr.length; i++) {
  const summarize = arr[i] === "";
  const num = summarize ? 0 : parseInt(arr[i]);
  console.log({
    num,
    i,
    length: arr.length,
    summarize,
  });

  if (!summarize) {
    console.log("summating", num);
    elf_sum = elf_sum + num;
  }

  if (summarize || i === arr.length - 1) {
    console.log("pushing", elf_sum);
    elves.push(elf_sum);

    if (elf_sum > max_calories) {
      max_calories = elf_sum;
      max_calories_index = elves.length - 1;
    }

    elf_sum = 0;
  }
}

/*
if (elf_sum !== 0) {
  elves.push(elf_sum);
  if (elf_sum > max_calories) {
    max_calories = elf_sum;
    max_calories_index = elves.length - 1;
  }
  elf_sum = 0;
}*/

console.log(elves, max_calories, max_calories_index);
