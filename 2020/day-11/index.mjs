import fs from 'fs'
import { add } from '../../util.mjs'

const seats = fs.readFileSync('./input').toString().split('\n').filter(n => n)

const EMPTY = 'L'
const OCCUPIED = '#'
const FLOOR = '.'
const UNOCCUPIED = [EMPTY, FLOOR]
const ALL_SEATS = [EMPTY, OCCUPIED]

const getVisibleSeats = (adjacent, row, col, seats) => {
  const rows = seats.length
  const columns = seats[0].length

  let iterations = adjacent ? 1 : Math.max(rows, columns)
  let directions = {
    n: undefined,
    ne: undefined,
    e: undefined,
    se: undefined,
    s: undefined,
    sw: undefined,
    w: undefined,
    nw: undefined
  }

  for (let i = 1; i <= iterations; i++) {
    const prev = seats[row - i]?.split('')
    const curr = seats[row].split('')
    const next = seats[row + i]?.split('')

    Object.keys(directions).forEach(direction => {
      switch (direction) {
        case 'n':
          if (!ALL_SEATS.includes(directions.n)) {
            directions.n = prev?.[col]
          }
          break
        case 'ne':
          if (!ALL_SEATS.includes(directions.ne)) {
            directions.ne = prev?.[col + i]
          }
          break
        case 'e':
          if (!ALL_SEATS.includes(directions.e)) {
            directions.e = curr[col + i]
          }
          break
        case 'se':
          if (!ALL_SEATS.includes(directions.se)) {
            directions.se = next?.[col + i]
          }
          break
        case 's':
          if (!ALL_SEATS.includes(directions.s)) {
            directions.s = next?.[col]
          }
          break
        case 'sw':
          if (!ALL_SEATS.includes(directions.sw)) {
            directions.sw = next?.[col - i]
          }
          break
        case 'w':
          if (!ALL_SEATS.includes(directions.w)) {
            directions.w = curr[col - i]
          }
          break
        case 'nw':
          if (!ALL_SEATS.includes(directions.nw)) {
            directions.nw = prev?.[col - i]
          }
      }
    })

    if (Object.values(directions).every(direction => [...ALL_SEATS, undefined].includes(direction))) {
      break
    }
  }

  return Object.values(directions).filter(seat => seat)
}

const applyRules = (adjacent, tolerance, seats) => {
  const newSeats = []

  seats.forEach((row, i) => {
    const curr = row.split('')
    const newRow = []

    for (let j = 0; j < curr.length; j++) {
      const seat = curr[j]
      const visibleSeats = getVisibleSeats(adjacent, i, j, seats)

      if (seat === EMPTY && visibleSeats.every(seat => UNOCCUPIED.includes(seat))) {
        newRow.push(OCCUPIED)
      } else if (seat === OCCUPIED && visibleSeats.filter(seat => seat === OCCUPIED).length >= tolerance) {
        newRow.push(EMPTY)
      } else {
        newRow.push(seat)
      }
    }

    newSeats.push(newRow.join(''))
  })

  return newSeats
}

const occupiedSeats = (adjacent, tolerance, seats) => {
  let newSeats = [...seats]
  let occupiedSeats = 0

  while (true) {
    const seatsAfterApply = applyRules(adjacent, tolerance, newSeats)

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

  return occupiedSeats
}

// part 1
console.log(occupiedSeats(true, 4, seats))

// part 2
console.log(occupiedSeats(false, 5, seats))
