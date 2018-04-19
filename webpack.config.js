var path = require('path')
var SRC_DIR = path.resolve(__dirname, 'client')
var BUILD_DIR = path.resolve(SRC_DIR, 'build')

var config = {
  entry: ['babel-polyfill', SRC_DIR + '/components/App.js'],
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    contentBase: BUILD_DIR
  }
}
module.exports = config
