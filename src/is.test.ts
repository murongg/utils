import { expect, it } from 'vitest'
import { isMaybeNumber } from './is'

it('isMaybeNumber', () => {
  expect(isMaybeNumber(1)).toBeTruthy()
  expect(isMaybeNumber('1')).toBeTruthy()
  expect(isMaybeNumber('0')).toBeTruthy()
  expect(isMaybeNumber('0a')).toBeFalsy()
  expect(isMaybeNumber('asb89*')).toBeFalsy()
})
