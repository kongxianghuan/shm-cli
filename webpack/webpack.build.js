const baseConf = require('./webpack.base')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

const buildConf = merge(baseConf, {
  output: {
    chunkFilename: 'assets/[name].[chunkhash:8].chunk.js'
  },
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin([path.resolve(process.cwd(), 'dist')], {
      root: path.resolve(process.cwd())
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    // runtimeChunk: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 8,
          mangle: {
            safari10: true
          }
        }
      })
    ]
  }
})

module.exports = buildConf
