//  优先设置环境
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// 遇到错误,直接退出
process.on('unhandledRejection', (err) => {
    throw err;
  });

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const configFactory = require('../config/webpack.config');
const createDevServerConfig = require('../config/webpackDevServer.config');
