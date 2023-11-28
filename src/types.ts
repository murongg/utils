import type { Nullable } from '@antfu/utils'

/**
 * Object value null or whatever
 */
export type NullableObject<T extends Object> = {
  [P in keyof T]: Nullable<T[P]>
}

/**
 * Array value null or whatever
 */
export type NullableArray<T> = Array<Nullable<T>>
/**
 * Object value null or whatever with keys
 */
export type NullableObjectWithKey<T extends Object, Key extends keyof T > = {
  [P in keyof T]: P extends Key ? Nullable<T[P]> : T[P]
}
