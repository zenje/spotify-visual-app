const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    path.join(__dirname, '../client/index'),
  ],
  output: {
    path: path.join(__dirname, '../public/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.svg$/, loaders: ['raw-loader'] },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    // map .env variables to process.env
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'CLIENT_ID',
      'CLIENT_SECRET',
      'REDIRECT_URI',
    ]),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
