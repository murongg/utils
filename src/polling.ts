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
export async function polling(fn: Fn<Promise<boolean> | boolean>, interval = 0, maxAttempts = 100): Promise<boolean> {
  let attempts = 0
  while (attempts < maxAttempts) {
    const result = await fn()
    if (result)
      return true

    await sleep(interval)
    attempts++
  }
  return false
}
