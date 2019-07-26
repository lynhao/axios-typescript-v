/** 入口文件 **/
import { AxiosInstance } from './type/index.ts'
import { extend } from '../example/helpers/util'
import Axios from '../core/Axios'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  console.log(instance)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
