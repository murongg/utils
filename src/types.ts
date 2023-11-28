export type Nullable<T> = T | null | undefined
export type NullableObject<T extends Object> = {
  [P in keyof T]: Nullable<T[P]>
}
export type NullableArray<T> = Array<Nullable<T>>
export type NullableObjectWithKeys<T extends Object, Key extends keyof T > = {
  [P in keyof T]: P extends Key ? Nullable<T[P]> : T[P]
}
