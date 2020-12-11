import fs from 'fs'

const instructions = fs.readFileSync('./input').toString().split('\n').filter(c => c)

const parseInstruction = instruction => {
  const [op, arg] = instruction.split(' ')

  return { op, arg: Number(arg) }
}

const run = (program, index, acc, stack) => {
  if (index === program.length) {
    return {
      exit: 0,
      acc,
      stack
    }
  }

  if (!program[index] || stack.includes(index)) {
    return {
      exit: 1,
      acc,
      stack
    }
  } else {
    stack.push(index)
  }

  const { op, arg } = program[index]

  switch(op) {
    case 'acc':
      return run(program, index + 1, acc + arg, stack)
    case 'jmp':
      return run(program, index + arg, acc, stack)
    case 'nop':
      return run(program, index + 1, acc, stack)
  }
}

const program = []

instructions.forEach(instruction => {
  program.push(parseInstruction(instruction))
})

let result = run(program, 0, 0, [])

// part 1
console.log(result.acc)

// part 2
result.stack.reverse().forEach(progIndex => {
  const newProgram = JSON.parse(JSON.stringify(program))
  const { op } = newProgram[progIndex]

  switch (op) {
    case 'jmp':
      newProgram.splice(progIndex, 1, { ...newProgram[progIndex], op: 'nop' })
      break
    case 'nop':
      newProgram.splice(progIndex, 1, { ...newProgram[progIndex], op: 'jmp' })
  }

  const newResult = run(newProgram, 0, 0, [])

  if (newResult.exit === 0) {
    result = newResult
  }
})

console.log(result.acc)
