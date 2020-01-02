module.exports = {
    //  配置打包后静态资源的根目录
    publicPath: "/mobile/",
    devServer: {
        // open: true,
        // host: 'localhost',
        // port: '8081', 
        // https: false,
        // hotOnly: false,
        /**
         * hosts 配置文件  C:\Windows\System32\drivers\etc
         */
        proxy: {
            "/api": {
                target: "https://www.csdn.net", // 跨域的目标服务器地址
                changeOrigin: true, // 允许 开启跨域模式
                secure: false, // https 需要关闭安全模式
                ws: true, // 开启websocket传输协议
                pathRewrite: {
                    "^/api": "/api"
                }
            },
            "/face": {
                target: "http://facerke.epplink.net/",
                changeOrigin: true,
                secure: false,
                ws: true,
                pathRewrite: {
                    "^/face": ""
                }
            }
        }
    },
}