import { readStringFromFile } from "../../utils";

type Dir = "N" | "E" | "S" | "W";
type Turn = "L" | "R";

const x = readStringFromFile(__dirname + "/data.txt");

let dir: Dir = "N";

let pos = [0, 0];

for (let i of x.split(", ")) {
  console.log("i:", i);
  let turn: Turn = i[0] as Turn;
  console.log("Turn:", turn);
  let steps = parseInt(i.substring(1));
  console.log("Steps:", steps);
  turnSanta(turn);
  console.log("New dir:", dir);
  moveSanta(steps);
  console.log("Pos:", pos);
}

console.log(getDistance());

function getDistance() {
  return Math.abs(pos[0]) + Math.abs(pos[1]);
}


function moveSanta(steps: number) {
  if (dir == "N") {
    pos[1] += steps;
  }else 
  if (dir == "E") {
    pos[0] += steps;
  }
  if (dir == "S") {
    pos[1] -= steps;
  }
  if (dir == "W") {
    pos[0] -= steps;
  }
}

function turnSanta(turn: Turn) {
  if (dir == "N") {
    if (turn == "L") {
      dir = "W";
    } else {
      dir = "E";
    }
  } else if (dir == "E") {
    if (turn == "L") {
      dir = "N";
    } else {
      dir = "S";
    }
  } else if (dir == "S") {
    if (turn == "L") {
      dir = "E";
    } else {
      dir = "W";
    }
  }else if (dir == "W") {
    if (turn == "L") {
      dir = "S";
    } else {
      dir = "N";
    }
  }
}
