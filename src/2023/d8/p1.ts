import { readLinesFromFile } from '../../utils'

let instructions = 'LLR'
instructions =
  'LRLRRRLRRLRLRRRLRRLLRRRLRLRLRLRRLRRRLRRLLRLRLRRRLRLLRRLRRLRLLRRLLRRLRRRLLRRLRRLRRRLRRRLRRRLRLRRLRRRLLRRLRRLRRRLRLRRRLRRLRRRLRRRLRLRLRLRLRLRLLRRLLLLRLRRRLRRRLLRRLRLRLLRRRLRLRRLRRRLLLLRRRLLRRLRRLRRLLRLLLLRLRRRLRLRRLRRLLRRRLRRLRLRRLRRRLLRRRLLRLRRLRRLLRRRLLRLRRLRLRRLLLRRRR'

let lines = readLinesFromFile(__dirname + '/data.txt')
  .map((p) => p.split(' = '))
  .map((p) => [p[0], p[1].slice(1, -1).split(', ')])

console.log(lines)

let set: any = {}

lines.forEach((line) => {
  set[line[0] as string] = line[1]
})
console.log(set)

let steps = 0

let current = 'AAA'

while (current !== 'ZZZ') {
  let idx = steps % instructions.length
  let instruction = instructions[idx]

  if (instruction === 'L') current = set[current][0]
  else if (instruction === 'R') current = set[current][1]

  steps++
  console.log({ current, instruction, idx, steps })
}

console.log(steps)
