const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const multipart = require('connect-multiparty')
const path = require('path')
const atob = require('atob')

const app = express()
const compiler = webpack(WebpackConfig)

const router = express.Router()

console.log(router)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    color: true,
    chunks:false
  }
}))

app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))

app.use(webpackHotMiddleware(compiler))
app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))

router.post('/updown/upload', function(req, res) {
  console.log(req.body, req.files)
  res.end('upload success!')
})


const port = process.env.PORT || 8090
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

router.get('/simple/get', (req, res) => {
  res.json({
    msg: `hello world`,
    code: 1
  })
})

router.get('/base/get', function(req, res) {
  res.json(req.query)
})

router.post('/base/post', function(req, res) {
  res.json(req.body)
})

router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})

router.post('/extend/post', function(req, res) {
  res.json(req.body)
})
router.get('/extend/get', function(req, res) {
  res.json(req.body)
})
router.options('/extend/options', function(req, res) {
  res.json(req.body)
})
router.delete('/extend/delete', function(req, res) {
  res.json(req.body)
})
router.head('/extend/head', function(req, res) {
  res.json(req.body)
})
router.put('/extend/put', function(req, res) {
  // res.json(req.body)
})
router.patch('/extend/patch', function(req, res) {
  res.json(req.body)
})

router.post('/extend/user', function(req, res) {
  res.json({
    code: 0,
    message: 'ok',
    result: {
      name: 'jack',
      age: 18
    }
  })
})

router.get('/interceptor/get', function(req, res) {
  res.end('hello')
})

router.post('/config/post', function(req, res) {
  res.json(req.body)
})

router.get('/cancel/get', function(req, res) {
  setTimeout(() => {
    res.json('hello')
  }, 100)
})

router.post('/cancel/post', function(req, res) {
  setTimeout(() => {
    res.json(req.body)
  }, 1000)
})

router.get('/xsrf/get', function(req, res) {
  res.json(req.cookies)
})

router.post('/auth/post', function(req, res) {
  console.log(req.headers)
  let auth = req.headers.authorization
  const [type, credentials] = auth.split(' ')
  console.log(atob(credentials))
  const [username, password] = atob(credentials).split(':')
  if (type === 'Basic' && username === 'Yee' && password === '123456') {
    res.json(req.body)
  } else {
    res.end('UnAuthorization')
  }
})

router.get('/status/304', function(req, res) {
  res.status(304)
  res.end()
})
app.use(router)
