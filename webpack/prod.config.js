const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'bundle.js',
    //publicPath: '/',
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
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'entry',
                  debug: true,
                },
              ],
              '@babel/preset-react',
            ],
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
      'PUBLIC_URL',
    ]),
    new HtmlWebpackPlugin({
      base: '/spotify-visual-app/',
      template: './dist/template.html',
    }),
  ],
};
