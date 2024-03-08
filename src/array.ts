/**
 * Get the difference between two arrays
 * @param a
 * @param b
 * @returns
 */
export function difference<T>(a: T[], b: T[]): T[] {
  return a.filter(x => !b.includes(x))
}

/**
 * Get the intersection between two arrays
 * @param a
 * @param b
 * @returns
 */
export function intersection<T>(a: T[], b: T[]): T[] {
  return a.filter(x => b.includes(x))
}

/**
 * Get the union between two arrays
 * @param a
 * @param b
 * @returns
 */
export function union<T>(a: T[], b: T[]): T[] {
  return [...a, ...difference(b, a)]
}
