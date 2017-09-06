/**
 * Created by yqdong on 2017/9/6.
 * qq: 1013501639
 * @author yqdong
 *
 */
const path = require('path')

const config = {
  entry: {
    demo: path.resolve(__dirname, '../src/components/demo/demo.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: "umd"
  },
  plugins: [

  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [
          path.join(__dirname, '../src')
        ],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
          },
          {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: "sass-loader" // 将 Sass 编译成 CSS
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: false,
              minifyCSS: false,
              minifyJS: true
            }
          },
          {
            loader: 'markup-inline-loader',
            options: {
              svgo: {
                plugins: [
                  {
                    removeTitle: true,
                  },
                  {
                    removeUselessStrokeAndFill: true,
                  },
                  {
                    removeUnknownsAndDefaults: false,
                  },
                ],
              },
            }
          }]
      }]
  }
}

module.exports = config