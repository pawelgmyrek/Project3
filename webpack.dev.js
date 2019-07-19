const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
  ],
  devServer: {
    contentBase: './dist',
    port: 3000,
    hot: true,
    proxy: { '/api/**': { target: 'http://localhost:3001', secure: false } },
  },
};
