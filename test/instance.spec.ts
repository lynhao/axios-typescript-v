import axios, { AxiosRequestConfig, AxiosResponse } from '../src'
import { getAjaxRequest } from './helper'

describe('instance', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should make a http request without verb helper', () => {
    const instance = axios.create()

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })

  test('should make a http request', () => {
    const instance = axios.create()

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('GET')
    })
  })

  test('should make a post request', () => {
    const instance = axios.create()

    instance.post('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('POST')
    })
  })

  test('should make a put request', () => {
    const instance = axios.create()

    instance.put('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PUT')
    })
  })

  test('should make a patch request', () => {
    const instance = axios.create()

    instance.patch('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PATCH')
    })
  })

  test('should make a options request', () => {
    const instance = axios.create({ timeout: 1000 })

    instance.options('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('OPTIONS')
    })
  })

  test('should make a delete request', () => {
    const instance = axios.create()

    instance.delete('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('DELETE')
    })
  })

  test('should make a head request', () => {
    const instance = axios.create()

    instance.head('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('HEAD')
    })
  })

  test('shold have the default headers', () => {
    const instance = axios.create()

    instance.post('/foo')

    return getAjaxRequest().then(request => {
      expect(typeof instance.defaults.headers.common).toBe('object')
      expect(typeof instance.defaults.headers).toBe('object')
    })
  })

  test('should have interceptor on the instance', done => {
    axios.interceptors.request.use(config => {
      config.timeout = 2000
      return config
    })

    axios.interceptors.request.use(config => {
      config.withCredentials = true
      return config
    })

    const instance = axios.create()

    let response: AxiosResponse
    instance.get('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })

      setTimeout(() => {
        expect(response.config.timeout).toEqual(0)
        expect(response.config.withCredentials).toEqual(undefined)

        done()
      }, 100)
    })
  })

  test('should get the computed url', () => {
    const fakeConfig: AxiosRequestConfig = {
      baseURL: 'https://www.baidu.com',
      url: '/users/admin',
      params: {
        idClient: 1,
        idTest: 2,
        testString: 'thisIsTest'
      }
    }
    expect(axios.getUri(fakeConfig)).toBe(
      'https://www.baidu.com/users/admin?idClient=1&idTest=2&testString=thisIsTest'
    )
  })
})
