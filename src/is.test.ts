import { expect, it } from 'vitest'
import { isBigInt, isEmail, isIpAddress, isIpv4, isIpv6, isMaybeNumber, isStringNumber, isURL } from './is'

it('isMaybeNumber', () => {
  expect(isMaybeNumber(1)).toBeTruthy()
  expect(isMaybeNumber('1')).toBeTruthy()
  expect(isMaybeNumber('0')).toBeTruthy()
  expect(isMaybeNumber('0a')).toBeFalsy()
  expect(isMaybeNumber('asb89*')).toBeFalsy()
})

it('isStringNumber', () => {
  expect(isStringNumber(1 as unknown as string)).toBeFalsy()
  expect(isStringNumber('1')).toBeTruthy()
  expect(isStringNumber('0')).toBeTruthy()
  expect(isStringNumber('0a')).toBeFalsy()
  expect(isStringNumber('asb89*')).toBeFalsy()
})

it('isEmail', () => {
  expect(isEmail('hi@mrong.me')).toBeTruthy()
  expect(isEmail('213')).toBeFalsy()
  expect(isEmail('hi@@mrong.me')).toBeFalsy()
})

it('isIpv6', () => {
  expect(isIpv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBeTruthy()
  expect(isIpv6('FE80:0000:0000:0000:0202:B3FF:FE1E:8329')).toBeTruthy()
  expect(isIpv6('192.168.1.1')).toBeFalsy()
  expect(isIpv6('test:test:test:test:test:test:test:test')).toBeFalsy()
})

it('isIpv4', () => {
  expect(isIpv4('192.168.1.1')).toBeTruthy()
  expect(isIpv4('127.0.0.1')).toBeTruthy()
  expect(isIpv4('0.0.0.0')).toBeTruthy()
  expect(isIpv4('FE80:0000:0000:0000:0202:B3FF:FE1E:8329')).toBeFalsy()
})

it('isIpAddress', () => {
  expect(isIpAddress('192.168.1.1')).toBeTruthy()
  expect(isIpAddress('127.0.0.1')).toBeTruthy()
  expect(isIpAddress('0.0.0.0')).toBeTruthy()
  expect(isIpAddress('FE80:0000:0000:0000:0202:B3FF:FE1E:8329')).toBeTruthy()
  expect(isIpAddress('192.168.1.1', 'ipv4')).toBeTruthy()
  expect(isIpAddress('192.168.1.1', 'ipv6')).toBeFalsy()
  expect(isIpAddress('FE80:0000:0000:0000:0202:B3FF:FE1E:8329', 'ipv4')).toBeFalsy()
  expect(isIpAddress('FE80:0000:0000:0000:0202:B3FF:FE1E:8329', 'ipv6')).toBeTruthy()
})

it('isURL', () => {
  expect(isURL('abcdef')).toBeFalsy()
  expect(isURL('www.whatever.com')).toBeFalsy()
  expect(isURL('https://github.com/murongg')).toBeTruthy()
  expect(isURL('https://www.facebook.com/')).toBeTruthy()
  expect(isURL('http://www.example.com/')).toBeTruthy()
})

it('isBigInt', () => {
  expect(isBigInt(1)).toBeFalsy()
  expect(isBigInt(1n)).toBeTruthy()
  expect(isBigInt('1')).toBeFalsy()
  expect(isBigInt('1n')).toBeFalsy()
  expect(isBigInt('1.0')).toBeFalsy()
})
