/**
 * Created by yqdong on 2017/9/6.
 * qq: 1013501639
 * @author yqdong
 *
 */
const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')

const webpackConfig = require('./webpack.config.dev')

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware') (compiler, {
  publicPath: '/',
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(devMiddleware)

app.use(hotMiddleware)

app.use(express.static('./src'))

const port = 3000
const uri = 'http://localhost:' + port

let _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // opn(uri + '')
  _resolve()
})

const server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
