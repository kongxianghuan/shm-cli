const baseConf = require('./webpack.base')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

const buildConf = merge(baseConf, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin([path.resolve(process.cwd(), 'dist')], {
      root: path.resolve(process.cwd())
    }),
    new ExtractTextPlugin({
      filename: 'assets/index.[chunkHash:8].css'
    })
  ]
})

module.exports = buildConf
