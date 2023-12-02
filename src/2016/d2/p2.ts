import { readLinesFromFile } from '../../utils'

type Dir = 'U' | 'D' | 'L' | 'R'

const lines = readLinesFromFile(__dirname + '/data.txt')

let pos = '5'
let pin = ''

let moveTree = {
  '1': ['1', '1', '3', '1'],
  '2': ['2', '3', '6', '2'],
  '3': ['1', '4', '7', '2'],
  '4': ['4', '4', '8', '3'],
  '5': ['5', '6', '5', '5'],
  '6': ['2', '7', 'A', '5'],
  '7': ['3', '8', 'B', '6'],
  '8': ['4', '9', 'C', '7'],
  '9': ['9', '9', '9', '8'],
  A: ['6', 'B', 'A', 'A'],
  B: ['7', 'C', 'D', 'A'],
  C: ['8', 'C', 'C', 'B'],
  D: ['B', 'D', 'D', 'D'],
}

type Key = keyof typeof moveTree

const dirCharToIndex: Record<Dir, number> = {
  U: 0,
  R: 1,
  D: 2,
  L: 3,
}

/*
    1
  2 3 4
5 6 7 8 9
  A B C
    D
*/

for (let line of lines) {
  for (let char of line) {
    let idx = dirCharToIndex[char as Dir]
    let dirs = moveTree[pos as Key]
    pos = dirs[idx]
  }
  pin += pos
}
console.log(pin)
