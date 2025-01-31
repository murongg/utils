/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Equal, Expect, NotEqual } from '@type-challenges/utils'
import type { ArgumentsFn, DeepNullable, KeyofToArray, MaybeConstructor, NullableArray, NullableObject, NullableObjectWithKeys, ValueReset } from './types'

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

  // test RestArgumentsFn
  Expect<Equal<ArgumentsFn<number>, (...args: any[]) => number>>,
  Expect<Equal<ArgumentsFn<Promise<number>>, (...args: any[]) => Promise<number>>>,
  Expect<Equal<ArgumentsFn<void>, (...args: any[]) => void>>,

  // test DeepNullable
  Expect<Equal<DeepNullable<string>, string | null>>,
  Expect<Equal<DeepNullable<number>, number | null>>,
  Expect<Equal<DeepNullable<boolean>, boolean | null>>,
  Expect<Equal<DeepNullable<undefined>, undefined | null>>,
  Expect<Equal<DeepNullable<null>, null | null>>,
  Expect<Equal<DeepNullable<Date>, Date | null>>,
  Expect<Equal<DeepNullable<RegExp>, RegExp | null>>,
  Expect<Equal<DeepNullable<Function>, Function | null>>,
  Expect<Equal<DeepNullable<{
    a: string
    b: number
  }> | null, {
    a: string | null
    b: number | null
  } | null>>,
  Expect<Equal<DeepNullable<{
    a: string
    b: number
    c: {
      a: string
      b: number
    }
    d: {
      a: Function
      b: RegExp
      c: Date
      d: undefined
      e: null
    }
  }>, {
    a: string | null
    b: number | null
    c: {
      a: string | null
      b: number | null
    } | null
    d: {
      a: Function | null
      b: RegExp | null
      c: Date | null
      d: undefined | null
      e: null | null
    } | null
  }>>,

]
