import axios from '../../src'

axios.get('/status/304').then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})

axios.get('/status/304', {
  validateStatus(status) {
    return status >= 200 && status < 304
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})