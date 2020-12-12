import fs from 'fs'
import { distance } from '../../util.mjs'

const commands = fs.readFileSync('./input').toString().split('\n').filter(n => n)

const COMPASS = {
  N: 0,
  E: 90,
  S: 180,
  W: 270
}

const parseCommand = command => {
  const action = command.slice(0, 1)
  const value = parseInt(command.slice(1))

  return [action, value]
}

const rotate = (direction, deg) => {
  const newDeg = (360 + COMPASS[direction] + deg) % 360
  const newDirection = Object.entries(COMPASS).find(([_, v]) => v === newDeg)

  return newDirection[0]
}

const move = (command, position, direction) => {
  const [action, value] = command
  const [x, y] = position
  let newPosition = [x, y]
  let newDirection = direction

  switch (action) {
    case 'N':
      newPosition = [x, y + value]
      break
    case 'S':
      newPosition = [x, y - value]
      break
    case 'E':
      newPosition = [x + value, y]
      break
    case 'W':
      newPosition = [x - value, y]
      break
    case 'L':
      newDirection = rotate(direction, -value)
      break
    case 'R':
      newDirection = rotate(direction, value)
      break;
    case 'F':
      return move([direction, value], position, direction)
  }

  return [newPosition, newDirection]
}

const navigate = (commands, direction, x, y) => {
  const moves = commands.map(parseCommand).reduce((acc, command) => {
    return move(command, acc[0], acc[1])
  }, [[x, y], direction])

  return moves[0]
}

// part 1
const [x, y] = navigate(commands, 'E', 0, 0)
console.log(distance(x, y))
