const path = require('path')
module.exports = {
  entry: {
    app: [
      "@babel/polyfill",
      "./src/app/index.js"
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.buils.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },
  devServer: {
    port: 4000
  }

}