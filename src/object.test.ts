import { describe, expect, it } from 'vitest'
import { removeUndefinedKeys } from './object'

describe('removeUndefinedKeys', () => {
  it('should remove keys with undefined values', () => {
    const input = { a: 1, b: undefined, c: 3 }
    const expectedOutput = { a: 1, c: 3 }
    expect(removeUndefinedKeys(input)).toEqual(expectedOutput)
  })

  it('should return an empty object if all values are undefined', () => {
    const input = { a: undefined, b: undefined }
    const expectedOutput = {}
    expect(removeUndefinedKeys(input)).toEqual(expectedOutput)
  })

  it('should return the same object if there are no undefined values', () => {
    const input = { a: 1, b: 2, c: 3 }
    const expectedOutput = { a: 1, b: 2, c: 3 }
    expect(removeUndefinedKeys(input)).toEqual(expectedOutput)
  })

  it('should handle an empty object', () => {
    const input = {}
    const expectedOutput = {}
    expect(removeUndefinedKeys(input)).toEqual(expectedOutput)
  })

  it('should not remove keys with null values', () => {
    const input = { a: null, b: 2, c: undefined }
    const expectedOutput = { a: null, b: 2 }
    expect(removeUndefinedKeys(input)).toEqual(expectedOutput)
  })
})
