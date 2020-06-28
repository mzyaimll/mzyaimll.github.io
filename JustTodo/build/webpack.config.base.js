const path = require('path')
// 设置环境变量
const isDev = process.env.NODE_ENV === 'development'

const createVueLoaderOptions = require('./vue-loader.config')

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.(jpg|png|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // 如果文件大小小于10000字节，就会转义成base64,否则仍然是图片
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      }
    ]
  }
}

module.exports = config
