import { readStringFromFile } from '../../utils'

type Dir = 'N' | 'E' | 'S' | 'W'
type Turn = 'L' | 'R'

const x = readStringFromFile(__dirname + '/data.txt')

let dir: Dir = 'N'
let pos: [number, number] = [0, 0]
let path = Array<[number, number]>()

for (let i of x.split(', ')) {
  console.log('---------i:', i)
  let turn: Turn = i[0] as Turn
  console.log('Turn:', turn)
  let steps = parseInt(i.substring(1))
  console.log('Steps:', steps)
  turnSanta(turn)
  console.log('New dir:', dir)
  if (moveSanta(steps)) break
}

console.log(getDistance())

function getDistance() {
  return Math.abs(pos[0]) + Math.abs(pos[1])
}

function moveSanta(steps: number) {
  let arrived = false
  if (dir == 'N') {
    for (let i = 0; i < steps; i++) {
      pos[1] += 1
      if (beenHereBefore(pos)) {
        arrived = true
        break
      }
      path.push([pos[0], pos[1]])
    }
  } else if (dir == 'E') {
    for (let i = 0; i < steps; i++) {
      pos[0] += 1
      if (beenHereBefore(pos)) {
        arrived = true
        break
      }
      path.push([pos[0], pos[1]])
    }
  }
  if (dir == 'S') {
    for (let i = 0; i < steps; i++) {
      pos[1] -= 1
      if (beenHereBefore(pos)) {
        arrived = true
        break
      }
      path.push([pos[0], pos[1]])
    }
  }
  if (dir == 'W') {
    for (let i = 0; i < steps; i++) {
      pos[0] -= 1
      if (beenHereBefore(pos)) {
        arrived = true
        break
      }
      path.push([pos[0], pos[1]])
    }
  }

  return arrived
}

function beenHereBefore(pos: [number, number]) {
  if (path.find((p) => p[0] == pos[0] && p[1] == pos[1])) {
    console.log('Been here before:', pos)
    return true
  }
  return false
}

function turnSanta(turn: Turn) {
  if (dir == 'N') {
    if (turn == 'L') {
      dir = 'W'
    } else {
      dir = 'E'
    }
  } else if (dir == 'E') {
    if (turn == 'L') {
      dir = 'N'
    } else {
      dir = 'S'
    }
  } else if (dir == 'S') {
    if (turn == 'L') {
      dir = 'E'
    } else {
      dir = 'W'
    }
  } else if (dir == 'W') {
    if (turn == 'L') {
      dir = 'S'
    } else {
      dir = 'N'
    }
  }
}
