const path = require('path')
const baseConf = require('./webpack.base')
const merge = require('webpack-merge')
const webpack = require('webpack')

const cssLoader = [
  'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      config: {
        path: path.resolve(__dirname, '../config')
      }
    }
  }
]
const sassLoader = cssLoader.concat('sass-loader')

const devConf = merge(baseConf, {
  mode: 'development',
  devtool: '#cheap-module-source-map',
  module: {
    rules: [{
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash:8].[ext]'
        }
      },
    }, {
      test: /\.css$/,
      use: cssLoader
    }, {
      test: /\.scss$/,
      use: sassLoader
    }]
  },
  devServer: {
    host: '0.0.0.0',
    port: 8008,
    hot: true,
    inline: true,
    stats: 'none',
    contentBase: [ path.resolve(process.cwd(), 'src') ],
    watchContentBase: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = devConf