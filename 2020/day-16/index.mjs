import fs from 'fs'
import { add, multiply, range } from '../util.mjs'

const input = fs.readFileSync('./input', 'utf-8').trim().split('\n\n')

const fields = input[0].split('\n').map(line => {
  const [lower, upper] = [...line.matchAll(/\d+-\d+/g)].map(match => match[0])

  const lowerRange = range(...lower.split('-').map(Number))
  const upperRange = range(...upper.split('-').map(Number))

  return lowerRange.concat(upperRange)
})

const myTicket = input[1]
  .split('\n')
  .slice(1)
  .flatMap(ticket => ticket.split(',').map(Number))

const nearbyTickets = input[2]
  .split('\n')
  .slice(1)
  .map(ticket => ticket.split(',').map(Number))

const fullRange = new Set(fields.flat())

const [invalidValues, validTickets] = nearbyTickets.reduce((acc, ticket) => {
  const invalidValue = ticket.find(value => !fullRange.has(value))

  if (invalidValue !== undefined) {
    acc[0].push(invalidValue)
  } else {
    acc[1].push(ticket)
  }

  return acc
}, [[], []])

const getFieldOrder = (tickets, fields) => {
  const ticketIndices = tickets[0].map((_, i) => i)
  const fieldOrder = []

  let matches = fields.map((field, fi) => {
    const indices = ticketIndices.filter(ti =>
      tickets.every(ticket => field.some(value => value === ticket[ti]))
    )

    return [fi, indices]
  })

  while (matches.length) {
    let [found, notFound] = matches.reduce((acc, match) => {
      if (match[1].length === 1) {
        acc[0].push(match)
      } else {
        acc[1].push(match)
      }

      return acc
    }, [[], []])

    matches = notFound

    found.forEach(([i, col]) => {
      fieldOrder[i] = col[0]
      matches = matches.map(match => {
        match[1] = match[1].filter(value => value !== col[0])
        return match
      })
    })
  }

  return fieldOrder
}

// part 1
console.log(invalidValues.reduce(add))

// part 2
const order = getFieldOrder(validTickets, fields)
console.log(range(0, 5).map(n => order[n]).map(i => myTicket[i]).reduce(multiply))
