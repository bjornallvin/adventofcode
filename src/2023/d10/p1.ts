import { start } from 'prompt'
import { readLinesFromFile } from '../../utils'

const ROW = 0
const COL = 1
const PATH1 = 0
const PATH2 = 1

let lines = readLinesFromFile(__dirname + '/data.txt').map((l) => l.split(''))

console.log(lines)

let steps = 0
let pos = [
  [
    [0, 0],
    [0, 0],
  ],
]

let startPos = [0, 0]

//find the start
for (let i = 0; i < lines.length; i++) {
  let line = lines[i]
  let index = line.indexOf('S')
  if (index !== -1) {
    startPos = [i, index]
    break
  }
}
console.log('start: ', { startPos })

pos[0] = [startPos, startPos]

// find first steps

pos.push([[], []])

let startPos1Retrieved = false
let startPos2Retrieved = false

if (checkNorth(startPos)) {
  pos[steps + 1][PATH1] = [startPos[ROW] - 1, startPos[COL]]
  startPos1Retrieved = true
}
if (checkEast(startPos)) {
  if (!startPos1Retrieved) {
    pos[steps + 1][PATH1] = [startPos[ROW], startPos[COL] + 1]
    startPos1Retrieved = true
  } else {
    pos[steps + 1][PATH2] = [startPos[ROW], startPos[COL] + 1]
    startPos2Retrieved = true
  }
}
if (checkSouth(startPos)) {
  if (!startPos1Retrieved) {
    pos[steps + 1][PATH1] = [startPos[ROW] + 1, startPos[COL]]
    startPos1Retrieved = true
  } else if (!startPos2Retrieved) {
    pos[steps + 1][PATH2] = [startPos[ROW] + 1, startPos[COL]]
    startPos2Retrieved = true
  }
}
if (checkWest(startPos)) {
  if (!startPos1Retrieved) {
    pos[steps + 1][PATH1] = [startPos[ROW], startPos[COL] - 1]
    startPos1Retrieved = true
  } else if (!startPos2Retrieved) {
    pos[steps + 1][PATH2] = [startPos[ROW], startPos[COL] - 1]
    startPos2Retrieved = true
  }
}
steps++

console.log('first step: ', JSON.stringify(pos))
console.log('samePosition: ', samePosition(steps))

while (!samePosition(steps) && steps < 10000) {
  let nextPos = getNextPositions()
  steps++
  pos.push([nextPos[0], nextPos[1]])
  //console.log('pos: ', JSON.stringify(pos))
}

function getNextPosition(path: number) {
  let currChar = lines[pos[steps][path][ROW]][pos[steps][path][COL]]
  let currPos = pos[steps][path]
  let prevPos = pos[steps - 1][path]
  switch (currChar) {
    case 'F':
      //if came from south go east else go south
      if (currPos[ROW] < prevPos[ROW]) {
        return [currPos[ROW], currPos[COL] + 1]
      }
      return [currPos[ROW] + 1, currPos[COL]]

    case '7':
      //if came from south go west else go south
      if (currPos[ROW] < prevPos[ROW]) {
        return [currPos[ROW], currPos[COL] - 1]
      }
      return [currPos[ROW] + 1, currPos[COL]]

    case 'L':
      //if came from north go east else go north
      if (currPos[ROW] > prevPos[ROW]) {
        return [currPos[ROW], currPos[COL] + 1]
      }
      return [currPos[ROW] - 1, currPos[COL]]

    case 'J':
      //if came from north go west else go north
      if (currPos[ROW] > prevPos[ROW]) {
        return [currPos[ROW], currPos[COL] - 1]
      }
      return [currPos[ROW] - 1, currPos[COL]]

    case '-':
      // if came from east go west else go east
      if (currPos[COL] < prevPos[COL]) {
        return [currPos[ROW], currPos[COL] - 1]
      }
      return [currPos[ROW], currPos[COL] + 1]
    case '|':
      // if came from south go north else go south
      if (currPos[ROW] < prevPos[ROW]) {
        return [currPos[ROW] - 1, currPos[COL]]
      }
      return [currPos[ROW] + 1, currPos[COL]]

    default:
      throw new Error('Invalid character: ' + currChar)
  }
}

function checkNorth(currPos: number[]) {
  let northChar = lines[currPos[0] - 1][currPos[1]]
  if (northChar === '|' || northChar === 'F' || northChar === '7') {
    return true
  }
  return false
}
function checkEast(currPos: number[]) {
  let eastChar = lines[currPos[0]][currPos[1] + 1]
  if (eastChar === '-' || eastChar === 'J' || eastChar === '7') {
    return true
  }
  return false
}
function checkSouth(currPos: number[]) {
  let southChar = lines[currPos[0] + 1][currPos[1]]
  if (southChar === '|' || southChar === 'L' || southChar === 'J') {
    return true
  }
  return false
}
function checkWest(currPos: number[]) {
  let westChar = lines[currPos[0]][currPos[1] - 1]
  if (westChar === '-' || westChar === 'F' || westChar === 'L') {
    return true
  }
  return false
}

function getNextPositions() {
  let nextPos1 = getNextPosition(PATH1)
  let nextPos2 = getNextPosition(PATH2)
  return [nextPos1, nextPos2]
}

function samePosition(index: number) {
  return (
    pos[index][0][0] === pos[index][1][0] &&
    pos[index][0][1] === pos[index][1][1]
  )
}

console.log({ steps })
