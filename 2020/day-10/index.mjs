import fs from 'fs'
import { add, multiply, sortAsc } from '../../util.mjs'

const adapters = fs.readFileSync('./input', 'utf-8')
  .trim()
  .split('\n')
  .map(Number)
  .sort(sortAsc)

const countDiffs = (list, ...targets) => list.reduce((acc, item, i, arr) => {
  if (!arr[i + 1]) {
    return acc
  }

  const diff = arr[i + 1] - item

  if (targets.includes(diff)) {
    acc[diff] = acc[diff] ? acc[diff] + 1 : 1
  }

  return acc
}, {})

const validArrangements = (list, ...allowedDiffs) => list.reduce((acc, adapter) => {
  acc[adapter] = allowedDiffs
    .map(diff => acc[adapter - diff] || 0)
    .reduce(add)

  return acc
}, [1])

const deviceAdapter = adapters[adapters.length - 1] + 3
const joltages = [0, ...adapters, deviceAdapter]

// part 1
console.log(Object.values(countDiffs(joltages, 1, 3)).reduce(multiply))

// part 2
console.log(validArrangements(adapters, 1, 2, 3).pop())
