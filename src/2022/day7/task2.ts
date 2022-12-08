import { readLinesFromFile } from "../../utils";

const lines = readLinesFromFile(__dirname + "/input_real.txt");

interface File {
  name: string;
  size: number;
}

interface Folder {
  name: string;
  size: number;
  folders?: string[];
  files?: string[];
}

const drive: Folder[] = [{ name: "root", size: 0, folders: [] }];

let currentFolder = 0;
let path = ["root"];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  //console.log("line:", line);
  if (line[0] === "$") {
    //console.log("command", line);
    let cmd = line.split(" ");
    if (cmd[1] === "ls") {
      //console.log("ls");
    }
    if (cmd[1] === "cd") {
      //console.log("cd", cmd[2]);
      if (cmd[2] === "..") {
        path.pop();
        currentFolder = getFolderIndexByName(path.join("/"));
      } else {
        path.push(cmd[2]);
        currentFolder = getFolderIndexByName(path.join("/"));
      }
    }
  } else {
    // its a folder or a files
    const [dir_or_size, name] = line.split(" ");
    if (dir_or_size === "dir") {
      drive[currentFolder]?.folders?.push(name);
    } else {
      drive[currentFolder]?.files?.push(name);
      drive[currentFolder].size += parseInt(dir_or_size);
    }
  }
}

console.log(JSON.stringify(drive));

setFolderSize("root");

console.log(JSON.stringify(drive));

const unusedspace = 70000000 - drive[0].size;
const neededspace = 30000000 - unusedspace;

console.log(unusedspace, neededspace);

console.log(
  drive.filter((p) => p.size < 100000).reduce((a, b) => a + b.size, 0)
);

console.log(
  drive
    .filter((path) => path.size > neededspace)
    .sort((a, b) => a.size - b.size)[0]
);

function findFolderToRemove(size: number) {}

function setFolderSize(path: string) {
  const pathIndex = getFolderIndexByName(path);
  let size = drive[pathIndex].size;
  drive[pathIndex].folders?.forEach((f: string) => {
    size += setFolderSize(path + "/" + f);
  });
  drive[pathIndex].size = size;
  return size;
}

function getFolderIndexByName(name: string) {
  console.log("Getting index of ", name);
  const existing = drive.findIndex((f) => f.name === name);
  if (existing === -1) {
    drive.push({ name, size: 0, folders: [] });
    return drive.length - 1;
  }
  return existing;
}
