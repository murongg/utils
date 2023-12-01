import { type Fn, sleep } from '@antfu/utils'

/**
 * Polling until the condition is met
 * @param fn
 * @param interval
 * @param maxAttempts
 * @default interval 0
 * @default maxAttempts 100
 * @returns
 */
export async function polling(fn: Fn<Promise<boolean> | boolean>, interval?: number, maxAttempts?: number): Promise<boolean>
export async function polling(fn: Fn<Promise<boolean> | boolean>, interval?: (attemptTime: number) => number, maxAttempts?: number): Promise<boolean>
export async function polling(fn: Fn<Promise<boolean> | boolean>, interval: number | ((attemptTime: number) => number) = 0, maxAttempts = 100): Promise<boolean> {
  let attempts = 0

  while (attempts < maxAttempts) {
    const result = await fn()
    if (result)
      return true

    if (typeof interval === 'function')
      await sleep(interval(attempts))
    else
      await sleep(interval)
    attempts++
  }
  return false
}
