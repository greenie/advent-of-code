import fs from 'fs'

const courseMap = fs.readFileSync('./input').toString().split('\n')

const TREE = '#'

const movements = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
]

const treesEncountered = (x, y, dx, dy, encountered) => {
  const line = courseMap[y]

  if (!line || !line.length) {
    return encountered
  }

  x = x % line.length

  if (line.charAt(x) === TREE) {
    encountered += 1
  }

  return treesEncountered(x + dx, y + dy, dx, dy, encountered)
}

const treesProduct = movements.map(([dx, dy]) =>
  treesEncountered(0, 0, dx, dy, 0)
).reduce((a, b) => a * b)

// part 1
console.log(treesEncountered(0, 0, 3, 1, 0))

// part 2
console.log(treesProduct)

