const path = require('path');

module.exports = ctx => {
  return {
    plugins: {
      'postcss-import': { path: [path.resolve(process.cwd(), 'src')] },
      'postcss-cssnext': {},
      'cssnano': { autoprefixer: false }
    }
  }
}