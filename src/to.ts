import { isMaybeNumber } from './is'

export function toNumber(val: any) {
  return isMaybeNumber(val) ? Number(val) : 0
}
