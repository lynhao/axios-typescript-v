/** 入口文件 **/
import { AxiosRequestConfi } from './type/index.ts'
import xhr from './xhr.ts'

function axios(config: AxiosRequestConfi) {
  xhr(config)
}

export default axios
