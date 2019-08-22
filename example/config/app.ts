import axios from '../../src/index'
import qs from 'qs'
import { AxiosTransformer } from '../../src/type'
axios.defaults.headers.common['test2'] = 123
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios({
//   url: '/config/post',
//   method: 'post',
//   data:qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321',
//   }
// }).then((res) => {
//   console.log(res.data)
// })

// axios({
//   transformRequest: [(function(data, headers) {
//     debugger
//     headers['test'] = 'test'
//     return qs.stringify(data)
//   }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
//   transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
//     if (typeof data === 'object') {
//       data.b = 20
//     }
//     return data
//   }],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 10
//   }
// }).then((res) => {
//   console.log(res.data)
// })

// axios('/config/post', {
//   transformRequest: function(data, headers) {
//     headers['test'] = 'test'
//     return data
//   }
// })
axios.post('/config/post', {foo: 123}, {
  transformRequest: function(data, headers) {
    headers['test'] = 'test'
    return JSON.stringify(data)
  }
})

// const instance = axios.create({
//   transformRequest: [(function(data, headers) {
//     // headers['test'] = 'test'
//     return qs.stringify(data)
//   }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
//   transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
//     if (typeof data === 'object') {
//       data.b = 20
//     }
//     return data
//   }]
// })

// instance({
//   url: '/config/post',
//   method: 'post',
//   data: {
//     static: '1'
//   }
// }).then(res => {
//   console.log(res.data)
// })