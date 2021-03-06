process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const chalk = require('chalk')
const path = require('path')
const Compiler = require('./compiler')
const webpackConfig = require('../webpack/webpack.build')
const mergeCustomConfig = require('./utils').mergeCustomConfig

const customCommonConfigPath = path.resolve(process.cwd(), 'shm_config/commonConfig.js')
const customProdConfigPath = path.resolve(process.cwd(), 'shm_config/prodConfig.js')
mergeCustomConfig([customCommonConfigPath, customProdConfigPath], webpackConfig).then(config => {
  const compiler = new Compiler({
    config: config,
    done: () => {
      console.log(chalk.green.bold('\n[Build finished!]'))
    }
  })
})
