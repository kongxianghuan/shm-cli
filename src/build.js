const webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.build')
const Compiler = require('./compiler')
const chalk = require('chalk')

const compiler = new Compiler({
  config: webpackConfig,
  done: () => {
    console.log(chalk.green.bold('Build finished!'))
  }
})