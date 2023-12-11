import type { Nullable } from '@antfu/utils'

/**
 * Object value null or whatever
 */
export type NullableObject<T extends object> = {
  [P in keyof T]: Nullable<T[P]>
}

/**
 * Array value null or whatever
 * @example NullableArray<string[]>
 */
export type NullableArray<T> = {
  [P in keyof T]: Nullable<T[P]>
}

/**
 * Object value null or whatever with keys
 * @example NullableObjectWithKeys<Record<'a' | 'b', string>, 'a'>
 */
export type NullableObjectWithKeys<T extends object, Key extends keyof T> = {
  [P in keyof T]: P extends Key ? Nullable<T[P]> : T[P]
}

/**
 * Array value null or whatever with keys
 */
export type KeyofToArray<T extends object> = keyof T extends never ? never[] : (keyof T)[]
