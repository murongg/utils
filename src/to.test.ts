import { expect, it } from 'vitest'
import { toNumber } from './to'

it('toNumber', () => {
  expect(toNumber(1)).toBe(1)
  expect(toNumber('1')).toBe(1)
  expect(toNumber('0')).toBe(0)
  expect(toNumber('0a')).toBe(0)
  expect(toNumber('asb89*')).toBe(0)
})
