import axios from '../../src'

function getA() {
  return axios.get('/stat-method/A')
}

function getB() {
  setTimeout(() => {
   return axios.get('/stat-method/B')   
  }, 3000)
}

axios.all([getA(), getB()])
  .then(axios.spread(function(resA, resB) {
    console.log("A", resA)
    console.log("B", resB)
  }))


axios.all([getA(), getB()])
  .then(([resA, resB]) => {
    console.log(resA.data)
    console.log(resB.data)
  })

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))