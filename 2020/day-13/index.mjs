import fs from 'fs'
import { multiply, sortAsc } from '../../util.mjs'

const input = fs.readFileSync('./input').toString().split('\n').filter(n => n)

const departureTime = parseInt(input[0])
const buses = input[1].split(',')

const modInv = (a, mod) => {
  const b = a % mod

  for (let i = 1n; i <= mod; i++) {
    if ((b * i) % mod === 1n) {
      return i
    }
  }

  return 1n
}

const chineseRemainder = (numbers, remainders) => {
  const product = numbers.reduce(multiply, 1n)

  const sum = numbers.reduce((acc, num, i) => {
    const p = product / num
    return acc += remainders[i] * p * modInv(p, num)
  }, 0n)

  return sum % product
}

const busesByDepartueTime = buses
  .filter(id => id !== 'x')
  .map(bus => {
    const id = Number(bus)
    return { id, earliestTime: id * Math.ceil(departureTime / id) }
  })
  .sort((a, b) => sortAsc(a.earliestTime, b.earliestTime))

const busesByPosition = buses
  .map((id, i) => ({ i, id }))
  .filter(({ id }) => id !== 'x')
  .map(({ i, id }) => ({
    number: BigInt(id),
    i,
    remainder: BigInt(id - i)
  }))

// part 1
const earliest = busesByDepartueTime[0]
console.log((earliest.earliestTime - departureTime) * earliest.id)

// part 2
const [numbers, remainders] = busesByPosition.reduce((acc, bus) => {
  acc[0].push(bus.number)
  acc[1].push(bus.remainder)
  return acc
}, [[], []])

console.log(chineseRemainder(numbers, remainders))
