import fs from 'fs'

const [rules, messages] = fs.readFileSync('./input', 'utf-8').trim().split('\n\n')

const parseRules = input => {
  const rules = {}

  input.split('\n').forEach(line => {
    let [id, rule] = line.split(': ')

    if (rule.startsWith('"')) {
      rule = rule[1]
    } else {
      rule = rule.split(' | ').map(part => part.split(' '))
    }

    rules[id] = rule
  })

  return rules
}

const createRulesRegex = (rules, id = '0') => {
  if (typeof rules[id] === 'string') {
    return rules[id]
  }

  const options = []

  rules[id].forEach(rule => {
    let option = ''

    rule.forEach(subRule => {
      option += createRulesRegex(rules, subRule)
    })

    options.push(option)
  })

  return ['(', options.join('|'), ')'].join('')
}

const regex = new RegExp(`^${createRulesRegex(parseRules(rules))}$`, 'g')

// part 1
console.log(messages.split('\n').reduce((acc, message) => {
  if (message.match(regex)) {
    acc += 1
  }

  return acc
}, 0))
