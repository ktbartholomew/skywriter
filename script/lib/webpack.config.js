var path = require('path');
var rootDir = require('./root-dir');
var webpack = require('webpack');

module.exports = {
  entry: path.resolve(rootDir, 'src/js/app.js'),
  output: {
    path: path.resolve(rootDir, 'dist/js'),
    publicPath: '/dist/js',
    filename: 'app.js'
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: /linebreak/,
        loader: 'transform?brfs'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
    postLoaders: [
      {
        loader: 'transform?brfs'
      }
    ],
    plugins: [
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: false
      //   }
      // })
    ]
  }
};
