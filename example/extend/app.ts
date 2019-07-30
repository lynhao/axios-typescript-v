import axios, { AxiosError } from '../../src/index'


// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')
let data = {msg: 'post'}
let headers = {'content-type': 'application-json'}
axios.post('/extend/post', data, headers )

// axios.put('/extend/put', { msg: 'put' }).catch((e: AxiosError) => {
//   console.log(e.message)
//   console.log(e.config)
// })

// axios.patch('/extend/patch', { msg: 'patch' })

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  },
  headers: {
    'content-type': 'application/json'
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user', {method: 'post'})
    .then(res => res.data)
    .catch(err => console.log(err))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
    console.log(user.result.age)
  }
}

test()