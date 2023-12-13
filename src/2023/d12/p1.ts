import { readLinesFromFile } from '../../utils'

let lines = readLinesFromFile(__dirname + '/data.txt').map((l) => l.split(' '))

console.log(lines)
let sum = 0

for (let line of lines) {
  let condition = line[0]
  let springs = line[1].split(',').map((b) => parseInt(b))

  sum += getArrangements(condition, 0, springs, 0, 0)
}

console.log(sum)

function getArrangements(
  conditions: string,
  conditionIndex: number,
  damagedSpringsBlocks: number[],
  damagedSpringBlockIndex: number,
  damagedSpringBlockLength: number,
): number {
  var desiredBlockLength = damagedSpringsBlocks[damagedSpringBlockIndex]

  if (conditionIndex >= conditions.length) {
    // Reached the end of the configuration

    if (damagedSpringBlockIndex < damagedSpringsBlocks.length - 1) {
      // Invalid configuration, Not all blocks filled.
      return 0
    }

    if (
      damagedSpringBlockIndex == damagedSpringsBlocks.length - 1 &&
      damagedSpringBlockLength < desiredBlockLength
    ) {
      // Invalid configuration, Incomplete block.
      return 0
    }
    // Valid configuration, All blocks filled.
    return 1
  }

  var currentCondition = conditions[conditionIndex]

  if (currentCondition == '.') {
    // Spring is OK

    if (
      damagedSpringBlockLength > 0 &&
      damagedSpringBlockLength < desiredBlockLength
    ) {
      // Invalid configuration, Incomplete block.
      return 0
    }

    if (
      damagedSpringBlockLength > 0 &&
      damagedSpringBlockIndex < damagedSpringsBlocks.length
    ) {
      // Move on to next block.
      damagedSpringBlockIndex++
    }

    return getArrangements(
      conditions,
      conditionIndex + 1,
      damagedSpringsBlocks,
      damagedSpringBlockIndex,
      0,
    )
  } else if (currentCondition == '#') {
    // Spring is damaged add one to block

    if (
      damagedSpringBlockLength >= desiredBlockLength ||
      desiredBlockLength == undefined
    ) {
      // Invalid configuration, block is already full.
      return 0
    }

    return getArrangements(
      conditions,
      conditionIndex + 1,
      damagedSpringsBlocks,
      damagedSpringBlockIndex,
      damagedSpringBlockLength + 1,
    )
  }

  var arrangements = 0

  if (damagedSpringBlockLength < desiredBlockLength) {
    // Try to add a damaged spring to block
    arrangements += getArrangements(
      conditions.substring(0, conditionIndex) +
        '#' +
        conditions.substring(conditionIndex + 1),
      conditionIndex + 1,
      damagedSpringsBlocks,
      damagedSpringBlockIndex,
      damagedSpringBlockLength + 1,
    )
  }

  // Ok spring
  if (
    damagedSpringBlockLength > 0 &&
    damagedSpringBlockLength < desiredBlockLength
  ) {
    // Invalid configuration, Incomplete block.
    return arrangements
  }

  if (
    damagedSpringBlockLength == desiredBlockLength &&
    damagedSpringBlockIndex < damagedSpringsBlocks.length
  ) {
    // Move on to next block.
    damagedSpringBlockIndex++
  }

  // Try to add an Ok spring
  arrangements += getArrangements(
    conditions.substring(0, conditionIndex) +
      '.' +
      conditions.substring(conditionIndex + 1),
    conditionIndex + 1,
    damagedSpringsBlocks,
    damagedSpringBlockIndex,
    0,
  )

  return arrangements
}
