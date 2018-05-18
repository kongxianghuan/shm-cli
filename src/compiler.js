const webpack = require('webpack')

function Compiler({ config, done = null }) {
  let compiler = webpack(config, done)
  compiler.hooks.done.tap('done', stats => {
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      entrypoints: false,
    }) + '\n')
  })

  return compiler
}

module.exports = Compiler