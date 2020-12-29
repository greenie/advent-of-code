export const add = (a, b) => a + b
export const multiply = (a, b) => a * b
export const distance = (x, y) => Math.abs(x) + Math.abs(y)
export const sortAsc = (a, b) => a - b
export const sortDesc = (a, b) => b - a

export const range = (start = 0, end = 1) => [...Array((end - start) + 1).keys()].map(i => i + start)

export const product = (...lists) => lists.reduce((acc, list) => {
  return acc.map(el => {
    return list.map(element => {
      return el.concat([element])
    })
  }).reduce((acc, value) => acc.concat(value), [])
}, [[]])
