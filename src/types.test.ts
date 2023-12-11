/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Equal, Expect } from '@type-challenges/utils'
import type { KeyofToArray, NullableArray, NullableObject, NullableObjectWithKeys } from './types'

type cases = [
  // test NullableObject
  Expect<Equal<NullableObject<{
    a: string
    b: number
  }>, {
    a: string | null | undefined
    b: number | null | undefined
  }>>,
  // test NullableArray
  Expect<Equal<NullableArray<string[]>, (string | null | undefined)[]>>,
  // test NullableObjectWithKeys
  Expect<Equal<NullableObjectWithKeys<{
    a: string
    b: string
  }, 'a'>, {
    a: string | null | undefined
    b: string
  }>>,
  // test KeyofToArray
  Expect<Equal<KeyofToArray<{
    a: string
    b: string
  }>, ('a' | 'b')[]>>,
  Expect<Equal<KeyofToArray<{}>, []>>,
]
