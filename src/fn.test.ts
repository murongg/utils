import { describe, expect, it, vi } from 'vitest'
import { sleep } from '@antfu/utils'
import { compose } from './fn'

describe('compose', () => {
  it('should execute all functions in sequence', async () => {
    const fn1 = vi.fn((arg, next) => next())
    const fn2 = vi.fn((arg, next) => next())
    const fn3 = vi.fn((arg, next) => next())
    const handles = [fn1, fn2, fn3]

    await compose(handles, ['arg'])

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn3).toHaveBeenCalledTimes(1)
  })

  it('should pass arguments to each function', async () => {
    const fn1 = vi.fn((arg, next) => next())
    const fn2 = vi.fn((arg, next) => next())
    const fn3 = vi.fn((arg, next) => next())
    const handles = [fn1, fn2, fn3]

    await compose(handles, ['arg'])

    expect(fn1).toHaveBeenCalledWith('arg', expect.any(Function))
    expect(fn2).toHaveBeenCalledWith('arg', expect.any(Function))
    expect(fn3).toHaveBeenCalledWith('arg', expect.any(Function))
  })

  it('should resolve when all functions are executed', async () => {
    const fn1 = vi.fn((arg, next) => next())
    const fn2 = vi.fn((arg, next) => next())
    const fn3 = vi.fn((arg, next) => next())
    const handles = [fn1, fn2, fn3]

    const result = await compose(handles, ['arg'])

    expect(result).toBeUndefined()
  })

  it('should stop execution if a function does not call next', async () => {
    const fn1 = vi.fn((arg, next) => next())
    const fn2 = vi.fn((_arg, _next) => {})
    const fn3 = vi.fn((arg, next) => next())
    const handles = [fn1, fn2, fn3]

    await compose(handles, ['arg'])

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn3).not.toHaveBeenCalled()
  })

  it('should don\'t use await motifier and execute functions in correct order', async () => {
    const fns: number[] = []
    const fn1 = vi.fn((arg, next) => {
      fns.push(1)
      next()
      fns.push(11)
    })
    const fn2 = vi.fn((arg, next) => {
      fns.push(2)
      next()
      fns.push(22)
    })
    const fn3 = vi.fn((arg, next) => {
      fns.push(3)
      next()
      fns.push(33)
    })
    const handles = [fn1, fn2, fn3]

    await compose(handles, ['arg'])
    expect(fns).toEqual([1, 2, 3, 33, 22, 11])
  })

  it('should must use await motifier and execute functions in correct order', async () => {
    const fns: number[] = []
    const fn1 = vi.fn((arg, next) => {
      fns.push(1)
      next()
      fns.push(11)
    })
    const fn2 = vi.fn(async (arg, next) => {
      await sleep(10)
      fns.push(2)
      next()
      fns.push(22)
    })
    const fn3 = vi.fn((arg, next) => {
      fns.push(3)
      next()
      fns.push(33)
    })
    const handles = [fn1, fn2, fn3]

    await compose(handles, ['arg'])
    await sleep(30)
    expect(fns).toEqual([1, 11, 2, 3, 33, 22])
  })
})
