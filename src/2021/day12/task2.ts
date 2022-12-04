import { addListener } from "process";
import { readLinesFromFile } from "../../utils";

const lines: string[] = readLinesFromFile(__dirname + "/input_real.txt"); //.map((line) => line.split("-"));
const links: Record<string, string[]> = {};

lines.forEach((line) => {
  const [a, b] = line.split("-");
  addLink(a, b);
  addLink(b, a);
});

console.log(getPaths("start", ["start"]));

function addLink(a: string, b: string) {
  if (links[a]) {
    links[a].push(b);
  } else {
    links[a] = [b];
  }
}

function getPaths(cave: string, visitedSmallCaves: string[]) {
  //console.log(cave, visitedSmallCaves);
  if (cave === "end") {
    return 1;
  }
  let paths = 0;
  links[cave].forEach((link) => {
    if (!hasVisitedCave(visitedSmallCaves, link)) {
      paths += getPaths(link, getVisitedCaves(visitedSmallCaves, link));
    }
  });
  return paths;
}
function hasVisitedCave(visited: string[], cave: string) {
  if (cave === "start") {
    return true;
  }
  return visited.includes(cave) && visited.includes("twice");
}

function isSmallCave(cave: string) {
  return cave === cave.toLowerCase();
}

function getVisitedCaves(visited: string[], cave: string) {
  const isSmall = isSmallCave(cave);
  if (!isSmall) {
    return visited;
  }
  if (visited.includes(cave)) {
    return [...visited, "twice"];
  }
  return [...visited, cave];
}
