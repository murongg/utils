import type { Constructor, Nullable } from '@antfu/utils'

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
export type KeyofToArray<T extends object> = keyof T extends never ? [] : (keyof T)[]

/**
 * Reset object value
 */
export type ValueReset<T extends object, K extends keyof T, V> = {
  [P in keyof T]: P extends K ? V : T[P]
}

/**
 * Maybe Constructor
 */
export type MaybeConstructor<T> = T extends Constructor<T> ? Constructor<T> : T

/**
 * Arguments function
 */
export type ArgumentsFn<T> = (...args: any[]) => T

/**
 * Deep nullable
 */
export type DeepNullable<T> = T extends Function
  ? T | null
  : T extends Date | RegExp
    ? T | null
    : T extends Array<infer U>
      ? Array<DeepNullable<U>> | null
      : T extends object
        ? { [K in keyof T]: DeepNullable<T[K]> | null }
        : T | null
