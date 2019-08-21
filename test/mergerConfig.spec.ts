import axios from '../src'
import mergeConfig from '../core/mergeConfig'

describe('mergeConfig', () => {
  const defaults = axios.defaults
  test('should accepet undefined for second argument', () => {
    expect(mergeConfig(defaults, undefined)).toEqual(defaults)
  })

  test('should accepet an object for second argument', () => {
    expect(mergeConfig(defaults, {})).toEqual(defaults)
  })

  test('should not leave reference', () => {
    const merged = mergeConfig(defaults, {})
    expect(merged).not.toBe(defaults)
    expect(merged.headers).toEqual(defaults.headers)
  })

  test('should allow setting request options', () => {
    const config = {
      url: '__fake url__',
      params: '__fake params__',
      data: { foo: true }
    }
    const merged = mergeConfig(defaults, config)
    expect(merged.url).toBe(config.url)
    expect(merged.params).toBe(config.params)
    expect(merged.data).toStrictEqual(config.data)
  })

  test('should not inherit request options', () => {
    const localDefaults = {
      url: '__fake url__',
      params: '__fake params__',
      data: { foo: true }
    }
    const merged = mergeConfig(localDefaults, {})
    expect(merged.url).toBeUndefined()
    expect(merged.params).toBeUndefined()
    expect(merged.data).toBeUndefined()
  })

  test('should return default headers if pass config2 with undefined', () => {
    expect(
      mergeConfig(
        {
          headers: 'x-mock-header'
        },
        undefined
      )
    ).toEqual({
      headers: 'x-mock-header'
    })
  })

  test('should merge auth, headers with defaults', () => {
    expect(
      mergeConfig(
        {
          auth: undefined
        },
        {
          auth: {
            username: 'foo',
            password: 'test'
          }
        }
      )
    ).toEqual({
      auth: {
        username: 'foo',
        password: 'test'
      }
    })

    expect(
      mergeConfig(
        {
          auth: {
            username: 'foo',
            password: 'test'
          }
        },
        {
          auth: {
            username: 'baz',
            password: 'foobar'
          }
        }
      )
    ).toEqual({
      auth: {
        username: 'baz',
        password: 'foobar'
      }
    })
  })

  test('should overwrite auth, headers with non-object value', () => {
    expect(
      mergeConfig(
        {
          headers: {
            common: {
              Accepet: 'application/json, text/plain, */*'
            }
          }
        },
        {
          headers: null
        }
      )
    ).toEqual({
      headers: null
    })
  })

  test('should allow setting other options', () => {
    const merged = mergeConfig(defaults, {
      timeout: 100
    })
    expect(merged.timeout).toBe(100)
  })
})
