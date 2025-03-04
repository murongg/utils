import { describe, expect, it, vi } from 'vitest'
import { polling, retry, timeout, timeoutWithRetry } from './promise'

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

  it('should retry the function with a delay', async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new Error('error 1'))
      .mockRejectedValueOnce(new Error('error 2'))
      .mockResolvedValue('success')
    const delay = 100
    const start = Date.now()
    await retry(mockFn, 2, { delay })
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(delay * 2)
  })
})

describe('timeout', () => {
  it('should resolve with the result of the function', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const result = await timeout(mockFn, 1000)
    expect(result).toBe('success')
  })

  it('should reject with a timeout error if the function takes too long', async () => {
    const mockFn = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 2000)))
    await expect(timeout(mockFn, 1000)).rejects.toThrowError('Timeout')
  })

  it('should reject with a custom error message if provided', async () => {
    const mockFn = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 2000)))
    await expect(timeout(mockFn, 1000, 'Custom timeout error')).rejects.toThrowError('Custom timeout error')
  })

  it('should reject with a custom error message if provided', async () => {
    const mockFn = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 2000)))
    await expect(timeout(mockFn, 1000, 'Custom timeout error')).rejects.toThrowError('Custom timeout error')
  })
})

describe('timeoutWithRetry', () => {
  it('should resolve with the result of the function before timeout', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const result = await timeoutWithRetry(mockFn, 1000, 2)
    expect(result).toBe('success')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should retry and resolve with the result of the function before timeout', async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new Error('Timeout'))
      .mockResolvedValue('success')
    const result = await timeoutWithRetry(mockFn, 1000, 2)
    expect(result).toBe('success')
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('should fail with timeout error after exceeding retries', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('Timeout'))
    await expect(timeoutWithRetry(mockFn, 1000, 2)).rejects.toThrowError('Timeout')
    expect(mockFn).toHaveBeenCalledTimes(3)
  })

  it('should pass custom timeout message to error', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('Custom Timeout Message'))
    await expect(timeoutWithRetry(mockFn, 1000, 1, 'Custom Timeout Message')).rejects.toThrowError('Custom Timeout Message')
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('should adjust timeout dynamically on retries', async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new Error('Timeout'))
      .mockRejectedValueOnce(new Error('Timeout'))
      .mockResolvedValue('success')
    const dynamicTimeouts = [500, 1000] // First retry after 500ms, second after 1000ms
    const result = await dynamicTimeoutWithRetry(mockFn, dynamicTimeouts, 2)
    expect(result).toBe('success')
    expect(mockFn).toHaveBeenCalledTimes(3)
  })
})

// A hypothetical function to handle dynamic timeouts, not part of the original code.
// This is for demonstration purposes to show how one might test such functionality.
async function dynamicTimeoutWithRetry<T>(fn: () => Promise<T>, timeouts: number[], retries: number): Promise<T> {
  for (let i = 0; i <= retries; i++) {
    try {
      return await timeout(fn, timeouts[i] || timeouts[timeouts.length - 1])
    }
    catch (error) {
      if (i === retries)
        throw error
    }
  }
  throw new Error('Exceeded retries')
}
