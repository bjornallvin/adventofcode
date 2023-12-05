import { readStringFromFile } from '../../utils'

let digits = readStringFromFile(__dirname + '/data.txt').split('')

//digits = '123123'.split('')

console.log(digits)

let sum = 0

for (let i = 0; i < digits.length; i++) {
  let next = i + digits.length / 2

  if (next >= digits.length) next -= digits.length

  if (digits[i] === digits[next]) {
    sum += parseInt(digits[i])
  }
}

console.log(sum)
