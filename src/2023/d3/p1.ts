import { readLinesFromFile } from '../../utils'

const lines = readLinesFromFile(__dirname + '/data.txt')

let sum = 0

for (let i = 0; i < lines.length; i++) {
  const currLine = lines[i]
  const prevLine = i > 0 ? lines[i - 1] : undefined
  const nextLine = i + 1 < lines.length ? lines[i + 1] : undefined

  sum += lineSum(currLine, prevLine, nextLine)
}

console.log(sum)

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
