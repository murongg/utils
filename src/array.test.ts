import { describe, expect, it } from 'vitest'
import { difference, intersection, union } from './array'

describe('difference', () => {
  it('should return an empty array if both input arrays are empty', () => {
    const result = difference([], [])
    expect(result).toEqual([])
  })

  it('should return the elements that are in the first array but not in the second array', () => {
    const result = difference([1, 2, 3, 4], [2, 3, 5])
    expect(result).toEqual([1, 4])
  })

  it('should handle arrays with objects', () => {
    const obj1 = { id: 1, name: 'Alice' }
    const obj2 = { id: 2, name: 'Bob' }
    const obj3 = { id: 3, name: 'Charlie' }
    const result = difference([obj1, obj2, obj3], [obj2])
    expect(result).toEqual([obj1, obj3])
  })
})

describe('intersection', () => {
  it('should return an empty array if either input array is empty', () => {
    expect(intersection([], [1, 2, 3])).toEqual([])
    expect(intersection([1, 2, 3], [])).toEqual([])
  })

  it('should return the common elements between two arrays', () => {
    expect(intersection([1, 2, 3, 4], [3, 4, 5])).toEqual([3, 4])
    expect(intersection(['apple', 'banana', 'orange'], ['banana', 'kiwi'])).toEqual(['banana'])
  })

  it('should handle arrays with objects', () => {
    const obj1 = { id: 1, name: 'Alice' }
    const obj2 = { id: 2, name: 'Bob' }
    const obj3 = { id: 3, name: 'Charlie' }
    expect(intersection([obj1, obj2, obj3], [obj2, obj3])).toEqual([obj2, obj3])
  })
})

describe('union', () => {
  it('should return the union of two arrays', () => {
    expect(union([1, 2, 3], [3, 4, 5])).toEqual([1, 2, 3, 4, 5])
    expect(union(['apple', 'banana'], ['banana', 'kiwi'])).toEqual(['apple', 'banana', 'kiwi'])
  })

  it('should handle arrays with objects', () => {
    const obj1 = { id: 1, name: 'Alice' }
    const obj2 = { id: 2, name: 'Bob' }
    const obj3 = { id: 3, name: 'Charlie' }
    expect(union([obj1, obj2], [obj2, obj3])).toEqual([obj1, obj2, obj3])
  })

  it('should return the elements of the first array if the second array is empty', () => {
    expect(union([1, 2, 3], [])).toEqual([1, 2, 3])
  })

  it('should return the elements of the second array if the first array is empty', () => {
    expect(union([], [4, 5, 6])).toEqual([4, 5, 6])
  })
})
