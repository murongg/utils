import { describe, expect, it, vi } from 'vitest'
import { polling, retry } from './promise'

describe('polling', () => {
  it('Polling function returns true on the first attempt', async () => {
    const fn = vi.fn().mockResolvedValueOnce(true)
    const result = await polling(fn)
    expect(result).toBe(true)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('Polling function returns true after multiple attempts', async () => {
    const fn = vi.fn()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true)
    const result = await polling(fn, 100, 3)
    expect(result).toBe(true)
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('Polling function returns false after reaching maxAttempts', async () => {
    const fn = vi.fn().mockResolvedValue(false)
    const result = await polling(fn, 100, 3)
    expect(result).toBe(false)
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('Polling function with custom interval', async () => {
    const fn = vi.fn()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true)
    const result = await polling(fn, 500, 3)
    expect(result).toBe(true)
    expect(fn).toHaveBeenCalledTimes(3)
    expect(fn).toHaveBeenNthCalledWith(1)
    expect(fn).toHaveBeenNthCalledWith(2)
    expect(fn).toHaveBeenNthCalledWith(3)
  })

  it('Polling function with default interval and maxAttempts', async () => {
    const fn = vi.fn().mockResolvedValue(false)
    const result = await polling(fn)
    expect(result).toBe(false)
    expect(fn).toHaveBeenCalledTimes(100)
  })

  it('Polling function with custom interval function', async () => {
    const fn = vi.fn()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true)
    const result = await polling(fn, attemptTime => 100 * attemptTime, 3)
    expect(result).toBe(true)
    expect(fn).toHaveBeenCalledTimes(3)
    expect(fn).toHaveBeenNthCalledWith(1)
    expect(fn).toHaveBeenNthCalledWith(2)
    expect(fn).toHaveBeenNthCalledWith(3)
  })
})

describe('retry', () => {
  it('should resolve with the result of the function', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const result = await retry(mockFn, 3)
    expect(result).toBe('success')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should retry the function if it throws an error', async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new Error('error 1'))
      .mockRejectedValueOnce(new Error('error 2'))
      .mockResolvedValue('success')
    const result = await retry(mockFn, 2)
    expect(result).toBe('success')
    expect(mockFn).toHaveBeenCalledTimes(3)
  })

  it('should throw an error if the function keeps throwing errors', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('error'))
    await expect(retry(mockFn, 3)).rejects.toThrowError('error')
    expect(mockFn).toHaveBeenCalledTimes(4)
  })

  it('should retry the function if the condition is met', async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new Error('error 1'))
      .mockRejectedValueOnce(new Error('error 2'))
      .mockResolvedValue('success')
    const condition = (error: Error) => error.message === 'error 1'
    await expect(retry(mockFn, condition, 3)).rejects.toThrowError('error 2')
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('should call onFailedAttempt when the function fails', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('error'))
    const onFailedAttempt = vi.fn().mockReturnValue(true)
    await expect(retry(mockFn, 3, { onFailedAttempt })).rejects.toThrowError('error')
    expect(onFailedAttempt).toHaveBeenCalledTimes(4)
  })
})
