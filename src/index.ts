/** 入口文件 **/
import { AxiosRequestConfi } from './type/index.ts'
import xhr from './xhr.ts'
import { buildURL } from '../example/helpers/url'

function axios(config: AxiosRequestConfi): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfi): void {
  config.url = transformUrl(config)
}

function transformUrl(config: AxiosRequestConfi): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
