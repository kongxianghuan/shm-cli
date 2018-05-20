const fs = require('fs')
const path = require('path')
const merge = require('webpack-merge')
const net = require('net')

// 合并自定义webpack配置
exports.mergeCustomConfig = (customPath, config) => {
  return new Promise((resolve, reject) => {
    fs.access(customPath, err => {
      if (!err) {
        const customConfig = require(customPath)
        resolve(merge(config, customConfig))
      } else {
        resolve(config)
      }
    })
  })
}

// 检查端口占用
exports.getPort = opts => {
  return new Promise((resolve, reject) => {
    const checkPort = opts => {
      let server = net.createServer() 
      server.unref()
      server.on('error', () => {
        opts.port++
        checkPort(opts)
      })
      server.listen(opts.port, opts.host, () => {
        let validPort = server.address().port
        server.close(() => resolve(validPort))
      })
    } 
    checkPort(opts)
  })
}
