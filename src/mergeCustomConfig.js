const fs = require('fs')
const path = require('path')
const merge = require('webpack-merge')

function mergeCustomConfig(customPath, config) {
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

module.exports = mergeCustomConfig
