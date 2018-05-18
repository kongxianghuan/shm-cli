const merge = require('./src/mergeConfig')
const path = require('path')

const p = path.resolve(process.cwd(), 'src/dev.js')

merge(p, {}, () => {
  console.log('ok')
})