/** 入口文件 **/
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../src/type/index'
import xhr from './xhr.ts'
import { buildURL } from '../example/helpers/url'
import { transformRequest, transformResponse } from '../example/helpers/datas'
import { processHeaders } from '../example/helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
  config.headers = transformHeaders(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
