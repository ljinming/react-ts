//  优先设置环境
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// 遇到错误,直接退出
process.on('unhandledRejection', (err) => {
    throw err;
  });

const paths = require("../config/paths")
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const configFactory = require('../config/webpack.config');
const createDevServerConfig = require('../config/webpackDevSever.config');
const openBrowser = require('react-dev-utils/openBrowser');
const {
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

const HOST = process.env.HOST || '0.0.0.0';
const port = 3000;

const config = configFactory('development');
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const appName = require(paths.appPackageJson).name;

const urls = prepareUrls(
  protocol,
  HOST,
  port,
  paths.publicUrlOrPath.slice(0, -1)
);

const devSocket = {
  warnings: (warnings) => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
  errors: (errors) => devServer.sockWrite(devServer.sockets, 'errors', errors),
};

const compiler = createCompiler({
  appName,
  config,
  devSocket,
  urls,
  useYarn: false,
  useTypeScript: true,
  tscCompileOnError: false,
  webpack,
});

const serverConfig = createDevServerConfig(urls.lanUrlForConfig);
const devServer = new WebpackDevServer(compiler, serverConfig);

devServer.listen(port, HOST, (err) => {

  if (err) {
    return console.log(err);
  }
  openBrowser(urls.localUrlForBrowser);
});

['SIGINT', 'SIGTERM'].forEach(function (signal) {
  process.on(signal, function () {
    devServer.close();
    process.exit();
  });
});

if (process.env.CI !== 'true') {
  // Gracefully exit when stdin ends
  process.stdin.on('end', function () {
    devServer.close();
    process.exit();
  });
}