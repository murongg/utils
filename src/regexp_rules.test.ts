import { expect, it } from 'vitest'
import { RegexpRules } from './regexp_rules'

it('email', () => {
  expect(RegexpRules.email.test('hi@mrong.me')).toBeTruthy()
  expect(RegexpRules.email.test('hi@@mrong.me')).toBeFalsy()
  expect(RegexpRules.email.test('213.me')).toBeFalsy()
})

it('ipv6', () => {
  expect(RegexpRules.ipv6.test('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBeTruthy()
  expect(RegexpRules.ipv6.test('FE80:0000:0000:0000:0202:B3FF:FE1E:8329')).toBeTruthy()
  expect(RegexpRules.ipv6.test('192.168.1.1')).toBeFalsy()
  expect(RegexpRules.ipv6.test('test:test:test:test:test:test:test:test')).toBeFalsy()
})

it('ipv4', () => {
  expect(RegexpRules.ipv4.test('192.168.1.1')).toBeTruthy()
  expect(RegexpRules.ipv4.test('127.0.0.1')).toBeTruthy()
  expect(RegexpRules.ipv4.test('0.0.0.0')).toBeTruthy()
  expect(RegexpRules.ipv4.test('FE80:0000:0000:0000:0202:B3FF:FE1E:8329')).toBeFalsy()
})

it('url', () => {
  expect(RegexpRules.url.test('abcdef')).toBeFalsy()
  expect(RegexpRules.url.test('www.whatever.com')).toBeFalsy()
  expect(RegexpRules.url.test('https://github.com/murongg')).toBeTruthy()
  expect(RegexpRules.url.test('https://www.facebook.com/')).toBeTruthy()
  expect(RegexpRules.url.test('http://www.example.com/')).toBeTruthy()
})

