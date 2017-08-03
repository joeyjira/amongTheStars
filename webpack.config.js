const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/clusterfox.js",
  output: {
    path: path.join(__dirname, 'lib'),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  devtool: 'source-maps',
  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /\.node$/,
      loader: "node-loader"
    }
    ]
  }
};