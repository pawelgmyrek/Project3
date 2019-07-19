const webpack = require('webpack');
const path = require('path');

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
    new webpack.EnvironmentPlugin({
      REACT_APP_CLOUDINARY_NAME: JSON.stringify(process.env.REACT_APP_CLOUDINARY_NAME),
      REACT_APP_CLOUDINARY_API_KEY: JSON.stringify(process.env.REACT_APP_CLOUDINARY_API_KEY),
      REACT_APP_CLOUDINARY_API_SECRET: JSON.stringify(process.env.REACT_APP_CLOUDINARY_API_SECRET),
      REACT_APP_UPLOAD_PRESET: JSON.stringify(process.env.REACT_APP_UPLOAD_PRESET),
      REACT_APP_UPLOAD_CLOUDNAME: JSON.stringify(process.env.REACT_APP_UPLOAD_CLOUDNAME),
    }),
  ],
};
