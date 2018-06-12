const path = require('path')
const babelConf = require('../config/babel.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const shmNodeModulesPath = path.resolve(__dirname, '../node_modules')
const appNodeModulesPath = path.resolve(process.cwd(), 'node_modules')
const resolveModules = [ shmNodeModulesPath, appNodeModulesPath ]
const prodMode = process.env.NODE_ENV === 'production'

const jsRule = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  type: 'javascript/auto',
  use: {
    loader: 'babel-loader',
    options: babelConf
  }
}

const mediaRule = {
  test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  use: {
    loader: 'url-loader',
    options: {
      name: 'assets/[name].[hash:8].[ext]',
      limit: 1000
    }
  }
}

const htmlRule = {
  test: /\.html$/,
  use: {
    loader: 'html-loader',
    options: {
      attrs: [':data-src', ':src'],
      interpolate: true
    }
  }
}

const imageRule = (() => {
  let rule = {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash:8].[ext]'
        },
      }
    ]
  }
  if (prodMode) {
    rule.use.push({
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
      },
    })
  }
  return rule
})()

const styleRule = {
  test: /\.s?[ac]ss$/,
  use: [
    prodMode ? {
      loader: MiniCssExtractPlugin.loader,
      options: {
           publicPath: '../'
      }
    } : 'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: path.resolve(__dirname, '../config')
        }
      }
    },
    'sass-loader',
  ]
}

const baseConf = {
  entry: {
    index: ['babel-polyfill', path.resolve(process.cwd(), 'src/js/index.js')]
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
    rules: [ jsRule, mediaRule, htmlRule, imageRule, styleRule ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(process.cwd(), 'src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash:8].css',
      chunkFilename: 'assets/[id].[contenthash:8].css'
    })
  ]
}

module.exports = baseConf