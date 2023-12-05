import { exit } from 'process'
import { readLinesFromFile } from '../../utils'

const lines = readLinesFromFile(__dirname + '/data.txt')

let min = 0

let seedRanges = lines[0]
  .replace('seeds: ', '')
  .split(' ')
  .map((p) => parseInt(p))

console.log(seedRanges)

let maps: any = []
let mapIndex = -1
for (const line of lines) {
  if (line === '') {
    mapIndex++
    maps[mapIndex] = []
  }
  if (isNumber(line[0])) {
    maps[mapIndex].push(line.split(' ').map((p) => parseInt(p)))
  }
}
console.log(maps)

for (let map of maps) {
  map = map.sort((a: any, b: any) => a[1] - b[1])
}

console.log(maps)

for (let i = 0; i < seedRanges.length; i += 2) {
  console.log('seedrange:', seedRanges[i])
  for (let j = 0; j < seedRanges[i + 1]; j++) {
    let seed = seedRanges[i] + j

    //console.log({ seed })
    let value = seed
    for (let map of maps) {
      //console.log({ map, value })
      for (let mapLine of map) {
        if (value >= mapLine[1] && value < mapLine[1] + mapLine[2]) {
          let offset = value - mapLine[1]
          value = mapLine[0] + offset
          break
        }
      }
      //console.log('value after map:', value)
    }

    if (min == 0 || value < min) {
      min = value
    }
  }
}

console.log(min)

function isNumber(s: string) {
  return !isNaN(parseInt(s))
}
