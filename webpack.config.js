const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.m?hbs$/,
      exclude: /(node_modules|bower_components)/,
      use: 'handlebars-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Matroska world builder',
      inject: 'head'
    })
  ]
}
