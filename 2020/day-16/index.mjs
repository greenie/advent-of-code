import fs from 'fs'
import { add, range } from '../../util.mjs'

const input = fs.readFileSync('./input').toString().split('\n\n').filter(l => l)

const ranges = new Set(input[0].split('\n').flatMap(line => {
  const [lower, upper] = [...line.matchAll(/\d+-\d+/g)].map(match => match[0])

  const lowerRange = range(...lower.split('-').map(Number))
  const upperRange = range(...upper.split('-').map(Number))

  return [...lowerRange.concat(upperRange)]
}))

const nearbyTickets = input[2]
  .split('\n')
  .slice(1)
  .map(ticket => ticket.split(',').map(Number))

const invalidTicketValues = nearbyTickets.reduce((acc, ticket) => {
  ticket.forEach(value => {
    if (!ranges.has(value)) {
      acc.push(value)
    }
  })

  return acc
}, [])

// part 1
console.log(invalidTicketValues.reduce(add))
