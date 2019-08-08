import {
        AxiosRequestConfig,
        AxiosPromise,
        AxiosResponse, 
      } from '../src/type/index'
import { parseHeaders } from '../example/helpers/headers'
import { createError } from '../example/helpers/error'
import { isURLSameOrigin } from '../example/helpers/url'
import cookie from '../example/helpers/cookie'
import { isFormData } from '../example/helpers/util'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout, cancelToken, withCredentials, xsrfCookieName, xsrfHeaderName, onUploadProgress, onDownloadProgress } = config
    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url, true)

    configureRequest() // 用于配置 request 对象

    addEvents() // 用于request对象添加处理函数

    processHeaders() // 用于处理请求头headers

    processCancel() // 取消http请求操作

    request.send(data) // 发送请求

    function configureRequest (): void {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = true
      }
    }
    
    function addEvents (): void {
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return
        }

        if (request.status === 0) {
          return
        }

        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        handleResponse(response)
      }
      request.onerror = function handleError() {
        reject(createError('Network error!', config, null, request))
      }

      request.ontimeout = function handleTimeout() {
        console.log(config)
        reject(
          createError(`timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
        )
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }

    }

    function processHeaders () {
      if (isFormData(data)) {
        // 当通过Formdata上传文件时，浏览器会给content-type赋值为'multiplart/form-data',先删除默认的content-type
        delete headers['Content-Type']
      }
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }

      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel () {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response) {
      if ((response.status >= 200 && response.status < 300) || response.status === 304) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
