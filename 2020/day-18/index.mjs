import fs from 'fs'
import { add, multiply } from '../util.mjs'

const input = fs.readFileSync('./input', 'utf-8').trim().split('\n')

const tokenize = expression => expression.match(/\d+|[+*()]/g)

const evaluate = tokens => {
  let result = 0
  let operator = add

  while (tokens.length) {
    const token = tokens.shift()
    const value = Number(token)

    if (!isNaN(value)) {
      result = operator(result, value)
    } else if (token === '+') {
      operator = add
    } else if (token === '*') {
      operator = multiply
    } else if (token === '(') {
      result = operator(result, evaluate(tokens))
    } else if (token === ')') {
      break
    }
  }

  return result
}

// part 1
console.log(input.map(tokenize).map(evaluate).reduce(add))
