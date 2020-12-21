export const add = (x, y) => x + y
export const multiply = (x, y) => x * y
export const distance = (x, y) => Math.abs(x) + Math.abs(y)
export const sortAsc = (a, b) => a - b
export const sortDesc = (a, b) => b - a
export const range = (start = 0, end = 1) => [...Array((end - start) + 1).keys()].map(i => i + start)
