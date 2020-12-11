import fs from 'fs'

const numbers = fs.readFileSync('./input').toString().split('\n').map(Number)

const calculateProduct = (allNumbers, target, numbersToSum) => {
  if (numbersToSum === 0) {
    return 1
  }

  if (numbersToSum === 1) {
    if (allNumbers.find(n => n === target)) {
      return target
    } else {
      return 0
    }
  }

  for (const number of allNumbers) {
    const complement = target - number
    const product = calculateProduct(allNumbers, complement, numbersToSum - 1)

    if (product > 0) {
      return number * product
    }
  }

  return 0
}

// part 1
console.log(calculateProduct(numbers, 2020, 2))

// part 2
console.log(calculateProduct(numbers, 2020, 3))
