module.exports = {
    lintOnSave: false,

    // baseUrl: "./",//配置打包时的相对路径
    devServer: {
        //host:'127.0.0.1',
        //port: "8080",//代理端口
        //open: true,//项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
        //proxy:'http://192.168.175.1:8080/'
        // proxy: {
        //     '/getToken': {//代理api
        //         //target: "http://192.168.111.62/vapp/",//服务器api地址
        //         //target: "http://tapi.hszb.harsons.cn/",//服务器api地址
        //         target: "http://tapi.hszb.harsons.cn/service/login",//服务器api地址
        //         changeOrigin: true,//是否跨域
        //         ws: true, // proxy websockets
        //         pathRewrite: {//重写路径
        //             "^/getToken": ''
        //         }
        //     }
        // }
    }
}

let path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  }
}