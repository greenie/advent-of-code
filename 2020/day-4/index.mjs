import fs from 'fs'

const passports = fs.readFileSync('./input').toString().split('\n\n')

const REQUIRED_FIELDS = ['ecl:', 'pid:', 'eyr:', 'hcl:', 'byr:', 'iyr:', 'hgt:']

const validPassportsCount = passports.reduce((count, passport) => {
  const allFields = passport.match(/([a-z]){3}:/gm)
  const filteredFields = allFields.filter(field => field !== 'cid:')

  if (filteredFields.length === REQUIRED_FIELDS.length) {
    return count += 1
  }

  return count
}, 0)

console.log(validPassportsCount)
