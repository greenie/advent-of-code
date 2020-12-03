import fs from 'fs'

const courseMap = fs.readFileSync('./input').toString().split('\n')

const TREE = '#'
const DX = 3
const DY = 1

const treesEncountered = (x, y, encountered) => {
  const line = courseMap[y]

  if (!line.length) {
    return encountered
  }

  x = x % line.length

  if (line.charAt(x) === TREE) {
    encountered += 1
  }

  return treesEncountered(x + DX, y + DY, encountered)
}

console.log(treesEncountered(0, 0, 0))
