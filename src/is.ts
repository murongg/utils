import { isNumber, isString } from '@antfu/utils'

/**
 * Check if the value is a string of number
 * @param val
 * @returns
 */
export function isStringNumber(val: string): boolean {
  return /^\d+$/.test(val) && isString(val)
}

/**
 * Check if the value is a number or a string of number
 * @param val
 * @returns
 */
export function isMaybeNumber(val: any): boolean {
  return isNumber(val) || isStringNumber(val)
}
