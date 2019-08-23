import axios from '../src'
import { getAjaxRequest } from './helper'

describe('auth', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should accept HTTP Basic auth with username/password', () => {
    axios('/foo', {
      auth: {
        username: 'darlin',
        password: 'girl'
      },
      method: 'post',
      data: {
        username: 'darlin',
        password: 'girl'
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Authorization']).toBe(
        'Basic ' +
          btoa(JSON.parse(request.params).username + ':' + JSON.parse(request.params).password)
      )
    })
  })

  test('should fail to encode HTTP Basic auth credentials with non-Latin1 characters', () => {
    return axios('/foo', {
      auth: {
        username: 'Aladßç£☃din',
        password: 'girl'
      }
    })
      .then(() => {
        throw new Error(
          'should not succeed to make a HTTP Basic auth request with non-Latin1 chars in credentials'
        )
      })
      .catch(err => {
        expect(/character/i.test(err.message)).toBeTruthy()
      })
  })
})
