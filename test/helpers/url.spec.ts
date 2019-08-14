import { buildURL, isURLSameOrigin, isAbsoluteUrl, combineURL } from '../../example/helpers/url'

describe('helpers::url', () => {
  describe('buildURL', () => {
    test('should support null params', () => {
      expect(buildURL('/foo')).toBe('/foo')
    })

    test('should support params', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar'
        })
      ).toBe('/foo?foo=bar')
    })

    test('should ignore if some param value is null', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar',
          baz: null
        })
      ).toBe('/foo?foo=bar')
    })

    test('should ignore if the only param value is null', () => {
      expect(
        buildURL('/foo', {
          foo: null
        })
      ).toBe('/foo')
    })

    test('should support object params', () => {
      expect(
        buildURL('/foo', {
          foo: {
            bar: 'baz'
          }
        })
      ).toBe('/foo?foo=' + encodeURI('{"bar":"baz"}'))
    })

    test('should support date params', () => {
      const date = new Date()
      expect(
        buildURL('/foo', {
          date: date
        })
      ).toBe('/foo?date=' + date.toISOString())
    })

    test('should support array params', () => {
      expect(
        buildURL('/foo', {
          foo: ['bar', 'baz']
        })
      ).toBe('/foo?foo[]=bar&foo[]=baz')
    })

    test('should support special char params', () => {
      expect(
        buildURL('/foo', {
          foo: '@:&,[] '
        })
      ).toBe('/foo?foo=@:$,[]+')
    })

    test('should support existing params', () => {
      expect(
        buildURL('/foo?foo=bar', {
          bar: ['baz']
        })
      ).toBe('/foo?foo=bar&bar[]=baz')
    })

    test('should correct discard url hash mark', () => {
      expect(
        buildURL('/foo?foo=bar#hash', {
          query: 'baz'
        })
      ).toBe('/foo?foo=bar&query=baz')
    })

    test('should use serializer if provided', () => {
      const serializer = jest.fn(params => {
        // return qs.stringify(params, { arrayFormat: 'brackets' })
        return 'foo=bar'
      })
      const params = { foo: 'bar' }
      expect(buildURL('/foo', params, serializer)).toBe('/foo?foo=bar')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenCalledWith(params)
    })

    test('should support URLSearchParams', () => {
      expect(buildURL('/foo', new URLSearchParams('bar=baz'))).toBe('/foo?bar=baz')
    })
  })

  describe('isAbsoluteUrl', () => {
    test('should return true if URL begins with valid scheme name', () => {
      expect(isAbsoluteUrl('http://lynhao.cn/index')).toBeTruthy()
      expect(isAbsoluteUrl('custom-scheme-v1://123456')).toBeTruthy()
    })

    test('should return false if URL begins with invalid scheme name', () => {
      expect(isAbsoluteUrl('123://lyn.com')).not.toBeTruthy()
      expect(isAbsoluteUrl('!@:.com')).toBeFalsy()
    })

    test('should return true if URL is protocol-relative', () => {
      expect(isAbsoluteUrl('//example.com/')).toBeTruthy()
    })

    test("should return false if URL's protocol duplicate or more than one", () => {
      expect(isAbsoluteUrl('http://https://xxx.com')).not.toBeFalsy()
      expect(isAbsoluteUrl('http:https://lyn.com')).toBeFalsy()
    })

    test('should return false if URL is relative', () => {
      expect(isAbsoluteUrl('/foo')).toBeFalsy()
      expect(isAbsoluteUrl('foo')).toBeFalsy()
    })
  })

  describe('combineURL', () => {
    test('should combine URL', () => {
      expect(combineURL('https://git.github.io', '/lyn')).toBe('https://git.github.io/lyn')
    })

    test('should remove duplicate slashes', () => {
      expect(combineURL('https://git.github.io', '/lyn')).toBe('https://git.github.io/lyn')
      expect(combineURL('https://git.github.io/', '/lyn')).toBe('https://git.github.io/lyn')
    })

    test('should insert missing slash', () => {
      expect(combineURL('https://git.github.io', 'lyn')).toBe('https://git.github.io/lyn')
    })

    test('should not insert slash when relative url mussing or empty', () => {
      expect(combineURL('https://git.github.io', '')).toBe('https://git.github.io')
    })

    test('should allow a single slash for relative url', () => {
      expect(combineURL('https://git.github.io', '/')).toBe('https://git.github.io/')
    })
  })

  describe('isURLSameOrigin', () => {
    test('should detect same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })

    test('should detect different origin', () => {
      expect(isURLSameOrigin('https://www.baidu.com')).toBeFalsy()
    })
  })
})
