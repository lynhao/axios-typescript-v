/** 入口文件 **/
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './type/index.ts'
import { extend } from '../example/helpers/util'
import Axios from '../core/Axios'
import defaults from './default'
import mergeConfig from '../core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)
axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
