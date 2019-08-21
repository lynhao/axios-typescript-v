import Cancel from '../../cancel/Cancel'
import { Canceler } from '../../src/type'
import CancelToken from '../../cancel/CancelToken'

describe('cancel::CancelToken', () => {
  describe('reason', () => {
    test('should return a Cancel if cancelation has been requested', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled')
      expect(token.reason).toEqual(expect.any(Cancel))
    })

    test('should has no side effect if call cancellation for muti times', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled')
      cancel!('Operation has been canceled')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled')
    })

    test('should return undefined if cancellation has not been requested', () => {
      const token = new CancelToken(() => {
        // TODO
      })
      expect(token.reason).toBeUndefined()
    })
  })

  describe('promise', () => {
    test('should return a promise that resolves when cancellation is requested', done => {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })
      token.promise.then(value => {
        expect(value).toEqual(expect.any(Cancel))
        done()
      })

      cancel!('Operation has been canceled')
    })
  })

  describe('throwIfRequested', () => {
    test('should throw if cancellation has been requested', () => {
      let cancel: Canceler

      const token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled')
      try {
        token.throwIfRequested()
        fail('Expected throwIfRequested to throw')
      } catch (thrown) {
        if (!(thrown instanceof Cancel)) {
          fail('Expected throwIfRequested to throw a Cacel, but test threw ' + thrown)
        }
        expect(thrown.message).toBe('Operation has been canceled')
      }
    })

    test('should does not throw if cancellation has not requested', () => {
      const token = new CancelToken(() => {
        //TODO
      })
      token.throwIfRequested()
    })
  })

  describe('source', () => {
    test('should return an object containing token and cancel function', () => {
      const source = CancelToken.source()
      expect(source.token).toEqual(expect.any(CancelToken))
      expect(source.cancel).toEqual(expect.any(Function))
      expect(source.token.reason).toBeUndefined()
      source.cancel('Operation has been canceled')
      expect(source.token.reason!.message).toBe('Operation has been canceled')
      expect(source.token.reason).toEqual(expect.any(Cancel))
    })
  })
})
