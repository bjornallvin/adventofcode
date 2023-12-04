import { readLinesFromFile } from '../../utils'
const lines = readLinesFromFile(__dirname + '/data.txt')

let count = 0

for (let i = 0; i < lines.length; i += 3) {
  const line1 = lines[i]
  const line2 = lines[i + 1]
  const line3 = lines[i + 2]

  let possible = true
  let lineSides1 = line1
    .trim()
    .split(' ')
    .filter((p) => p != '')
    .map((p) => parseInt(p.trim()))
  let lineSides2 = line2
    .trim()
    .split(' ')
    .filter((p) => p != '')
    .map((p) => parseInt(p.trim()))
  let lineSides3 = line3
    .trim()
    .split(' ')
    .filter((p) => p != '')
    .map((p) => parseInt(p.trim()))

  let tri1 = [lineSides1[0], lineSides2[0], lineSides3[0]]
  let tri2 = [lineSides1[1], lineSides2[1], lineSides3[1]]
  let tri3 = [lineSides1[2], lineSides2[2], lineSides3[2]]

  if (checkTriangle(tri1)) count += 1
  if (checkTriangle(tri2)) count += 1
  if (checkTriangle(tri3)) count += 1
}
console.log(count)

function checkTriangle(triangle: number[]) {
  let isTriangle = true
  if (triangle[0] + triangle[1] <= triangle[2]) isTriangle = false
  if (triangle[0] + triangle[2] <= triangle[1]) isTriangle = false
  if (triangle[2] + triangle[1] <= triangle[0]) isTriangle = false
  return isTriangle
}
