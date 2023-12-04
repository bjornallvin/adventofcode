import { readLinesFromFile } from '../../utils'

const lines = readLinesFromFile(__dirname + '/data.txt')

let sum = 0
let cardCount: Record<string, number> = {}

for (let i = 0; i < lines.length; i++) {
  console.log('-------', i, '---------')
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

  console.log(winners.join(','), ' | ', mine.join(','))

  cardCount[i] = cardCount[i] || 1

  let cardValue = 0
  for (let j = 0; j < mine.length; j++) {
    if (winners.includes(mine[j])) {
      console.log('winning card', mine[j], 'in', winners.join(','))
      cardValue += 1
    }
  }

  for (let j = i + 1; j < i + cardValue + 1; j++) {
    cardCount[j] = cardCount[j] ? cardCount[j] + cardCount[i] : cardCount[i] + 1
  }

  console.log(cardCount)
}

console.log(Object.values(cardCount).reduce((a, b) => a + b, 0))
