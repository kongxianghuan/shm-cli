process.env.NODE_ENV = 'development'

const mergeCustomConfig = require('./utils').mergeCustomConfig
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../webpack/webpack.dev')
const Compiler = require('./compiler')
const chalk = require('chalk')
const opn = require('opn')
const ip = require('ip')
const path = require('path')
const getPort = require('./utils').getPort

function initDevServer(config) {
  let address = `http://${ip.address()}:${config.devServer.port}`
  let tip = `Starting server on ${address}`

  WebpackDevServer.addDevServerEntrypoints(config, config.devServer)
  let compiler = new Compiler({ config: config })
  let devServer = new WebpackDevServer(compiler, config.devServer)
  devServer.listen(config.devServer.port, config.devServer.host, () => {
    console.log(chalk.green.bold(tip))
    // TODO: 复用已打开的标签
    opn(address, { app: 'google chrome' })
  })
}

const customDevConfigPath = path.resolve(process.cwd(), 'shm_config/devConfig.js')
mergeCustomConfig(customDevConfigPath, webpackConfig).then(config => {
  let { port, host } = config.devServer
  getPort({ port, host }).then(validPort => {
    config.devServer.port = validPort
    initDevServer(config)
  })
})
