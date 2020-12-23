import fs from 'fs'
import { distance } from '../../util.mjs'

const commands = fs.readFileSync('./input', 'utf-8').trim().split('\n')

const ROTATIONS = {
  L90: [[0, -1], [1, 0]],
  L180: [[-1, 0], [0, -1]],
  L270: [[0, 1], [-1, 0]],
  R90: [[0, 1], [-1, 0]],
  R180: [[-1, 0], [0, -1]],
  R270: [[0, -1], [1, 0]]
}

const parseCommand = command => {
  const action = command.slice(0, 1)
  const value = parseInt(command.slice(1))

  return [action, value]
}

const rotate = (command, diff) => {
  const r = ROTATIONS[command]
  const { x, y } = diff

  return {
    x: x * r[0][0] + y * r[0][1],
    y: x * r[1][0] + y * r[1][1]
  }
}

const move = (command, position, diff, relative) => {
  const [action, value] = command

  switch (action) {
    case 'N':
      relative ? diff.y += value : position.y += value
      break
    case 'S':
      relative ? diff.y -= value : position.y -= value
      break
    case 'E':
      relative ? diff.x += value : position.x += value
      break
    case 'W':
      relative ? diff.x -= value : position.x -= value
      break
    case 'L':
    case 'R':
      diff = rotate(`${action}${value}`, diff)
      break
    case 'F':
      position.x += diff.x * value
      position.y += diff.y * value
  }

  return [position, diff]
}

const navigate = (commands, initialDiff, relative) => {
  const position = { x: 0, y: 0 }

  const moves = commands.map(parseCommand).reduce(([pos, diff], command) => {
    return move(command, pos, diff, relative)
  }, [position, initialDiff])

  return moves[0]
}

// part 1
const ship = navigate(commands, { x: 1, y: 0 }, false)
console.log(distance(ship.x, ship.y))

// part 2
const waypoint = navigate(commands, { x: 10, y: 1 }, true)
console.log(distance(waypoint.x, waypoint.y))
