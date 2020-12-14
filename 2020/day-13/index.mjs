import fs from 'fs'
import { sortAsc } from '../../util.mjs'

const input = fs.readFileSync('./input').toString().split('\n').filter(n => n)

const departureTime = parseInt(input[0])
const buses = input[1].split(',').filter(id => id !== 'x').map(Number)

const applicableBuses = buses
  .map(bus => ({ id: bus, earliestTime: bus * Math.ceil(departureTime / bus) }))
  .filter(({ earliestTime }) => earliestTime >= departureTime)
  .sort((a, b) => sortAsc(a.earliestTime, b.earliestTime))

// part 1
const earliest = applicableBuses[0]
console.log((earliest.earliestTime - departureTime) * earliest.id)
