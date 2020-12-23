import fs from 'fs'

const passwordsWithRules = fs.readFileSync('./input', 'utf-8').trim().split('\n')

const inRange = (lower, upper, character, password) => {
  const charCount = password.split('').reduce((count, char) => {
    if (char === character) {
      return count += 1
    }

    return count
  }, 0)

  if (charCount < lower || charCount > upper) {
    return false
  }

  return true
}

const inPosition = (pos, alt, character, password) => {
  const matchesCount = password.split('').reduce((matches, char, i) => {
    const charMatches = char === character
    const isInPosition = pos === i + 1 || alt === i + 1

    if (charMatches && isInPosition) {
      return matches += 1
    }

    return matches
  }, 0)

  if (matchesCount === 1) {
    return true
  }

  return false
}

const validPasswordsCount = (validationRule, pairs) => pairs.reduce((validCount, pair) => {
  const [rule, password] = pair.split(':')
  const [frequency, character] = rule.split(' ')
  const [firstRule, secondRule] = frequency.split('-').map(Number)

  if (validationRule(firstRule, secondRule, character, password.trim())) {
    return validCount += 1
  }

  return validCount
}, 0)

// part 1
console.log(validPasswordsCount(inRange, passwordsWithRules))

// part 2
console.log(validPasswordsCount(inPosition, passwordsWithRules))
