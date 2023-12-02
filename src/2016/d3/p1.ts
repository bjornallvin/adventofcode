import { readLinesFromFile } from '../../utils'
const lines = readLinesFromFile(__dirname + '/data.txt')

let count = 0

for (let line of lines) {
  let possible = true
  let sides = line
    .trim()
    .split(' ')
    .filter((p) => p != '')
    .map((p) => parseInt(p.trim()))
  console.log(sides)
  if (sides[0] + sides[1] <= sides[2]) possible = false
  if (sides[0] + sides[2] <= sides[1]) possible = false
  if (sides[2] + sides[1] <= sides[0]) possible = false
  if (possible) count += 1
}
console.log(count)
