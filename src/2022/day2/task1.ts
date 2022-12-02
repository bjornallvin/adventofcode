import { readLinesFromFile } from "../../utils";

const rounds = readLinesFromFile(__dirname + "/input_real.txt");

const WIN = 6;
const DRAW = 3;
const LOSS = 0;

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

let score = 0;
for (let i = 0; i < rounds.length; i++) {
  const round = rounds[i];
  const [player1, player2] = round.split(" ");
  console.log(player1, player2);
  score += calcScore(player1, player2);
}

console.log(score);

function calcScore(player1: string, player2: string) {
  if (player1 === "A" && player2 === "X") {
    return DRAW + ROCK;
  }
  if (player1 === "A" && player2 === "Y") {
    return WIN + PAPER;
  }
  if (player1 === "A" && player2 === "Z") {
    return LOSS + SCISSORS;
  }

  if (player1 === "B" && player2 === "X") {
    return LOSS + ROCK;
  }
  if (player1 === "B" && player2 === "Y") {
    return DRAW + PAPER;
  }
  if (player1 === "B" && player2 === "Z") {
    return WIN + SCISSORS;
  }

  if (player1 === "C" && player2 === "X") {
    return WIN + ROCK;
  }
  if (player1 === "C" && player2 === "Y") {
    return LOSS + PAPER;
  }
  if (player1 === "C" && player2 === "Z") {
    return DRAW + SCISSORS;
  }
  return 0;
}
