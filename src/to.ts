import { isMaybeNumber } from './is'

/**
 * Convert a value to a number.
 * @param val
 * @returns
 */
export function toNumber(val: any) {
  return isMaybeNumber(val) ? Number(val) : 0
}
