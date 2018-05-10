const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../webpack/webpack.dev')
const Compiler = require('./compiler')
const chalk = require('chalk')
const ip = require('ip')

WebpackDevServer.addDevServerEntrypoints(webpackConfig, webpackConfig.devServer)

const compiler = new Compiler({ config: webpackConfig })
const devServer = new WebpackDevServer(compiler, webpackConfig.devServer)
const tip = `Starting server on http://${ip.address()}:${webpackConfig.devServer.port}`
devServer.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, () => {
  console.log(chalk.green.bold(tip))
})