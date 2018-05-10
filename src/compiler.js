const webpack = require('webpack')

function Compiler(opts) {
  let compiler = webpack(opts.config, opts.done)
  compiler.hooks.done.tap('done', stats => {
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
    }) + '\n')
  })

  return compiler
}

module.exports = Compiler