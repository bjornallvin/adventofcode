import { readLinesFromFile } from '../../utils'

let instructions = 'LR'
instructions =
  'LRLRRRLRRLRLRRRLRRLLRRRLRLRLRLRRLRRRLRRLLRLRLRRRLRLLRRLRRLRLLRRLLRRLRRRLLRRLRRLRRRLRRRLRRRLRLRRLRRRLLRRLRRLRRRLRLRRRLRRLRRRLRRRLRLRLRLRLRLRLLRRLLLLRLRRRLRRRLLRRLRLRLLRRRLRLRRLRRRLLLLRRRLLRRLRRLRRLLRLLLLRLRRRLRLRRLRRLLRRRLRRLRLRRLRRRLLRRRLLRLRRLRRLLRRRLLRLRRLRLRRLLLRRRR'

console.log(instructions.length)

let lines = readLinesFromFile(__dirname + '/data.txt')
  .map((p) => p.split(' = '))
  .map((p) => [p[0], p[1].slice(1, -1).split(', ')])

console.log(lines)

let mapSet: any = {}

lines.forEach((line) => {
  mapSet[line[0] as string] = line[1]
})
console.log(mapSet)
type Node = { node: string; instructions: [string, string]; steps: number }

let nodes: Node[] = Object.keys(mapSet)
  .filter((k) => k.at(-1) === 'A')
  .map((k) => ({ node: k, instructions: mapSet[k], steps: 0 }))

console.log({ nodes })

let step = 0

while (!eachNodeEndsInZ(nodes)) {
  let idx = step % instructions.length
  let instruction = instructions[idx]

  for (let i = 0; i < nodes.length; i++) {
    if (!endsInZ(nodes[i].node)) {
      if (instruction === 'L') nodes[i].node = mapSet[nodes[i].node][0]
      else if (instruction === 'R') nodes[i].node = mapSet[nodes[i].node][1]
      nodes[i].steps += 1
    }
  }
  step++
}

console.log({ nodes })

let l = BigInt(findLeastCommonMultiple(nodes))

//console.log(l.toString())

function gcd(a: number, b: number): number {
  // Calculate the Greatest Common Divisor (GCD) of a and b
  if (!b) return a
  return gcd(b, a % b)
}

function lcm(a: number, b: number) {
  // Calculate the Least Common Multiple (LCM) of a and b
  return Math.abs(a * b) / gcd(a, b)
}

function lcmArray(arr: number[]) {
  // Calculate the LCM of an array of numbers
  return arr.reduce((acc, curr) => lcm(acc, curr), 1)
}

// Example usage
let numbers = nodes.map((n) => n.steps)
console.log(`The LCM of [${numbers.join(', ')}] is ${lcmArray(numbers)}`)

function findLeastCommonMultiple(nodes: Node[]) {
  let lcm = 1
  nodes.forEach((n) => {
    lcm = lcm * n.steps
  })
  return lcm
}

function endsInZ(node: string) {
  return node.at(-1) === 'Z'
}

function eachNodeEndsInZ(nodes: Node[]) {
  return nodes.every((n) => n.node.at(-1) === 'Z')
}

function allNodesEndInZ(nodes: string[]) {
  return nodes.every((n) => n.at(-1) === 'Z')
}

function anyNodeEndsInZ(nodes: string[]) {
  return nodes.some((n) => n.at(-1) === 'Z')
}

function twoNodesEndInZ(nodes: string[]) {
  return nodes.filter((n) => n.at(-1) === 'Z').length === 2
}

function threeNodesEndInZ(nodes: string[]) {
  return nodes.filter((n) => n.at(-1) === 'Z').length === 3
}
