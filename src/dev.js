process.env.NODE_ENV = 'development'

const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../webpack/webpack.dev')
const Compiler = require('./compiler')
const chalk = require('chalk')
const ip = require('ip')
const opn = require('opn')

WebpackDevServer.addDevServerEntrypoints(webpackConfig, webpackConfig.devServer)

const compiler = new Compiler({ config: webpackConfig })
const devServer = new WebpackDevServer(compiler, webpackConfig.devServer)
const address = `http://${ip.address()}:${webpackConfig.devServer.port}`
const tip = `Starting server on ${address}`
devServer.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, () => {
  console.log(chalk.green.bold(tip))
  opn(address, { app: 'google chrome' })
})