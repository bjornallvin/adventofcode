import * as fs from "fs";
import * as path from "path";

export const readStringFromFile = (file: string): string => {
  const data = fs.readFileSync(file, "utf8");
  return data;
};

export const readLinesFromFile = (file: string): string[] => {
  const data = fs.readFileSync(file, "utf8");
  const array = data.split(/\r?\n/);
  return array;
};
