import fs from 'fs'
import { multiply, pairs } from '../util.mjs'

const input = fs.readFileSync('./input', 'utf-8').trim().split('\n\n')

const parseInput = input => {
  const tiles = []

  input.forEach(tile => {
    let [id, ...rows] = tile.split('\n')

    id = Number(id.match(/\d+/)[0])

    tiles[id] = {
      top: rows[0],
      bottom: rows[rows.length - 1],
      right: rows.map(row => row.charAt(row.length - 1)).join(''),
      left: rows.map(row => row.charAt(0)).join('')
    }
  })

  return tiles
}

const cornerTiles = tiles => {
  const edges = ['top', 'bottom', 'left', 'right']
  const matching = Object.fromEntries([...Object.keys(tiles)].map(id => ([id, 0])))

  for (const [a, b] of pairs([...Object.keys(tiles)])) {
    const tileA = tiles[a]
    const tileB = tiles[b]

    for (const edgeA of edges) {
      for (const edgeB of edges) {
        if (
          tileA[edgeA] === tileB[edgeB] ||
          tileA[edgeA] === tileB[edgeB].split('').reverse().join('')
        ) {
          matching[a] += 1
          matching[b] += 1
        }
      }
    }
  }

  return [...Object.entries(matching)]
    .filter(tile => tile[1] === 2)
    .map(tile => tile[0])
}

const tiles = parseInput(input)

// part 1
console.log(cornerTiles(tiles).reduce(multiply))
