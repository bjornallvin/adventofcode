import { readLinesFromFile } from "../../utils";

const connections: string[] = readLinesFromFile(__dirname + "/input_test.txt"); //.map((line) => line.split("-"));

//for (let i = 0; i < connections.length; i++) {
//  const [a, b] = connections[i];
//console.log(a, b);
//}
let finishedPaths: string[][] = [];
let posiblePaths: string[][] = [];

getDirectConnections("start").forEach((connection) => {
  posiblePaths.push(["start", connection]);
});

//console.log("posiblePaths", posiblePaths);
let count = 0;

while (posiblePaths.length > 0 && count < 1000000000) {
  const path = posiblePaths.pop();
  if (!path || path.length === 0) continue;

  const directConnections = getDirectConnections(path.at(-1) || "");
  directConnections.forEach((connection) => {
    if (connection === "end") {
      finishedPaths.push([...path, connection]);
    } else {
      // if connection is lowercase and exist in path, skip
      if (connection === "start") {
        //console.log("cannot go back to start");
      } else if (connection === connection.toLowerCase()) {
        const times = path.filter((con) => con === connection).length;
        //console.log("times", times, connection, path);
        if (times < 2) {
          // check if other small cave exists twice already
          const otherDuplicate = duplicatedSmallCave(
            path.filter((c) => c !== connection)
          );
          if (!otherDuplicate) posiblePaths.push([...path, connection]);
        }
      } else {
        posiblePaths.push([...path, connection]);
      }
    }
  });
  //console.log("posiblePaths", posiblePaths);
  //console.log("finishedPaths", finishedPaths);
  count++;
}
console.log("posiblePaths", posiblePaths);
console.log("finishedPaths", posiblePaths.length, finishedPaths.length, count);
const allowOneDuplicate = true;
console.log(filterOutPaths().length);

function getDirectConnections(from: string) {
  return connections.reduce((prev: string[], curr) => {
    const [a, b] = curr.split("-");
    if (a === from) return [...prev, b];
    if (b === from) return [...prev, a];
    return prev;
  }, []);
}
function pathHasSmallCaveTwice(path: string[]) {
  return false;
  const smallCaves = path.filter(
    (con) => con !== "start" && con === con.toLowerCase()
  );
  if (smallCaves.length < 2) return false;
  for (const cave of smallCaves) {
    if (path.filter((con) => con === cave).length > 1) {
      console.log("pathHasSmallCaveTwice", cave, path);
      return true;
    }
  }
  return false;
}

function duplicatedSmallCave(path: string[]) {
  const smallCaves = path.filter(
    (con) => con !== "start" && con === con.toLowerCase()
  );
  if (smallCaves.length < 2) return null;
  for (const cave of smallCaves) {
    if (path.filter((con) => con === cave).length > 1) {
      //console.log("pathHasSmallCaveTwice", cave, path);
      return cave;
    }
  }
  return null;
}

function filterOutPaths() {
  const correctPaths = [];

  for (const path of finishedPaths) {
    const smallCaves = path.filter(
      (cave) => cave !== "start" && cave === cave.toLowerCase()
    );

    const duplicate1 = duplicatedSmallCave(path);
    if (duplicate1 && allowOneDuplicate) {
      //console.log("duplicate1", duplicate1, path);
      const duplicate2 = duplicatedSmallCave(
        path.filter((cave) => cave !== duplicate1)
      );
      if (duplicate2) {
        //console.log("duplicate2", duplicate2, path);
      } else {
        correctPaths.push(path);
      }
    } else {
      correctPaths.push(path);
    }
  }
  return correctPaths;
}
