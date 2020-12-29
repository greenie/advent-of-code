import fs from 'fs'
import { product } from '../util.mjs'

const input = fs.readFileSync('./input', 'utf-8')
  .trim()
  .split('\n')
  .map(row => row.split(''))

const ACTIVE = '#'

const neighbours = coords => {
  const ranges = coords.split(',').map(c => {
    c = Number(c)
    return [c - 1, c, c + 1]
  })

  return product(...ranges).map(c => c.join(','))
}

const activeNeighboursCount = (space, coords) =>
  neighbours(coords).reduce((acc, value) => {
    if (value !== coords && space.has(value)) {
      acc += 1
    }

    return acc
  }, 0)

const allNeighbours = space => {
  const all = new Set()

  for (const coords of space) {
    for (const neighbour of neighbours(coords)) {
      all.add(neighbour)
    }
  }

  return all
}

const cycle = (iterations, space) => {
  if (iterations === 0) {
    return space
  }

  const newSpace = new Set()
  const allSpaceNeighbours = allNeighbours(space)

  for (const p of allSpaceNeighbours) {
    const count = activeNeighboursCount(space, p)

    if (count === 3 || (count === 2 && space.has(p))) {
      newSpace.add(p)
    }
  }

  return cycle(iterations - 1, newSpace)
}

const createSpace = (dimensions, input) => {
  const space = new Set()
  const rest = new Array(dimensions - 2).fill(0).join(',')

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === ACTIVE) {
        space.add(`${rest},${y},${x}`)
      }
    }
  }

  return space
}

const solve = (dimensions, iterations, input) => {
  const space = createSpace(dimensions, input)
  return cycle(iterations, space)
}

// part 1
console.log(solve(3, 6, input).size)

// part 2
console.log(solve(4, 6, input).size)
