/**
 *  Remove undefined keys from an object
 * @param obj
 * @returns
 */
export function removeUndefinedKeys(obj: Record<string, any>) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined))
}
