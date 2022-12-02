import { readLinesFromFile } from "../../utils";

const rounds = readLinesFromFile(__dirname + "/input_real.txt");

const WIN_SCORE = 6;
const DRAW_SCORE = 3;
const LOSS_SCORE = 0;

const ROCK_SCORE = 1;
const PAPER_SCORE = 2;
const SCISSORS_SCORE = 3;

const LOOSE = "X";
const DRAW = "Y";
const WIN = "Z";

const PLAYER1_ROCK = "A";
const PLAYER1_PAPER = "B";
const PLAYER1_SCISSORS = "C";

const PLAYER2_ROCK = "X";
const PLAYER2_PAPER = "Y";
const PLAYER2_SCISSORS = "Z";

let score = 0;
for (let i = 0; i < rounds.length; i++) {
  const round = rounds[i];
  const [player1, result] = round.split(" ");

  const player2 = calcMove(player1, result);

  score += calcScore(player1, player2);
}

console.log(score);

function calcMove(player1: string, result: string): string {
  if (player1 === PLAYER1_ROCK && result === LOOSE) {
    return PLAYER2_SCISSORS;
  }
  if (player1 === PLAYER1_ROCK && result === DRAW) {
    return PLAYER2_ROCK;
  }
  if (player1 === PLAYER1_ROCK && result === WIN) {
    return PLAYER2_PAPER;
  }

  if (player1 === PLAYER1_PAPER && result === LOOSE) {
    return PLAYER2_ROCK;
  }
  if (player1 === PLAYER1_PAPER && result === DRAW) {
    return PLAYER2_PAPER;
  }
  if (player1 === PLAYER1_PAPER && result === WIN) {
    return PLAYER2_SCISSORS;
  }

  if (player1 === PLAYER1_SCISSORS && result === LOOSE) {
    return PLAYER2_PAPER;
  }
  if (player1 === PLAYER1_SCISSORS && result === DRAW) {
    return PLAYER2_SCISSORS;
  }
  if (player1 === PLAYER1_SCISSORS && result === WIN) {
    return PLAYER2_ROCK;
  }

  return "";
}

function calcScore(player1: string, player2: string) {
  if (player1 === "A" && player2 === "X") {
    return DRAW_SCORE + ROCK_SCORE;
  }
  if (player1 === "A" && player2 === "Y") {
    return WIN_SCORE + PAPER_SCORE;
  }
  if (player1 === "A" && player2 === "Z") {
    return LOSS_SCORE + SCISSORS_SCORE;
  }

  if (player1 === "B" && player2 === "X") {
    return LOSS_SCORE + ROCK_SCORE;
  }
  if (player1 === "B" && player2 === "Y") {
    return DRAW_SCORE + PAPER_SCORE;
  }
  if (player1 === "B" && player2 === "Z") {
    return WIN_SCORE + SCISSORS_SCORE;
  }

  if (player1 === "C" && player2 === "X") {
    return WIN_SCORE + ROCK_SCORE;
  }
  if (player1 === "C" && player2 === "Y") {
    return LOSS_SCORE + PAPER_SCORE;
  }
  if (player1 === "C" && player2 === "Z") {
    return DRAW_SCORE + SCISSORS_SCORE;
  }
  return 0;
}
