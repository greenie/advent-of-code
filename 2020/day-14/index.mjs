import fs from 'fs'
import { add } from '../util.mjs'

const input = fs.readFileSync('./input', 'utf-8').trim().split('\n')

const toBinaryString = (number, length = 36) => number.toString(2).padStart(length, '0')

const combinations = n => {
  const max = 2**n
  const result = []

  for (let i = 0; i < max; i++) {
    result.push(toBinaryString(i, n))
  }

  return result
}

const parseMask = mask => ({
  raw: mask,
  combinations: combinations(mask.match(/X/g).length)
})

const parseInput = input => input.reduce((acc, line) => {
  const i = acc.length - 1

  if (/^mask/.test(line)) {
    acc.push({ mask: parseMask(line.slice(7)), commands: [] })
  } else {
    const { groups: { address, value } }= /^mem\[(?<address>\d+)\] = (?<value>\d+)$/g.exec(line)
    acc[i].commands.push([parseInt(address), parseInt(value)])
  }

  return acc
}, [])

const program = parseInput(input)

const applyMaskToValues = program => {
  const memory = new Map()

  program.forEach(({ mask, commands }) => {
    commands.forEach(([address, value]) => {
      const result = toBinaryString(value).split('').map((c, i) => {
        switch (mask.raw.charAt(i)) {
          case '1':
            return '1'

          case '0':
            return '0'

          case 'X':
          default:
            return c
        }
      })

      memory.set(address, parseInt(result.join(''), 2))
    })
  })

  return [...memory.values()].reduce(add)
}

const applyMaskToAddresses = program => {
  const memory = new Map()

  program.forEach(({ mask, commands }) => {
    commands.forEach(([address, value]) => {
      const binaryAddress = toBinaryString(address)

      mask.combinations.forEach(combination => {
        let xPos = 0
        const address = mask.raw.split('').map((c, i) => {
          if (c === 'X') {
            return combination[xPos++]
          }

          return parseInt(c) | parseInt(binaryAddress[i])
        }).join('')

        memory.set(address, value)
      })
    })
  })

  return [...memory.values()].reduce(add)
}

// part 1
console.log(applyMaskToValues(program))

// part 2
console.log(applyMaskToAddresses(program))
