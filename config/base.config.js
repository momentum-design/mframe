const WebpackMd5Hash = require('webpack-md5-hash');
const path = require('path');
const codePath = path.resolve(__dirname, '..');

const baseConfig = {
  entry: undefined,

  output: undefined,

  externals: undefined,

  devtool: 'eval-source-map', // more info:https://webpack.js.org/guides/production/#source-mapping and https://webpack.js.org/configuration/devtool/

  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      'mframe': path.resolve(codePath, 'src', 'lib')
    }
  },

  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash()
  ],

  module: {
    rules: []
  }
};

module.exports = {
  baseConfig
};
