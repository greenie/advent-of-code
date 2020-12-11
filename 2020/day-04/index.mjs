import fs from 'fs'

const passports = fs.readFileSync('./input').toString().split('\n\n')

const REQUIRED_FIELDS_COUNT = 7
const EYE_COLORS = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

const between = (min, max) => num => {
  num = new Number(num)

  if (isNaN(num)) {
    return false
  }

  return num >= min && num <= max
}

const isValidBirthYear = between(1920, 2002)
const isValidIssueYear = between(2010, 2020)
const isValidExpirationYear = between(2020, 2030)
const isValidHeight = height => {
  const heightParts = /^(\d{2,3})(cm|in)$/g.exec(height)

  if (!heightParts) {
    return false
  }

  const [_, size, unit] = heightParts

  switch(unit) {
    case 'cm':
      return between(150, 193)(size)

    case 'in':
      return between(59, 76)(size)

    default:
      return false
  }
}
const isValidHairColor = color => !!color.match(/#[a-f0-9]{6}/g)
const isValidEyeColor = color => EYE_COLORS.includes(color)
const isValidPassportId = id => !!id.match(/^[0-9]{9}$/g)

const rulesMap = {
  'ecl': isValidEyeColor,
  'pid': isValidPassportId,
  'eyr': isValidExpirationYear,
  'hcl': isValidHairColor,
  'byr': isValidBirthYear,
  'iyr': isValidIssueYear,
  'hgt': isValidHeight
}

const getFields = passport => {
  const allFields = [...passport.matchAll(/([a-z]{3}):([\w\d#]+)/gm)]
  const keyValuePairs = allFields.map(([_, key, value]) => [key, value])

  return keyValuePairs.filter(pair => pair[0] !== 'cid')
}

const validPassportsCount = passports.reduce((count, passport) => {
  const fields = getFields(passport)

  if (fields.length === REQUIRED_FIELDS_COUNT) {
    return count += 1
  }

  return count
}, 0)

const validPassportsWithRulesCount = passports.reduce((count, passport) => {
  const fields = getFields(passport)

  if (fields.length !== REQUIRED_FIELDS_COUNT) {
    return count
  }

  const allPass = fields.every(([key, value]) => rulesMap[key](value))

  return allPass ? count + 1 : count
}, 0)

// part 1
console.log(validPassportsCount)

// part 2
console.log(validPassportsWithRulesCount)
