import fs from 'fs'

const numbers = fs.readFileSync('./input', 'utf-8').trim().split(',').map(Number)

const getSpokenNumber = (input, turns) => {
  const spoken = new Map(input.map((n, i) => [n, i + 1]))
  let temp = NaN
  let last = input[input.length - 1]

  for (let i = input.length; i < turns; i++) {
    last = spoken.has(last) ? i - spoken.get(last) : 0
    spoken.set(temp, i)
    temp = last
  }

  return last
}

// part 1
console.log(getSpokenNumber(numbers, 2020))

// part 2
console.log(getSpokenNumber(numbers, 30000000))
