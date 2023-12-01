import {readLinesFromFile} from "../../utils"


const x = readLinesFromFile(__dirname + "/data.txt");

let sum = 0

for (const line of x) {

    let digits = []

    for (const char of line) {
      
        if (!isNaN(parseInt(char))) {
            digits.push(parseInt(char))
        }
    }

    let number = parseInt(`${digits[0]}${digits[0]}`)

    if (digits.length > 1) {
        number = parseInt(`${digits[0]}${digits.at(-1)}`)
    }
    


    sum += number
}   


console.log(sum)    




