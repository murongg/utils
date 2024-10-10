import { isNumber, isString } from '@antfu/utils'
import { RegexpRules } from './regexp_rules'

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

/**
 * Check if the value is a email
 * @param val
 * @returns
 */
export function isEmail(val: string): boolean {
  return RegexpRules.email.test(val)
}

/**
 * Check if the value is a ipv6
 * @param val
 * @returns
 */
export function isIpv6(val: string): boolean {
  return RegexpRules.ipv6.test(val)
}

/**
 * Check if the value is a ipv4
 * @param val
 * @returns
 */
export function isIpv4(val: string): boolean {
  return RegexpRules.ipv4.test(val)
}

/**
 * Check if the value is a ip address
 * @param val
 * @param type
 * @returns
 */
export function isIpAddress(val: string): boolean
export function isIpAddress(val: string, type: 'ipv4' | 'ipv6'): boolean
export function isIpAddress(val: string, type?: 'ipv4' | 'ipv6'): boolean {
  if (type)
    return type === 'ipv4' ? isIpv4(val) : isIpv6(val)
  return isIpv4(val) || isIpv6(val)
}

/**
 * Check if the value is a url
 * @param val
 * @returns
 */
export function isURL(val: string): boolean {
  return RegexpRules.url.test(val)
}

/**
 * Check if the value is a bigint
 * @param val
 * @returns
 */
export function isBigInt(val: any): boolean {
  return typeof val === 'bigint'
}

/**
 * Check if the value is a json string
 * @param val
 * @returns
 */
export function isJsonString(val: string): boolean {
  try {
    const parsed = JSON.parse(val)
    return typeof parsed === 'object' && parsed !== null
  }
  catch {
    return false
  }
}

/**
 * Check if the value is a integer
 * @param val
 * @returns
 */
export function isInteger(val: any): boolean {
  return Number.isInteger(val)
}
