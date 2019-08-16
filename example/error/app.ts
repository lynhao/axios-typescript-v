import axios, { AxiosError } from '../../src/index'

// axios({
//   method: 'get',
//   url: '/error/get'
// }).then((res) => {
//   console.log(res)
// }).catch((e: AxiosError) => {
//   console.log('1=>', e.message, e.isAxiosError)
// })

// axios({
//   method: 'get',
//   url: '/error/get'
// }).then((res) => {
//   console.log(res)
// }).catch((e: AxiosError) => {
//   console.log('2=>', e.message, e.config, e.isAxiosError)
// })

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log(res)
  }).catch((e: AxiosError) => {
    console.log('3=>', e.message, e.isAxiosError)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.config)
  console.log(e.code)
})