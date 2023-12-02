import { readLinesFromFile } from '../../utils'
const lines = readLinesFromFile(__dirname + '/data.txt')

let pos = 5
let pin = ''

/*
1 2 3
4 5 6
7 8 9
*/

for (let line of lines) {
  for (let char of line) {
    pos = move(pos, char)
  }
  console.log(pos)
}

function move(pos: number, char: string) {
  if (char === 'U') {
    if (pos > 3) {
      return pos - 3
    }
  } else if (char === 'D') {
    if (pos < 7) {
      return pos + 3
    }
  } else if (char === 'L') {
    if (![1, 4, 7].includes(pos)) {
      return pos - 1
    }
  } else if (char === 'R') {
    if (![3, 6, 9].includes(pos)) {
      return pos + 1
    }
  }
  return pos
}
