const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve, join } = require('path');
const fs = require('fs');
const glob = require('glob');

//读取文件的html

function mpa() {
  let entry = {};
  let htmlplugins = [];
  const entryPath = glob.sync(join(__dirname, '/public/*.html'));
  // 读取了两个html
  entryPath.forEach((item) => {
    const entryName = item.match(/public\/(.*)\.html$/)[1];
    entry[entryName] = join(__dirname, `./src/${entryName}/index.tsx`);
    htmlplugins.push(
      new HtmlWebpackPlugin({
        template: item,
        filename: `${entryName}.html`,
        chunks: [entryName],
      })
    );
  });

  return {
    entry,
    htmlplugins,
  };
}

const { entry, htmlplugins } = mpa();

module.exports = {
  mode: 'development',
  entry,
  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), ...htmlplugins],
};
