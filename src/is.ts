import { isNumber } from '@antfu/utils'

/**
 * Check if the value is a number or a string of number
 * @param val
 * @returns
 */
export function isMaybeNumber(val: any): boolean {
  return isNumber(val) || /^\d+$/.test(val)
}
