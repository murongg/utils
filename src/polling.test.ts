import { expect, it, vi } from 'vitest'
import { polling } from './polling'

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
