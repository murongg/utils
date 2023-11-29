import { expect, it } from 'vitest'
import { toNumber } from './to'

it('toNumber', () => {
  expect(toNumber(1)).toBe(1)
  expect(toNumber('1')).toBe(1)
  expect(toNumber('0')).toBe(0)
  expect(toNumber('0a')).toBeNaN()
  expect(toNumber('asb89*')).toBeNaN()
  expect(toNumber(undefined)).toBeNaN()
  expect(toNumber(null)).toBe(0)
})
