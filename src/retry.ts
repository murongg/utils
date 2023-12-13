export async function retry<T>(fn: () => Promise<T>, retries: number): Promise<T> {
  try {
    return await fn()
  }
  catch (error) {
    if (retries > 0)
      return await retry(fn, retries - 1)

    throw error
  }
}
