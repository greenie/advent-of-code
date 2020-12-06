import fs from 'fs'

const allGroupAnswers = fs.readFileSync('./input').toString().split('\n\n')

const getUniqueAnswers = groupAnswer => {
  const answers = groupAnswer.replace(/\n/gm, '').split('')
  return new Set(answers)
}

const allAnswersSum = allGroupAnswers.reduce((count, answers) => {
  const unique = getUniqueAnswers(answers)
  return count += unique.size
}, 0)

console.log(allAnswersSum)
