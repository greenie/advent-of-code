import fs from 'fs'
import { add } from '../../util.mjs'

const seats = fs.readFileSync('./input').toString().split('\n').filter(n => n)

const EMPTY = 'L'
const OCCUPIED = '#'
const FLOOR = '.'
const UNOCCUPIED = [EMPTY, FLOOR]

const applyRules = seats => {
  const newSeats = []

  seats.forEach((row, i, arr) => {
    const prev = arr[i - 1]?.split('')
    const curr = row.split('')
    const next = arr[i + 1]?.split('')
    const newRow = []

    for (let j = 0; j < curr.length; j++) {
      const adjacent = [
        prev?.[j - 1], prev?.[j], prev?.[j + 1],
        curr[j - 1], curr[j + 1],
        next?.[j - 1], next?.[j], next?.[j + 1]
      ].filter(a => a)

      if (curr[j] === EMPTY && adjacent.every(seat => UNOCCUPIED.includes(seat))) {
        newRow.push(OCCUPIED)
      } else if (curr[j] === OCCUPIED && adjacent.filter(seat => seat === OCCUPIED).length >= 4) {
        newRow.push(EMPTY)
      } else {
        newRow.push(curr[j])
      }
    }

    newSeats.push(newRow.join(''))
  })

  return newSeats
}

// part 1
let newSeats = [...seats]
let occupiedSeats = 0

while (true) {
  const seatsAfterApply = applyRules(newSeats)

  if (JSON.stringify(seatsAfterApply) === JSON.stringify(newSeats)) {
    occupiedSeats = seatsAfterApply
      .map(row => row.split(''))
      .flat()
      .filter(seat => seat === OCCUPIED)
      .reduce(add)
      .length

    break
  }

  newSeats = seatsAfterApply
}

console.log(occupiedSeats)
