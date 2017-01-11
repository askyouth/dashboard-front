const webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/app.js'
  },
  output: {
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        exclude: /(node_modules|bower_components|server|public|www)/,
        loader: 'json'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|server|public|www)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'API_DOMAIN'])
  ]
};