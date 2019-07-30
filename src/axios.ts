/** 入口文件 **/
import { AxiosInstance, AxiosRequestConfig } from './type/index.ts'
import { extend } from '../example/helpers/util'
import Axios from '../core/Axios'
import defaults from './default'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosInstance
}
const axios = createInstance(defaults)

export default axios
