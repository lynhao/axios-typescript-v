/** 入口文件 **/
import { AxiosRequestConfig } from './type/index.ts'
import xhr from './xhr.ts'
import { buildURL } from '../example/helpers/url'
import { transformRequest } from '../example/helpers/datas'
import { processHeaders } from '../example/helpers/headers'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  console.log(config)
  xhr(config)
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

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
