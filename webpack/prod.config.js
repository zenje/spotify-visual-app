const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: path.join(__dirname, '../public/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.svg$/, loaders: ['raw-loader'] },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
      },
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
      'LAST_FM_API_KEY',
    ]),
  ],
};
