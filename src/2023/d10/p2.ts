import { start } from 'prompt'
import { readLinesFromFile } from '../../utils'

const ROW = 0
const COL = 1
const PATH1 = 0
const PATH2 = 1

let map = readLinesFromFile(__dirname + '/data.txt').map((l) => l.split(''))

let bigmap: any = []

printMap()

let startPos = getStartPos()
console.log('start: ', { startPos })

let loop = getLoop()
//console.log('loop: ', loop)

//clear map except for loop
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (!posIsOnTheLoop([i, j])) map[i][j] = '.'
  }
}
printMap()

expandMap()

printBigMap()

floodBigMap()

printBigMap()

// Now count the 3x3 blocks of "."
let count = 0
for (let y = 0; y < bigmap.length; y += 3) {
  for (let x = 0; x < bigmap[0].length; x += 3) {
    if (
      // top row
      bigmap[y][x + 0] === '.' &&
      bigmap[y][x + 1] === '.' &&
      bigmap[y][x + 2] === '.' &&
      // mid row
      bigmap[y + 1][x + 0] === '.' &&
      bigmap[y + 1][x + 1] === '.' &&
      bigmap[y + 1][x + 2] === '.' &&
      // bot row
      bigmap[y + 2][x + 0] === '.' &&
      bigmap[y + 2][x + 1] === '.' &&
      bigmap[y + 2][x + 2] === '.'
    ) {
      count++
    }
  }
}

console.log(count)

//---------------------------------------------

function floodBigMap() {
  let visited: any = []
  const q = [[0, 0]]
  let iter = 0
  while (q.length > 0 && iter++ < 1000000) {
    let currPos = q.shift() as number[]
    let currChar = bigmap[currPos[ROW]][currPos[COL]]

    if (
      visited.some(
        (p: any) => p[ROW] === currPos[ROW] && p[COL] === currPos[COL],
      )
    )
      continue

    if (currChar === '.') {
      bigmap[currPos[ROW]][currPos[COL]] = 'O'
      visited.push(currPos)

      if (currPos[ROW] > 0) q.push([currPos[ROW] - 1, currPos[COL]])
      if (currPos[ROW] < bigmap.length - 1)
        q.push([currPos[ROW] + 1, currPos[COL]])
      if (currPos[COL] > 0) q.push([currPos[ROW], currPos[COL] - 1])
      if (currPos[COL] < bigmap[0].length - 1)
        q.push([currPos[ROW], currPos[COL] + 1])
    }
  }
}

function expandMap() {
  for (let row = 0; row < map.length; row++) {
    //create array 3 times bigger
    let bigLine1 = []
    let bigLine2 = []
    let bigLine3 = []
    for (let col = 0; col < map[row].length; col++) {
      let bigSymbol = get3x3Symbol(map[row][col])
      bigLine1.push(...bigSymbol[0])
      bigLine2.push(...bigSymbol[1])
      bigLine3.push(...bigSymbol[2])
    }

    bigmap.push(bigLine1)
    bigmap.push(bigLine2)
    bigmap.push(bigLine3)
  }
}

function get3x3Symbol(symbol: string) {
  switch (symbol) {
    case 'F':
      return [
        ['.', '.', '.'],
        ['.', 'F', '-'],
        ['.', '|', '.'],
      ]
    case '7':
      return [
        ['.', '.', '.'],
        ['-', '7', '.'],
        ['.', '|', '.'],
      ]
    case 'L':
      return [
        ['.', '|', '.'],
        ['.', 'L', '-'],
        ['.', '.', '.'],
      ]
    case 'J':
      return [
        ['.', '|', '.'],
        ['-', 'J', '.'],
        ['.', '.', '.'],
      ]
    case '-':
      return [
        ['.', '.', '.'],
        ['-', '-', '-'],
        ['.', '.', '.'],
      ]
    case '|':
      return [
        ['.', '|', '.'],
        ['.', '|', '.'],
        ['.', '|', '.'],
      ]
    default:
      return [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
      ]
  }
}

function printBigMap() {
  for (let i = 0; i < bigmap.length; i++) {
    let line = bigmap[i].join('')
    console.log(line)
  }
  console.log()
}
function printMap() {
  for (let i = 0; i < map.length; i++) {
    let line = map[i].join('')
    console.log(line)
  }
  console.log()
}

function getLoop() {
  let steps = 0

  let pos = [
    [
      [0, 0],
      [0, 0],
    ],
  ]

  pos[0] = [startPos, startPos]

  // find first steps

  pos.push([[], []])

  let startPos1Retrieved = false
  let startPos2Retrieved = false
  let path1Dir = ''
  let path2Dir = ''

  if (checkNorth(startPos)) {
    pos[steps + 1][PATH1] = [startPos[ROW] - 1, startPos[COL]]
    startPos1Retrieved = true
    path1Dir = 'N'
  }
  if (checkEast(startPos)) {
    if (!startPos1Retrieved) {
      pos[steps + 1][PATH1] = [startPos[ROW], startPos[COL] + 1]
      startPos1Retrieved = true
      path1Dir = 'E'
    } else {
      pos[steps + 1][PATH2] = [startPos[ROW], startPos[COL] + 1]
      startPos2Retrieved = true
      path2Dir = 'E'
    }
  }
  if (checkSouth(startPos)) {
    if (!startPos1Retrieved) {
      pos[steps + 1][PATH1] = [startPos[ROW] + 1, startPos[COL]]
      startPos1Retrieved = true
      path1Dir = 'S'
    } else if (!startPos2Retrieved) {
      pos[steps + 1][PATH2] = [startPos[ROW] + 1, startPos[COL]]
      startPos2Retrieved = true
      path2Dir = 'S'
    }
  }
  if (checkWest(startPos)) {
    if (!startPos1Retrieved) {
      pos[steps + 1][PATH1] = [startPos[ROW], startPos[COL] - 1]
      startPos1Retrieved = true
      path1Dir = 'W'
    } else if (!startPos2Retrieved) {
      pos[steps + 1][PATH2] = [startPos[ROW], startPos[COL] - 1]
      startPos2Retrieved = true
      path2Dir = 'W'
    }
  }
  steps++

  let startPosSymbol = getStartPosSymbol(path1Dir, path2Dir)

  map[startPos[ROW]][startPos[COL]] = startPosSymbol

  //console.log('first step: ', JSON.stringify(pos))
  //console.log('samePosition: ', samePosition(steps))

  while (!samePosition(steps) && steps < 10000) {
    let nextPos = getNextPositions()
    steps++
    pos.push([nextPos[0], nextPos[1]])
    //console.log('pos: ', JSON.stringify(pos))
  }

  console.log({ steps })

  return [...pos.map((p) => p[0]), ...pos.reverse().map((p) => p[1])]

  //---------------------------------------------
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
  function getNextPosition(path: number) {
    let currChar = map[pos[steps][path][ROW]][pos[steps][path][COL]]
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
}

function getStartPos() {
  let startPos: number[] = []

  //find the start
  for (let i = 0; i < map.length; i++) {
    let line = map[i]
    let index = line.indexOf('S')
    if (index !== -1) {
      startPos = [i, index]
      break
    }
  }
  return startPos
}

function getStartPosSymbol(path1Dir: string, path2Dir: string) {
  if (path1Dir === 'N') {
    if (path2Dir === 'E') return 'L'
    if (path2Dir === 'W') return 'J'
    if (path2Dir === 'S') return '|'
  } else if (path1Dir === 'E') {
    if (path2Dir === 'S') return 'F'
    if (path2Dir === 'W') return '-'
  }
  return '7'
}

function posIsOnTheLoop(pos: number[]) {
  return loop.some((p) => p[ROW] === pos[ROW] && p[COL] === pos[COL])
}

function checkNorth(currPos: number[]) {
  if (currPos[ROW] === 0) return false
  let northChar = map[currPos[0] - 1][currPos[1]]
  if (northChar === '|' || northChar === 'F' || northChar === '7') {
    return true
  }
  return false
}
function checkEast(currPos: number[]) {
  let eastChar = map[currPos[0]][currPos[1] + 1]
  if (eastChar === '-' || eastChar === 'J' || eastChar === '7') {
    return true
  }
  return false
}
function checkSouth(currPos: number[]) {
  let southChar = map[currPos[0] + 1][currPos[1]]
  if (southChar === '|' || southChar === 'L' || southChar === 'J') {
    return true
  }
  return false
}
function checkWest(currPos: number[]) {
  let westChar = map[currPos[0]][currPos[1] - 1]
  if (westChar === '-' || westChar === 'F' || westChar === 'L') {
    return true
  }
  return false
}
