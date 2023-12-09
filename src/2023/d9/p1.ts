import { readLinesFromFile } from '../../utils'

let lines = readLinesFromFile(__dirname + '/data.txt').map((l) =>
  l.split(' ').map((p) => parseInt(p)),
)

console.log(lines)

let values = []

for (let i = 0; i < lines.length; i++) {
  let line = lines[i]
  let value = extraPolateValue(line)
  values.push(value)
}

console.log({ values })
let sum = values.reduce((a, b) => a + b, 0)
console.log({ sum })

function extraPolateArray(line: number[]) {
  let array: number[] = []
  let sum = 0
  for (let i = 0; i < line.length - 1; i++) {
    array.push(line[i + 1] - line[i])
    sum += line[i + 1] - line[i]
  }
  return { array, sum }
}

function extraPolateValue(line: number[]) {
  let arrays = [line]

  let sum = 0

  let extraArray = [...line]

  do {
    let result = extraPolateArray(extraArray)
    console.log({ result })
    extraArray = result.array
    sum = result.sum
    if (sum !== 0) arrays.push(result.array)
  } while (sum !== 0)

  console.log({ arrays })

  let value = arrays.reduceRight((acc, curr, index) => {
    console.log({ acc, curr, index })
    return (acc + curr[curr.length - 1]) as number
  }, 0)

  console.log({ value })

  return value
}
