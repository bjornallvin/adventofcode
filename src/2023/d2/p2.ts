import {readLinesFromFile} from "../../utils"


const x = readLinesFromFile(__dirname + "/data.txt");

let sum = 0

let max = [12,13,14]

for (let line of x) {
    console.log(line)
    
    let min =[0,0,0]

    let lineData = line.replace("Game ", "").split(": ")

  

    let id = parseInt(lineData[0].trimStart())
  
    let sets = lineData[1].split("; ")
    for (let set of sets) {
        console.log(set)
        let colors = setToColors(set)
        console.log(colors)
        min = calcNewMin(colors,min)

    }

    console.log(min)
    let power = min[0] * min[1] * min[2]
    console.log(power)
    sum += power

}


console.log(sum)    


function calcNewMin(colors: number[], min: number[]) {
    
    min[0] = Math.max(min[0],colors[0])
    min[1] = Math.max(min[1],colors[1])
    min[2] = Math.max(min[2],colors[2])
    
    return min
}

function setToColors(set: string) {
    console.log(set)
    let setColors = set.split(", ")
    console.log(setColors)
    let colors = [0,0,0]
    for (let setColor of setColors) {
        let setColorData = setColor.split(" ")
        if (setColorData[1] === "red") 
            colors[0] = parseInt(setColorData[0])
        else if (setColorData[1] === "green") 
            colors[1] = parseInt(setColorData[0])
        else if (setColorData[1] === "blue")
            colors[2] = parseInt(setColorData[0])
        else throw new Error("Unknown color: " + setColorData[1])

    }
    return colors
}

function colorsFit(colors: number[]) {
    for (let i = 0; i < 3; i++) {
        if (colors[i] > max[i]) return false
    }
    return true
}


