import fs from 'fs'

const rules = fs.readFileSync('./input').toString().split('\.\n').filter(r => r)

const parseRule = rule => {
  if (rule.includes('no other bags')) {
    return null
  }

  return {
    quantity: rule.trim().match(/^\d+/)[0],
    color: rule.trim().match(/(\w+\s\w+)\sbag/)[1]
  }
}

const bagsForColor = (bags, color) => {
  let canContain = []

  for (const [bag, rules] of Object.entries(bags)) {
    rules.filter(rule => rule).forEach(rule => {
      if (rule.color === color) {
        canContain.push(bag)
        canContain = canContain.concat(bagsForColor(bags, bag))
      }
    })
  }

  return [...new Set(canContain)]
}

const bags = {}

rules.forEach(line => {
  const bag = line.match(/(^\w+\s\w+)\sbags/)[1]
  const rules = line.split('contain')[1].split(',')

  bags[bag] = rules.map(parseRule)
})

// part 1
console.log(bagsForColor(bags, 'shiny gold').length)
