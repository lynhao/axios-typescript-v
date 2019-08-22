import axios from '../src'
import { getAjaxRequest } from './helper'

describe('cancel', () => {
  const CancelToken = axios.CancelToken
  const Cancel = axios.Cancel

  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  describe('when called before sending request', () => {
    test('should reject Promise with a Cancel object', done => {
      const source = CancelToken.source()
      source.cancel('Operation has been canceled')

      axios
        .get('/foo', {
          cancelToken: source.token
        })
        .catch(reason => {
          expect(reason).toEqual(expect.any(Cancel))
          expect(reason.message).toBe('Operation has been canceled')
          done()
        })
    })
  })

  describe('when called after request has been sent', () => {
    test('should reject Promise with a Cancel object', () => {
      const source = CancelToken.source()

      axios
        .get('/foo/bar', () => {
          cancelToken: source.token
        })
        .catch(reason => {
          expect(reason).toEqual(expect.any(Cancel))
          expect(reason.message).toBe('Operation has been canceled')
        })

      return getAjaxRequest().then(request => {
        source.cancel('Operation has been canceled')
        setTimeout(() => {
          request.respondWith({
            status: 200,
            responseText: 'OK'
          })
        }, 100)
      })
    })

    test('call abort on request object', done => {
      const source = CancelToken.source()
      let request: any
      axios
        .get('/foo/bar', {
          cancelToken: source.token
        })
        .catch(reason => {
          expect(request.statusText).toBe('abort')
          done()
        })

      getAjaxRequest().then(rq => {
        source.cancel()
        request = rq
      })
    })
  })

  describe('when called after response has been received', () => {
    test('should not cause unhandled rejection', done => {
      const source = CancelToken.source()

      axios
        .get('/foo', {
          CancelToken: source.token
        })
        .then(() => {
          window.addEventListener('unhandledrejection', () => {
            // 表示一个异常的结束
            done.fail('Unhandled rejection')
          })
          source.cancel()
          setTimeout(done, 100)
        })

      getAjaxRequest().then(request => {
        request.respondWith({
          status: 200,
          responseText: 'OK'
        })
      })
    })
  })
})
