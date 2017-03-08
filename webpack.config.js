const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {app: './app.js'},
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'app.bundle.js'
  },
  devtool: 'eval-soure-map',
  debug: true,
  verboase: true,
  module: {
    loaders: [{
      test: __dirname,
      loader: 'babel-loader',
      query: {
        cacheDirectory: 'babel_cache',
        presets: ['angular2', 'es2015']
      }
    }]
  },
  vendor: ['angular'],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourceMap: false,
      beautify: false,
      dead_code: true
    })
  ]
};