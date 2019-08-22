import axios, { AxiosTransformer, AxiosResponse } from '../src'
import { getAjaxRequest } from './helper'

describe('transform', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should transform json to string', () => {
    const json = {
      foo: 'bar'
    }
    axios.post('/foo', json)
    return getAjaxRequest().then(request => {
      expect(request.params).toBe('{"foo":"bar"}')
    })
  })

  test('should transform string to json', () => {
    let response: AxiosResponse

    axios.post('/foo').then(res => {
      response = res
    })

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo":"bar"}'
      })
      setTimeout(() => {
        expect(response.data).toEqual({ foo: 'bar' })
      }, 100)
    })
  })

  test('should override default transform', () => {
    const data = {
      foo: 'bar'
    }
    axios.post('/foo', data, {
      transformRequest: data => {
        return data
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.params).toEqual({ foo: 'bar' })
    })
  })

  test('should allow an Array of transformers', () => {
    const data = {
      foo: 'bar'
    }
    axios.post('/foo', data, {
      transformRequest: (axios.defaults.transformRequest as AxiosTransformer[]).concat(data => {
        return data.replace('bar', 'baz')
      })
    })
    return getAjaxRequest().then(request => {
      expect(JSON.parse(request.params).foo).toBe('baz')
    })
  })

  test('should allow mutating headers', () => {
    const token = Date.now()

    // axios({
    //   url: '/foo',
    //   transformRequest: function(data, headers) {
    //     headers['X-Authorization'] = token
    //     return data
    //   }
    // })

    axios.post(
      '/foo',
      { a: 123 },
      {
        transformRequest: (data, headers) => {
          console.log(data)
          headers['X-Authorization'] = token
          return data
        }
      }
    )

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-Authorization']).toBe(token)
    })
  })
})
