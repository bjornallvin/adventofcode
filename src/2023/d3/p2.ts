import { readLinesFromFile } from '../../utils'

const lines = readLinesFromFile(__dirname + '/data.txt')

let sum = 0

let currLine: string = ''
let prevLine: string | undefined
let nextLine: string | undefined
let lineIndex: 0
let lineLength = lines[0].length

for (lineIndex = 0; lineIndex < lines.length; lineIndex++) {
  currLine = lines[lineIndex]
  prevLine = lineIndex > 0 ? lines[lineIndex - 1] : undefined
  nextLine = lineIndex + 1 < lines.length ? lines[lineIndex + 1] : undefined
  sum += checkLine()
}

console.log(sum)

function checkLine() {
  let lineSum = 0
  console.log('--------')

  console.log('checking line: ', currLine)
  for (let i = 0; i < currLine.length; i++) {
    if (currLine[i] === '*') {
      //console.log('line has asterisk')
      lineSum += getGearRatio(i)
      //console.log({ lineSum })
    }
  }
  return lineSum
}

function getGearRatio(pos: number) {
  let adjacentNumbers = getAdjacentNumbers(pos)
  if (adjacentNumbers.length === 2) {
    console.log('found gear: ', adjacentNumbers)
    return adjacentNumbers[0] * adjacentNumbers[1]
  }
  return 0
}

function getAdjacentNumbers(pos: number) {
  let numbers: number[] = []

  let number

  if (prevLine) {
    number = getAdjacentNumber(pos, -1, -1)
    if (number) numbers.push(number)
    number = getAdjacentNumber(pos, -1, 0)
    if (number) numbers.push(number)
    number = getAdjacentNumber(pos, -1, 1)
    if (number) numbers.push(number)
  }
  if (nextLine) {
    number = getAdjacentNumber(pos, 1, -1)
    if (number) numbers.push(number)
    number = getAdjacentNumber(pos, 1, 0)
    if (number) numbers.push(number)
    number = getAdjacentNumber(pos, 1, 1)
    if (number) numbers.push(number)
  }

  if (pos > 0) {
    number = getAdjacentNumber(pos, 0, -1)
    if (number) numbers.push(number)
  }
  if (pos + 1 < currLine.length) {
    number = getAdjacentNumber(pos, 0, 1)
    if (number) numbers.push(number)
  }

  let set = new Set(numbers)

  numbers = Array.from(set)

  //console.log({ numbers })
  return numbers
}

function getAdjacentNumber(
  pos: number,
  lineDelta: number,
  posDelta: number,
): number | undefined {
  let line = lines[lineIndex + lineDelta]

  if (isNumber(line[pos + posDelta])) {
    //console.log('found an adjacent digit:', line[pos + posDelta], 'at', {
    //  lineDelta,
    //  posDelta,
    //})
    //find start of number
    let numberStart = pos + posDelta
    while (isNumber(line[numberStart]) && numberStart > -1) {
      //console.log('finding start:', numberStart, line[numberStart])
      numberStart--
    }
    let number = ''
    numberStart++

    //find end of number
    while (isNumber(line[numberStart]) && numberStart < line.length) {
      //console.log('finding end:', numberStart, line[numberStart], number)
      number += line[numberStart]
      numberStart++
    }
    //console.log('found a adjacent number:', number)
    return parseInt(number)
  }
  return
}

function lineSum(currLine: string, prevLine?: string, nextLine?: string) {
  let lsum = 0
  console.log(currLine)
  let num = ''
  let included = false

  for (let i = 0; i < currLine.length; i++) {
    const curr = currLine[i]
    const currIsNumber = isNumber(currLine[i])
    const nextIsNumber = i + 1 < currLine.length && isNumber(currLine[i + 1])
    //console.log(currLine[i], isNumber(currLine[i]), prevLine, nextLine)

    if (currIsNumber) {
      num += curr
      included = included || positionIncluded(i)
      //console.log('tracking num', curr, num, positionIncluded(i))
      if (!nextIsNumber) {
        if (included) lsum += parseInt(num)
        console.log('tracking ends', num, included, lsum)
        num = ''
        included = false
      }
    }
  }

  return lsum

  function positionIncluded(pos: number) {
    let result = false
    if (prevLine) {
      if (pos > 0) result = result || isSymbol(prevLine[pos - 1])
      result = result || isSymbol(prevLine[pos])
      if (pos + 1 < prevLine.length)
        result = result || isSymbol(prevLine[pos + 1])
    }
    if (nextLine) {
      if (pos > 0) result = result || isSymbol(nextLine[pos - 1])
      result = result || isSymbol(nextLine[pos])
      if (pos + 1 < nextLine.length)
        result = result || isSymbol(nextLine[pos + 1])
    }
    if (pos > 0) result = result || isSymbol(currLine[pos - 1])
    if (pos + 1 < currLine.length)
      result = result || isSymbol(currLine[pos + 1])

    return result
  }
}
function isSymbol(s: string) {
  let result = !isNumber(s) && s !== '.'
  //console.log(s, ' a symbol?', result)
  return result
}

function isNumber(s: string) {
  return !isNaN(parseInt(s))
}
