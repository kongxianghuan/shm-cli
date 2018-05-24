const fs = require('fs')
const path = require('path')
const merge = require('webpack-merge')
const net = require('net')

// 合并自定义webpack配置
const getCustomConfig = customPath => {
  let getConfig = path => {
    return new Promise((resolve, reject) => {
      fs.access(path, err => {
        let config = !err ? require(path) : {}
        resolve(config)
      })
    })
  }

  if (typeof customPath === 'string') {
    return getConfig(customPath)
  }

  if (Array.isArray(customPath)) {
    let taskList = customPath.map(path => getConfig(path))
    return Promise.all(taskList).then(configList => {
      let config = configList.reduce((cur, prev) => merge(prev, cur), {})
      return config
    })
  }
}
exports.mergeCustomConfig = (customPath, config) => {
  return getCustomConfig(customPath).then(customConfig => merge(config, customConfig))
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
