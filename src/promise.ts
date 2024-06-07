import { type Fn, sleep } from '@antfu/utils'

export { to } from 'await-to-js'

/**
 * Polling until the condition is met
 * @param fn
 * @param interval
 * @param maxAttempts
 * @default interval 0
 * @default maxAttempts Number.MAX_VALUE
 * @returns
 */
export async function polling(fn: Fn<Promise<boolean> | boolean>, interval?: number, maxAttempts?: number): Promise<boolean>
export async function polling(fn: Fn<Promise<boolean> | boolean>, interval?: (attemptTime: number) => number, maxAttempts?: number): Promise<boolean>
export async function polling(fn: Fn<Promise<boolean> | boolean>, interval: number | ((attemptTime: number) => number) = 0, maxAttempts = Number.MAX_VALUE): Promise<boolean> {
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

export interface RetryOptions<E extends Error> {
  /**
   * Callback when failed attempt
   * @param error
   * @returns
   */
  onFailedAttempt?: (error: E) => boolean
  /**
   * Delay before next attempt
   */
  delay?: number
}

/**
 * Retries a promise a given number of times
 * @param fn
 * @param condition
 * @param retries
 * @param options
 */
export async function retry<T, E extends Error>(fn: () => Promise<T>, retries: number, options?: RetryOptions<E>): Promise<T>
export async function retry<T, E extends Error>(fn: () => Promise<T>, condition: (error: E) => boolean, retries: number, options?: RetryOptions<E>): Promise<T>
export async function retry<T, E extends Error>(fn: () => Promise<T>, condition: number | ((error: E) => boolean), retries: number | RetryOptions<E> = 0, options: RetryOptions<E> = {}): Promise<T> {
  if (typeof retries !== 'number') {
    options = retries
    retries = 0
  }
  if (typeof condition === 'number') {
    retries = condition
    condition = () => true
  }
  try {
    return await fn()
  }
  catch (error: any) {
    options.onFailedAttempt && options.onFailedAttempt(error)
    if (retries > 0 && condition(error)) {
      if (options.delay)
        await sleep(options.delay)
      return await retry(fn, condition, retries - 1, options)
    }

    throw error
  }
}
