const path = require('path')
const webpack = require('webpack')
// vue编译
const { VueLoaderPlugin } = require('vue-loader')
// 生产html
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 文本分离插件，分离js和css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 每次运行打包时清理过期文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 设置环境变量
const isDev = process.env.NODE_ENV === 'development'
// 导入webpack-merge
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.base')

let config

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'index.html')
  })
]

const devServer = {
  port: 8000,
  host: 'localhost',
  overlay: {
    errors: true
  },
  open: true,
  hot: true,
  /*
  使用了router的history路径映射后，由于webpack默认没有映射会导致404。
  设置下面属性将其默认设置到index.html
   */
  historyApiFallback: {
    index: '/index.html'
  }
}
// 开发模式
if (isDev) {
  config = merge(webpackBaseConfig, {
    devServer: devServer,
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['style-loader',
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE.ENV': isDev ? '"development"' : '"production"'
        }
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html')
      }),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(), // 热加载模块
      new webpack.NoEmitOnErrorsPlugin() // 减少我们不需要的信息的展示
    ],
    resolve: {
      // 寻找文件后缀
      extensions: ['.js', '.css', '.vue', '.scss']
    }
  })
} else {
  config = merge(webpackBaseConfig, {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
            },
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        // 为抽取出的独立的CSS文件设置配置参数
        filename: 'css/[name].css'
      })
    ]),
    output: {
      filename: 'js/[name].js'
    },
    resolve: {
      // 寻找文件后缀
      extensions: ['.js', '.css', '.vue', '.scss']
    }
  })
}

module.exports = config
