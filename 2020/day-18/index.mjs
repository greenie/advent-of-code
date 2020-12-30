import fs from 'fs'
import { add, multiply } from '../util.mjs'

const input = fs.readFileSync('./input', 'utf-8').trim().split('\n')

const tokenize = expression => expression.match(/\d+|[+*()]/g)

const postfix = (opMap, tokens) => {
  const output = []
  const stack = []

  while (tokens.length) {
    const token = tokens.shift()
    const value = Number(token)

    if (!isNaN(value)) {
      output.push(value)
    } else if (token === '(') {
      stack.push(token)
    } else if (token === ')') {
      while (stack[stack.length - 1] !== '(') {
        output.push(stack.pop())
      }

      stack.pop()
    } else {
      while (
        stack.length &&
        stack[stack.length - 1] !== '(' &&
        opMap[stack[stack.length - 1]].precedence >= opMap[token].precedence
      ) {
        output.push(stack.pop())
      }

      stack.push(token)
    }
  }

  while (stack.length) {
    output.push(stack.pop())
  }

  return output
}

const evaluate = (opMap, tokens) => {
  const operators = [...Object.keys(opMap)]
  const result = []

  for (const token of tokens) {
    if (operators.includes(token)) {
      const a = result.pop()
      const b = result.pop()
      result.push(opMap[token].op(a, b))
    } else {
      result.push(token)
    }
  }

  return result.reduce(add)
}

// part 1
const operators1 = {
  '+': {
    op: add,
    precedence: 0
  },
  '*': {
    op: multiply,
    precedence: 0
  }
}

console.log(input
  .map(tokenize)
  .map(tokens => postfix(operators1, tokens))
  .map(tokens => evaluate(operators1, tokens))
  .reduce(add)
)

// part 2
const operators2 = {
  '+': {
    op: add,
    precedence: 2
  },
  '*': {
    op: multiply,
    precedence: 1
  }
}

console.log(input
  .map(tokenize)
  .map(tokens => postfix(operators2, tokens))
  .map(tokens => evaluate(operators2, tokens))
  .reduce(add)
)
