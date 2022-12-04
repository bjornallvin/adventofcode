import { readLinesFromFile } from "../../utils";

const connections: string[] = readLinesFromFile(__dirname + "/input_real.txt"); //.map((line) => line.split("-"));

//for (let i = 0; i < connections.length; i++) {
//  const [a, b] = connections[i];
//console.log(a, b);
//}
let finishedPaths: string[][] = [];
let posiblePaths: string[][] = [];

getDirectConnections("start").forEach((connection) => {
  posiblePaths.push(["start", connection]);
});

console.log("posiblePaths", posiblePaths);
let count = 0;

while (posiblePaths.length > 0 && count < 20000) {
  const path = posiblePaths.pop();
  if (!path || path.length === 0) continue;

  const directConnections = getDirectConnections(path.at(-1) || "");
  directConnections.forEach((connection) => {
    if (connection === "end") {
      finishedPaths.push([...path, connection]);
    } else {
      // if connection is lowercase and exist in path, skip
      if (
        connection === connection.toLowerCase() &&
        path.includes(connection)
      ) {
        return;
      } else {
        posiblePaths.push([...path, connection]);
      }
    }
  });
  //console.log("posiblePaths", posiblePaths);
  //console.log("finishedPaths", finishedPaths);
  count++;
}

console.log("finishedPaths", finishedPaths.length, count);

function getDirectConnections(from: string) {
  return connections.reduce((prev: string[], curr) => {
    const [a, b] = curr.split("-");
    if (a === from) return [...prev, b];
    if (b === from) return [...prev, a];
    return prev;
  }, []);
}
