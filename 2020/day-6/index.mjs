import fs from 'fs'

const groups = fs.readFileSync('./input').toString().split('\n\n').filter(g => g)

const getUniqueAnswers = groupAnswer => {
  const answers = groupAnswer.replace(/\n/gm, '').split('')
  return new Set(answers)
}

const getAnswers = groupAnswer => {
  const answers = groupAnswer
    .split('\n')
    .filter(a => a)
    .map(a => a.split(''))

  return answers
}

const intersection = (a, b) => {
  const setA = new Set(a)
  const setB = new Set(b)
  return [...setA].filter(x => setB.has(x))
}

const allAnswersSum = groups.reduce((count, answers) => {
  const unique = getUniqueAnswers(answers)
  return count += unique.size
}, 0)

const allIntersectingAnswersSum = groups.reduce((count, group) => {
  const answers = getAnswers(group)
  let commonAnswers = answers[0]

  for (let i = 1; i < answers.length; i++) {
    commonAnswers = intersection(commonAnswers, answers[i])

    if (commonAnswers.length === 0) {
      break
    }
  }

  return count += commonAnswers.length
}, 0)

// part 1
console.log(allAnswersSum)

// part 2
console.log(allIntersectingAnswersSum)
