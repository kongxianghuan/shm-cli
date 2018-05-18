const baseConf = require('./webpack.base')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

const imageLoaderConf = {
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[hash:8].[ext]'
      },
    },
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
      },
    },
  ],
}

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
    rules: [
      {
        test: /\.css$/,
        use: cssLoader
      }, {
        test: /\.scss$/,
        use: sassLoader
      }, 
      imageLoaderConf
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(process.cwd(), 'dist')], {
      root: path.resolve(process.cwd())
    }),
    new ExtractTextPlugin({
      filename: 'assets/index.[chunkHash:8].css'
    }),
  ]
})

module.exports = buildConf
