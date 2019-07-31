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
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss'],
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
