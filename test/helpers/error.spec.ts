import { AxiosError, createError } from '../../example/helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/type'

describe('helpers::error', () => {
  test('should create an Error with message, config, code, request, response and isAxiosError', () => {
    const request = new XMLHttpRequest()
    const config: AxiosRequestConfig = { method: 'post' }
    const response: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { foo: 'bar' }
    }
    const error = createError('Boom!!!', config, 'STH WRONG', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('Boom!!!')
    expect(error.config).toEqual(config)
    expect(error.code).toBe('STH WRONG')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
    expect(error.isAxiosError).toBeTruthy()
  })
})
