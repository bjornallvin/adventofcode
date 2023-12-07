import { get } from 'prompt'
import { readLinesFromFile } from '../../utils'

let hands: Array<string[]> = readLinesFromFile(__dirname + '/data.txt').map(
  (p) => p.split(' '),
)
console.log(hands)

const FIVE = 7
const FOUR = 6
const FULL = 5
const THREE = 4
const TWOPAIRS = 3
const PAIR = 2
const HIGH = 1

let hands2: Record<string, any>[] = []
for (let hand of hands) {
  //let cards = hand[0].split('').sort()

  let type = getHandTypeWithJoker(hand[0])

  console.log('types', type)

  hands2.push({
    cards: hand[0],
    typeValue: type,
    //highest: cardToValue(hand[0][0]),

    bid: parseInt(hand[1]),
  })
}

console.log(hands2)

const sorted = hands2.sort((a, b) => {
  if (a.typeValue === b.typeValue) {
    console.log('same type', a.cards, b.cards)
    for (let i = 0; i < a.cards.length; i++) {
      if (a.cards[i] === b.cards[i]) {
        console.log('same card', a.cards[i], b.cards[i])
        continue
      }
      let diff = cardToValue(a.cards[i]) - cardToValue(b.cards[i])
      console.log('different card', a.cards[i], b.cards[i], diff)

      return diff
    }
    return 0
  } else {
    return a.typeValue - b.typeValue
  }
})

console.log(sorted)

let sum = sorted.reduce((acc, curr, index) => {
  console.log('Adding', index + 1, curr.cards)
  return acc + (index + 1) * curr.bid
}, 0)

console.log(sum)

function reduceTypes(types: number[]): number {
  let typeValue = HIGH
  if (types.length === 1) {
    typeValue = types[0]
  }
  if (types.length === 2) {
    if (types[0] === THREE) {
      typeValue = FULL
    }
    if (types[0] === PAIR) {
      if (types[1] === PAIR) {
        typeValue = TWOPAIRS
      } else {
        typeValue = FULL
      }
    }
  }
  return typeValue
}

function getHandTypeWithJoker(cards: string): number {
  if (cards.includes('J')) {
    return [
      reduceTypes(getHandType(cards.replaceAll('J', '2'))),
      reduceTypes(getHandType(cards.replaceAll('J', '3'))),
      reduceTypes(getHandType(cards.replaceAll('J', '4'))),
      reduceTypes(getHandType(cards.replaceAll('J', '5'))),
      reduceTypes(getHandType(cards.replaceAll('J', '6'))),
      reduceTypes(getHandType(cards.replaceAll('J', '7'))),
      reduceTypes(getHandType(cards.replaceAll('J', '8'))),
      reduceTypes(getHandType(cards.replaceAll('J', '9'))),
      reduceTypes(getHandType(cards.replaceAll('J', 'T'))),
      reduceTypes(getHandType(cards.replaceAll('J', 'Q'))),
      reduceTypes(getHandType(cards.replaceAll('J', 'K'))),
      reduceTypes(getHandType(cards.replaceAll('J', 'A'))),
    ].sort((a, b) => b - a)[0]
  } else {
    return reduceTypes(getHandType(cards))
  }
}

function getHandType(cards: string): number[] {
  console.log('getHandType', cards)
  if (cards.length < 2) return []

  const element = cards[0]

  let test = cards.replaceAll('J', element).replaceAll(element, '')

  console.log('Leftover:', test)

  let diff = cards.length - test.length

  if (diff === 5) {
    return [FIVE]
  }

  if (diff === 4) {
    return [FOUR]
  }

  if (diff === 3) {
    console.log('found a three in ', cards)
    return [THREE, ...getHandType(test)]
  }

  if (diff === 2) {
    return [PAIR, ...getHandType(test)]
  } else {
    return getHandType(test)
  }
}

function cardToValue(card: string): number {
  if (card === 'A') return 14
  if (card === 'K') return 13
  if (card === 'Q') return 12
  if (card === 'J') return 1
  if (card === 'T') return 10
  return parseInt(card)
}
