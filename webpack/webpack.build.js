const baseConf = require('./webpack.base')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

const buildConf = merge(baseConf, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin([path.resolve(process.cwd(), 'dist')], {
      root: path.resolve(process.cwd())
    })
  ],
  optimization: {
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
