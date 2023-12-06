import { readLinesFromFile } from '../../utils'

const lines = readLinesFromFile(__dirname + '/data.txt')
let times = lines[0]
  .split(' ')
  .filter((p) => isNumber(p))
  .map((p) => parseInt(p))
console.log(times)
let distances = lines[1]
  .split(' ')
  .filter((p) => isNumber(p))
  .map((p) => parseInt(p))
console.log(distances)

function isNumber(s: string) {
  return !isNaN(parseInt(s))
}

let result = 0

for (let i = 0; i < times.length; i++) {
  let time = times[i]
  let distance = distances[i]
  let myMaxDistance = 0
  let timesBeat = 0
  for (let j = 0; j < time; j++) {
    let mydistance = (time - j) * j
    myMaxDistance = Math.max(mydistance, myMaxDistance)
    if (mydistance > distance) {
      timesBeat++
    }
  }
  console.log({ myMaxDistance, distance, timesBeat, result })
  result = result ? result * timesBeat : timesBeat
  console.log({ result })
}

console.log(result)
