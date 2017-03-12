const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: { app: './server.js' },
  output: {
    path: path.join(__dirname, '/src/js'),
    filename: 'app.bundle.js'
  },
  devtool: 'eval-soure-map',
  target: "node",
  module: {
    loaders: [{ test: /\.json$/, loader: "json-loader" }]
  },
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