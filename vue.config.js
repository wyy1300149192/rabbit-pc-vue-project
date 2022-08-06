const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 配置哪些文件需要自动导入
        path.join(__dirname, './src/styles/variables.less')
      ]
    }
  },
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all'
  },
  configureWebpack: {
    externals: {
      // 用来去除打包时候的常用不变模块
      qc: 'QC'
    }
  }
}
