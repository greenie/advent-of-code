import fs from 'fs'

const instructions = fs.readFileSync('./input').toString().split('\n').filter(c => c)

const parseInstruction = instruction => {
  const [op, arg] = instruction.split(' ')

  return { op, arg: Number(arg), hasRun: false }
}

const program = []

instructions.forEach(instruction => {
  program.push(parseInstruction(instruction))
})

const run = (program, index, acc) => {
  const { op, arg, hasRun } = program[index]

  if (hasRun) {
    return acc
  } else {
    program[index].hasRun = true
  }

  switch(op) {
    case 'acc':
      return run(program, index + 1, acc + arg)
    case 'jmp':
      return run(program, index + arg, acc)
    case 'nop':
      return run(program, index + 1, acc)
  }
}

// part 1
console.log(run(program, 0, 0))
