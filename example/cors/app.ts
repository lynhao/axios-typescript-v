import axios from '../../src'

document.cookie = 'a=b'

axios.get('http://127.0.0.1:8088/cors/get', {withCredentials: true}).then(res => {
  console.log(res)
})

axios.post('http://127.0.0.1:8088/cors/server2', { cors: 'cors'}, {
  withCredentials: true
}).then(res => {
  console.log(res)
})