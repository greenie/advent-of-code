import fs from 'fs'
import { add } from '../../util.mjs'

const input = fs.readFileSync('./input', 'utf-8').trim().split('\n').map(Number)

const findInvalid = (numbers, preamble) => {
  let invalidNumber

  for (let i = preamble; i < numbers.length; i++) {
    let valid = false

    for (let j = i - preamble; j < i; j++) {
      for (let k = i - preamble; k < i; k++) {
        if (!valid && input[j] + input[k] === input[i]) {
          valid = true
        }
      }
    }

    if (!valid) {
      invalidNumber = input[i]
      break
    }
  }

  return invalidNumber
}

const findRange = (numbers, target) => {
  let i = 0
  const contiguous = []

  while (i < numbers.length) {
    const num = numbers[i]
    const sum = [...contiguous, num].reduce(add)

    if (sum === target) {
      contiguous.push(num)
      return Math.min(...contiguous) + Math.max(...contiguous)
    }

    if (sum < target) {
      contiguous.push(num)
      i += 1
    } else {
      contiguous.shift()
    }
  }
}

const invalidNumber = findInvalid(input, 25)

// part 1
console.log(invalidNumber)

// part 2
console.log(findRange(input, invalidNumber))
