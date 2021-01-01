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
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8888",
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
