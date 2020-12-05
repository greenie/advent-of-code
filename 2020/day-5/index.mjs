import fs from 'fs'

const boardingPasses = fs.readFileSync('./input').toString().split('\n')

const ROWS = 128
const COLUMNS = 8

const search = (str, position, start, end, lower, upper) => {
  if (start === end) {
    return start
  }

  const newBoundary = (end - start) / 2 + start

  switch (str.charAt(position)) {
    case lower:
      return search(str, position + 1, start, Math.floor(newBoundary), lower, upper)
    case upper:
      return search(str, position + 1, Math.ceil(newBoundary), end, lower, upper)
  }
}

const calculateSeatId = pass => {
  const rowCodes = pass.substring(0, 7)
  const columnCodes = pass.substring(7)
  const row = search(rowCodes, 0, 0, ROWS - 1, 'F', 'B')
  const column = search(columnCodes, 0, 0, COLUMNS - 1, 'L', 'R')

  return row * 8 + column
}

const allSeatIds = boardingPasses.map(calculateSeatId)

console.log(allSeatIds.sort((a, b) => b - a)[0])
