import { readLinesFromFile } from '../../utils'

const lines = readLinesFromFile(__dirname + '/data.txt')

let sum = 0

for (let i = 0; i < lines.length; i++) {
  let [winners, mine] = lines[i]
    .slice(lines[i].indexOf(':') + 1)
    .trim()
    .split('|')
    .map((p) => p.trim())
    .map((p) =>
      p
        .split(' ')
        .filter((p) => p != '')
        .map((p) => parseInt(p.trim())),
    )

  console.log(winners, mine)

  let cardValue = 0
  for (let j = 0; j < mine.length; j++) {
    if (winners.includes(mine[j])) {
      console.log('winning card', mine[j], 'in', winners.join(','))
      cardValue = cardValue > 0 ? 2 * cardValue : 1
    }
  }

  sum += cardValue
}

console.log(sum)
