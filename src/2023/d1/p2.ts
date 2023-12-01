import {readLinesFromFile} from "../../utils"


const x = readLinesFromFile(__dirname + "/data.txt");

let sum = 0


for (const line of x) {

    let first = findFirst(line)
    let last = findLast(line)

    let number = parseInt(`${first}${last}`)

    sum += number
}   


console.log(sum)    


function findFirst(line:string){

    for (let x=0; x<line.length; x++) {

        if (!isNaN(parseInt(line[x]))) {
            return line[x]  
        }


        if (line.slice(x).startsWith("one")) {
            return 1
        }
        if (line.slice(x).startsWith("two")) {
            return 2
        }
        if (line.slice(x).startsWith("three")) {
            return 3
        }
        if (line.slice(x).startsWith("four")) {
            return 4
        }
        if (line.slice(x).startsWith("five")) {
            return 5
        }
        if (line.slice(x).startsWith("six")) {
            return 6
        }
        if (line.slice(x).startsWith("seven")) {
            return 7
        }
        if (line.slice(x).startsWith("eight")) {
            return 8
        }
        if (line.slice(x).startsWith("nine")) {
            return 9
        }
        if (line.slice(x).startsWith("zero")) {
            return 0
        }

    }
}

function findLast(line:string){

    for (let x=line.length-1; x>=0; x--) {

        if (!isNaN(parseInt(line[x]))) {
            return line[x]  
        }

        if (line.slice(x).startsWith("one")) {
            return 1
        }
        if (line.slice(x).startsWith("two")) {
            return 2
        }
        if (line.slice(x).startsWith("three")) {
            return 3
        }
        if (line.slice(x).startsWith("four")) {
            return 4
        }
        if (line.slice(x).startsWith("five")) {
            return 5
        }
        if (line.slice(x).startsWith("six")) {
            return 6
        }
        if (line.slice(x).startsWith("seven")) {
            return 7
        }
        if (line.slice(x).startsWith("eight")) {
            return 8
        }
        if (line.slice(x).startsWith("nine")) {
            return 9
        }
        if (line.slice(x).startsWith("zero")) {
            return 0
        }

    }
}




