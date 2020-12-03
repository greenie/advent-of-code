import fs from 'fs'

const courseMap = fs.readFileSync('./input').toString().split('\n').map(line => line.split(''))

console.log(courseMap)

const TREE = '#'
const DX = 3
const DY = 1

const treesEncountered = (x, y, encountered) => {
  const position = courseMap[y][x]

  if (!position) {
    return encountered
  }

  if (position && position === TREE) {
    encountered += 1
  }

  console.log(encountered)

  treesEncountered(x + DX, y + DY, encountered)
}

console.log(treesEncountered(0, 0, 0))
