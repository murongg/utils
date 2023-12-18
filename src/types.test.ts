/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Equal, Expect, NotEqual } from '@type-challenges/utils'
import type { KeyofToArray, MaybeConstructor, NullableArray, NullableObject, NullableObjectWithKeys, ValueReset } from './types'

class TestMaybeConstructorCase {
  a = ''
}
interface TestMaybeConstructorInterfaceCase {
  a: string
}

class TestMaybeConstructor1 {
  b = ''
}
interface TestMaybeConstructorInterface1 {
  b: string
}

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
  // test ValueReset
  Expect<Equal<ValueReset<{
    a: string
    b: string
  }, 'a', number>, {
    a: number
    b: string
  }>>,
  // test MaybeConstructor
  Expect<Equal<MaybeConstructor<TestMaybeConstructorCase>, TestMaybeConstructorCase>>,
  Expect<Equal<MaybeConstructor<TestMaybeConstructorInterfaceCase>, TestMaybeConstructorInterfaceCase>>,
  Expect<Equal<MaybeConstructor<TestMaybeConstructorInterface1>, TestMaybeConstructor1>>,
  Expect<Equal<MaybeConstructor<TestMaybeConstructor1>, TestMaybeConstructorInterface1>>,
  Expect<NotEqual<MaybeConstructor<TestMaybeConstructorCase>, TestMaybeConstructor1>>,
  Expect<NotEqual<MaybeConstructor<TestMaybeConstructor1>, TestMaybeConstructorCase>>,
]
