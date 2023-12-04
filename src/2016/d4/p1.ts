import { readLinesFromFile } from '../../utils'
const lines = readLinesFromFile(__dirname + '/data.txt')

let sum = 0

for (const line of lines) {
  console.log('---------')
  let isDecoy = false
  const splitLine = line.split('-')
  const data = splitLine.at(-1)
  if (!data) throw new Error('bad data')
  splitLine[splitLine.length - 1] = ''
  let name = splitLine.join('')
  let splitData = data.split('[')
  let id = parseInt(splitData[0])
  let checksum = splitData[1].replace(']', '')
  console.log(name + ' | ' + id + ' | ' + checksum)

  //convert name to array of letters
  let letters = name.split('')

  //count letters
  let letterCount: any = {}
  for (const letter of letters) {
    if (!letterCount[letter]) letterCount[letter] = 0
    letterCount[letter] += 1
  }

  console.log(letterCount)

  //sort letters by count
  let sortedLetters = Object.keys(letterCount).sort((a, b) => {
    if (letterCount[a] > letterCount[b]) return -1
    if (letterCount[a] < letterCount[b]) return 1
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })
  console.log(sortedLetters)

  //get checksum
  let calculatedChecksum = ''
  for (let i = 0; i < 5; i++) {
    calculatedChecksum += sortedLetters[i]
  }

  //compare checksums
  if (calculatedChecksum != checksum) {
    console.log('Is a decoy')
    isDecoy = true
  }

  if (!isDecoy) {
    sum += id
    console.log('Is not a decoy')
  }
}

console.log(sum)
