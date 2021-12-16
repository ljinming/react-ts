const ignoredFiles = require('react-dev-utils/ignoredFiles');
const paths = require('./paths');
const path = require('path');

const host = process.env.HOST || '0.0.0.0';

/*
** disableHostCheck
新版的webpack-dev-server出于安全考虑，默认检查hostname，如果hostname不是配置内的，将中断访问。
解决方法：disableHostCheck: true

** devServer.contentBase
告诉本地服务从哪里提供内容且只有在您想要提供静态文件时才需要这样做,静态文件入库，如html 文件存放的位置
** devServer.publicPath
当启动devServer的时候，文件也会被编译，上面说到它只存在于内存中。publicPath其实就是指定外部访问编译文件的路径
*/


module.exports = function (allowHost) {
    return {
        disableHostCheck:false,
        compress:true, // 开启gzip
        clientLogLevel:"none",     // 关闭WDS的日志。但是warning和error还在     
        contentBase: path.resolve(__dirname, './public'),
        contentBasePublicPath: '/',
        watchContentBase: true,// 模板文件变动，也reload
        hot: true,
        transportMode: 'ws',
        injectClient: false,
        host,
        overlay: false,
        historyApiFallback: {
          // Paths with dots should still use the history fallback.
          // See https://github.com/facebook/create-react-app/issues/387.
          disableDotRule: true,
          index: paths.publicUrlOrPath,
        },
        public: allowHost,
        proxy: {
          '/api': 'http://localhost:3000',
        },
    }
}