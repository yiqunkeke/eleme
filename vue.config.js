const path = require('path')
const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

function resolve(dir) {
  return path.join(__dirname, dir)
  // __dirname 表示当前的 项目目录
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    // devServer ---> 所有 webpack-dev-server 的选项都支持
    before(app, server) {
      app.get('/api/seller', function(req, res) {
        res.json({
          code: 0,
          data: seller
        })
      })
      app.get('/api/goods', function(req, res) {
        res.json({
          code: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function(req, res) {
        res.json({
          code: 0,
          data: ratings
        })
      })
    }
  },
  chainWebpack(config) {
    // chainWebpack ---> 允许对内部的 webpack 配置进行更细粒度的修改
    // 1. resolve：配置模块如何被解析。
    // 2. resolve.alias：创建别名可以更容易的找到某个固定模块。（来代替用相对路径引入模块）
    // ~：表示通过resolve.modules定义的文件夹（此处对应着src和node_modules）(重点！！！)
    config.resolve.alias
      .set('assets', resolve('src/assets')) // assets
      .set('components', resolve('src/components')) // components
  }

}
