import fs from 'fs'

const input = fs.readFileSync('./input', 'utf-8')
  .trim()
  .split('\n')
  .map(l => l.split(''))

const ACTIVE = '#'
const INACTIVE = '.'

const countActive = list => list.reduce((acc, value) => {
  if (value === ACTIVE) {
    return acc += 1
  }

  return acc
},0)

const neighbours = (space, vector) => {
  const { z, y, x } = vector

  return [
    // layer below
    [
      space[z - 1]?.[y - 1]?.[x - 1],
      space[z - 1]?.[y - 1]?.[x],
      space[z - 1]?.[y - 1]?.[x + 1],

      space[z - 1]?.[y][x - 1],
      space[z - 1]?.[y][x],
      space[z - 1]?.[y][x + 1],

      space[z - 1]?.[y + 1]?.[x - 1],
      space[z - 1]?.[y + 1]?.[x],
      space[z - 1]?.[y + 1]?.[x + 1]
    ],

    // current layer
    [
      space[z]?.[y - 1]?.[x - 1],
      space[z]?.[y - 1]?.[x],
      space[z]?.[y - 1]?.[x + 1],

      space[z][y][x - 1],
      space[z][y][x + 1],

      space[z]?.[y + 1]?.[x - 1],
      space[z]?.[y + 1]?.[x],
      space[z]?.[y + 1]?.[x + 1]
    ],

    // layer above
    [
      space[z + 1]?.[y - 1]?.[x - 1],
      space[z + 1]?.[y - 1]?.[x],
      space[z + 1]?.[y - 1]?.[x + 1],

      space[z + 1]?.[y][x - 1],
      space[z + 1]?.[y][x],
      space[z + 1]?.[y][x + 1],

      space[z + 1]?.[y + 1]?.[x - 1],
      space[z + 1]?.[y + 1]?.[x],
      space[z + 1]?.[y + 1]?.[x + 1]
    ]
  ]
}

const grow = space => {
  const grownSpace = [...space].map(layer => {
    const grownLayer = layer.map(line => [INACTIVE, ...line, INACTIVE])
    grownLayer.unshift([...INACTIVE.repeat(grownLayer[0].length)])
    grownLayer.push([...INACTIVE.repeat(grownLayer[0].length)])

    return grownLayer
  })

  const emptyLayer = grownSpace[0].map(l => [...INACTIVE.repeat(l.length)])

  grownSpace.unshift(emptyLayer)
  grownSpace.push(emptyLayer)

  return grownSpace
}

const cycle = (times, space) => {
  if (times === 0) {
    return space
  }

  space = grow(space)
  const newSpace = JSON.parse(JSON.stringify(space))

  for (let z = 0; z < space.length; z++) {
    for (let y = 0; y < space[z].length; y++) {
      for (let x = 0; x < space[z][y].length; x++) {
        const activeNeighbours = countActive(neighbours(space, { z, x, y }).flat())

        if (space[z][y][x] === ACTIVE) {
          if (activeNeighbours < 2 || activeNeighbours > 3) {
            newSpace[z][y][x] = INACTIVE
          }
        } else if (space[z][y][x] === INACTIVE) {
          if (activeNeighbours === 3) {
            newSpace[z][y][x] = ACTIVE
          }
        }
      }
    }
  }

  return cycle(times - 1, newSpace)
}

// part 1
console.log(countActive(cycle(6, [input]).flat(2)))
