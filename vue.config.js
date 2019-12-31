module.exports = {
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
                secure: false, // https 需要非安全模式
                ws: true,
                pathRewrite: {
                    "^/api": "/api"
                }
            }
        }
    },
}