import fs from 'fs'

const input = fs.readFileSync('./input', 'utf-8').trim().split('\n\n')

const parseRules = input => {
  const rules = new Map()

  input.split('\n').forEach(line => {
    let [id, rule] = line.split(': ')
    id = Number(id)

    if (rule.startsWith('"')) {
      rule = rule[1]
    } else {
      rule = rule.split(' | ').map(part => part.split(' ').map(Number))
    }

    rules.set(id, rule)
  })

  return rules
}

const match = (rules, message, id = 0, index = 0) => {
  if (index === message.length) {
    return []
  }

  const rule = rules.get(id)

  if (typeof rule === 'string') {
    return message[index] === rule ? [index + 1] : []
  }

  let matches = []

  rule.forEach(part => {
    let subMatches = [index]

    part.forEach(subRule => {
      subMatches = subMatches.reduce((acc, value) => {
        return acc.concat(match(rules, message, subRule, value))
      }, [])
    })

    matches = matches.concat(subMatches)
  })

  return matches
}

const countMatches = (rules, messages) => messages.reduce((acc, message) => {
  if (match(rules, message).includes(message.length)) {
    acc += 1
  }

  return acc
}, 0)

const rules = parseRules(input[0])
const messages = input[1].split('\n')

// part 1
console.log(countMatches(rules, messages))

// part 2
rules.set(8, [[42], [42, 8]])
rules.set(11, [[42, 31], [42, 11, 31]])

console.log(countMatches(rules, messages))
