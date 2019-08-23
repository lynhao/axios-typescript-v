import axios from '../src'
import { getAjaxRequest } from './helper'

describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should add a download progress handler', () => {
    const progressSpy = jest.fn() // 返回一个新的，没被使用过的mock function

    axios('/foo', { onDownloadProgress: progressSpy })

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo":"bar"}'
      })
      expect(progressSpy).toHaveBeenCalled()
    })
  })

  test('should add a upload progress handler', done => {
    const progressSpy = jest.fn()

    axios('/foo', { onUploadProgress: progressSpy })

    getAjaxRequest().then(request => {
      // Jasmine AJAX doesn't trigger upload events. Waiting for jest-ajax fix
      // expect(progressSpy).toHaveBeenCalled()
      done()
    })
  })
})
