import { readLinesFromFile } from '../../utils'

let map = readLinesFromFile(__dirname + '/data.txt').map((l) => l.split(''))

printMap(map)
expandMap()
printMap(map)

type Pos = [number, number]
type Pair = [Pos, Pos]
let pairs = new Set<Pair>()

findPairs()

console.log(pairs.size)

calcDistances()

function calcDistances() {
  //iterate of pairs
  let sum = 0

  pairs.forEach((pair) => {
    let distance = calcDistance(pair)
    sum += distance
  })

  console.log('sum', sum)
}

function calcDistance(pair: Pair) {
  let [pos1, pos2] = pair
  let [row1, column1] = pos1
  let [row2, column2] = pos2

  let distance = Math.abs(row2 - row1) + Math.abs(column2 - column1)
  console.log('distance', distance)
  return distance
}

function findPairs() {
  let row = 0
  while (row < map.length) {
    let line = map[row]
    let column = 0
    while (column < line.length) {
      let c = line[column]
      if (c === '#') {
        findPairsWith([row, column])
      }
      column++
    }
    row++
  }
}

function findPairsWith(pos: Pos) {
  let row = pos[0]
  let column = pos[1]

  while (row < map.length) {
    let line = map[row]
    let column = row === pos[0] ? pos[1] + 1 : 0

    while (column < line.length) {
      let c = line[column]
      if (c === '#') {
        console.log('found pair', pos, [row, column])
        pairs.add([pos, [row, column]])
      }
      column++
    }
    row++
  }
}

function expandMap() {
  let i = 0

  while (i < map[0].length) {
    let columnEmpty = isColumnEmpty(map, i)
    if (columnEmpty) {
      insertEmptyColumnAt(i)
      i++
    }

    i++
  }
  i = 0
  while (i < map.length) {
    let line = map[i]
    let lineEmpty = isLineEmpty(line)
    if (lineEmpty) {
      map = insertEmptyLineAt(i)
      i++
    }

    i++
  }
}

function insertEmptyColumnAt(position: number) {
  let row = 0
  while (row < map.length) {
    map[row] = [
      ...map[row].slice(0, position),
      '.',
      ...map[row].slice(position),
    ]
    row++
  }
}

function insertEmptyLineAt(position: number) {
  let newMap = []
  let i = 0
  while (i < map.length) {
    let line = map[i]
    if (i === position) {
      newMap.push(line)
      newMap.push(line)
    } else {
      newMap.push(line)
    }
    i++
  }
  return newMap
}

function isColumnEmpty(map: string[][], column: number) {
  return map.every((line) => line[column] === '.')
}

function isLineEmpty(line: string[]) {
  return line.every((c) => c === '.')
}

function printMap(map: string[][]) {
  console.log(map.map((l) => l.join('')).join('\n'))
  console.log()
}
