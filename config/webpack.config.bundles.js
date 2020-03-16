const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {
  baseConfig
} = require('./base.config');
const {
  repoRoot,
  componentRoot
} = require('./constants');

baseConfig.devtool = 'source-map';

var _plusins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new BundleAnalyzerPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    noInfo: true // set to false to see a list of every file being bundled.
  })
];
for (let _i = 0, _l = _plusins.length; _i < _l; _i++) {
  baseConfig.plugins.push(_plusins[_i]);
}
exports.config = Object.assign({}, baseConfig, {
  entry: [
    path.resolve(componentRoot, 'index.js')
  ],
  output: {
    library: 'mframe',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(repoRoot, 'bundles/'),
    publicPath: '/',
    filename: 'mframe.js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        extractComments: false
      })
    ]
  },
  mode: 'production',
  externals: {}
});
