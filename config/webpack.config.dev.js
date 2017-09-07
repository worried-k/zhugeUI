/**
 * Created by yqdong on 2017/9/6.
 * qq: 1013501639
 * @author yqdong
 *
 */
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')
const demoConfig = require('./getDemoConfig')

module.exports = merge(baseConfig, {
  entry: merge({
    demoIndex: [path.resolve(__dirname, './dev-client.js')].concat(path.resolve(__dirname, '../src/main.js'))
  }, demoConfig.entry),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'development'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      hash: true,
      inject: true,
      chunks: ['demoIndex']
    }),
    new FriendlyErrorsPlugin()
  ].concat(demoConfig.plugins)
})