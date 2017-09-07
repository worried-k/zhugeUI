/**
 * Created by yqdong on 2017/9/7.
 * qq: 1013501639
 * @author yqdong
 *
 */
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const basePath = path.resolve(__dirname, '../src')

const readDemo = function (basePath, inDemoDir, result) {
  result = result ? result : {
    entry: {},
    plugins: []
  }
  const files = fs.readdirSync(basePath)
  files.forEach(function (fileOrDir) {
    const currentPath = path.resolve(basePath, fileOrDir)
    let stat = fs.statSync(currentPath)
    if (inDemoDir && stat.isFile() && fileOrDir === 'index.js') {

      const componentsName = currentPath.match(/[a-zA-Z]*\/demo/)[0].replace('/demo', '')
      const chunksName = componentsName + 'Demo'

      if (result.entry[chunksName]) return

      result.entry[chunksName] = [path.resolve(__dirname, './dev-client.js')].concat(currentPath)

      result.plugins.push(new HtmlWebpackPlugin({
        filename: componentsName + '.html',
        template: basePath + '/index.html',
        hash: true,
        inject: true,
        chunks: [chunksName]
      }))
    } else if (stat.isDirectory()) {
      readDemo(currentPath, fileOrDir === 'demo', result)
    }
  })

  return result
}

const config = readDemo(basePath)
module.exports = config