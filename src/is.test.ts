import { expect, it } from 'vitest'
import { isMaybeNumber, isStringNumber } from './is'

it('isMaybeNumber', () => {
  expect(isMaybeNumber(1)).toBeTruthy()
  expect(isMaybeNumber('1')).toBeTruthy()
  expect(isMaybeNumber('0')).toBeTruthy()
  expect(isMaybeNumber('0a')).toBeFalsy()
  expect(isMaybeNumber('asb89*')).toBeFalsy()
})

it('isStringNumber', () => {
  expect(isStringNumber('1')).toBeTruthy()
  expect(isStringNumber('0')).toBeTruthy()
  expect(isStringNumber('0a')).toBeFalsy()
  expect(isStringNumber('asb89*')).toBeFalsy()
})
