// module.exports={
//      devServer: {
//        open: true,
//        proxy: {
//          '/api': {
//            //设置你调用的接口域名和端口号 别忘了加http
//            target: 'http://127.0.0.1:8888',
//            changeOrigin: true, //允许跨域
//            pathRewrite: {
//              '^/api': ''
//            }
//          }
//        }
//      }
// }
module.exports = {
  chainWebpack: config => {
    // 生产模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      config.set('externals', { // 不会被打包到chunk-ventor中
        vue: 'Vue',
        axios: 'axios',
        echarts: 'echarts',
        lodash: '_',
        'vue-router': 'VueRouter'
      })
    })
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
