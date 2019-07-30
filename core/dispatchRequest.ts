/** 入口文件 **/
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../src/type/index'
import xhr from './xhr.ts'
import { buildURL } from '../example/helpers/url'
import { transformRequest, transformResponse } from '../example/helpers/datas'
import { processHeaders, flattenHeaders } from '../example/helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    console.log('res', res)
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  // config.data = transformRequestData(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = transformHeaders(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  // res.data = transformResponse(res.data)
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
