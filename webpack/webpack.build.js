const baseConf = require('./webpack.base')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

const styleBaseLoader = [
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

const cssLoader = ExtractTextPlugin.extract({
  publicPath: '../',
  fallback: 'style-loader',
  use: styleBaseLoader
})

const sassLoader = ExtractTextPlugin.extract({
  publicPath: '../',
  fallback: 'style-loader',
  use: styleBaseLoader.concat('sass-loader')
})

const buildConf = merge(baseConf, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.css$/,
      use: cssLoader
    }, {
      test: /\.scss$/,
      use: sassLoader
    }]
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(process.cwd(), 'dist')], {
      root: path.resolve(process.cwd())
    }),
    new ExtractTextPlugin({
      filename: 'assets/index.[hash:8].css'
    }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: { warnings: false },
    //     mangle: { safari10: true }
    //   },
    //   parallel: true
    // })
  ]
})

module.exports = buildConf
