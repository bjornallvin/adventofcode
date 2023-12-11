import { readLinesFromFile } from '../../utils'

let map = readLinesFromFile(__dirname + '/test.txt').map((l) => l.split(''))

printMap(map)
expandMap()
printMap(map)

function expandMap() {
  let i = 0
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
