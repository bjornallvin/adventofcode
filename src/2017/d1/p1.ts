import { readStringFromFile } from '../../utils'

let digits = readStringFromFile(__dirname + '/data.txt').split('')

console.log(digits)

let sum = 0

for (let i = 0; i < digits.length; i++) {
  let next = i + 1 === digits.length ? 0 : i + 1

  if (digits[i] === digits[next]) {
    sum += parseInt(digits[i])
  }
}

console.log(sum)
