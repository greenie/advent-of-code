import fs from 'fs'
import { add } from '../../util.mjs'

const input = fs.readFileSync('./input').toString().split('\n').filter(n => n)

const toBinaryString = number => number.toString(2).padStart(36, '0')

const parseInput = input => input.reduce((acc, line) => {
  const i = acc.length - 1

  if (/^mask/.test(line)) {
    acc.push({ mask: line.slice(7), commands: [] })
  } else {
    const { groups: { address, value } }= /^mem\[(?<address>\d+)\] = (?<value>\d+)$/g.exec(line)
    acc[i].commands.push([parseInt(address), parseInt(value)])
  }

  return acc
}, [])

const program = parseInput(input)
const memory = new Map()

program.forEach(({ mask, commands }) => {
  commands.forEach(([address, value]) => {
    const result = toBinaryString(value).split('').map((c, i) => {
      switch (mask.charAt(i)) {
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

// part 1
console.log([...memory.values()].reduce(add))
