import { readLinesFromFile } from '../../utils'

let presents = readLinesFromFile(__dirname + '/data.txt')

let sum = 0

for (let pl of presents) {
  let p = pl
    .split('x')
    .map((s) => parseInt(s))
    .sort((a, b) => a - b)

  let sides = 2 * p[0] * p[1] + 2 * p[0] * p[2] + 2 * p[1] * p[2] + p[0] * p[1]

  sum = sum + sides

  console.log(p, sides)
}

console.log(sum)
