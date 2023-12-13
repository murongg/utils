import { describe, expect, it, vi } from 'vitest'
import { retry } from './retry'

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
})
