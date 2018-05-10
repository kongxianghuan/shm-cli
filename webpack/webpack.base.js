const path = require('path')
const babelConf = require('../config/babel.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const shmNodeModulesPath = path.resolve(__dirname, '../node_modules')
const appNodeModulesPath = path.resolve(process.cwd(), 'node_modules')
const resolveModules = [ shmNodeModulesPath, appNodeModulesPath ]

const baseConf = {
  entry: {
    index: [path.resolve(process.cwd(), 'src/js/index.js')]
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'assets/[name].[hash:8].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.jsx'],
    modules: resolveModules
  },
  resolveLoader: {
    modules: resolveModules
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      type: 'javascript/auto',
      use: {
        loader: 'babel-loader',
        options: babelConf
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'assets/[name].[chunkhash:8].[ext]'
        }
      },
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'assets/[name].[chunkhash:8].[ext]'
        }
      }
    }, {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
        options: {
          attrs: [':data-src', ':src'],
          interpolate: true
        }
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(process.cwd(), 'src/index.html')
    })
  ]
}

module.exports = baseConf