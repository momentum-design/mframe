// More info on Webpack's Node API here: https://webpack.js.org/api/node/
// Allowing console calls below since this is a build file.

/* eslint-disable no-console */

const webpack = require('webpack');
const fse = require('fs-extra');
const { chalkSuccess, chalkProcessing } = require('../../config/chalkConfig');
const { componentRoot, es5Root } = require('../../config/constants');
const buildBabel = require('./buildBabel');

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

// Remove Lib Directory
const runES = async() => {
  console.log(chalkProcessing('Building: '), chalkSuccess('npm module'));
  if (fse.existsSync(es5Root)) await fse.remove(es5Root);
  // Create Lib Directory
  await fse.mkdirs(es5Root);
  // Build Babel Transformed Files
  await buildBabel(componentRoot, es5Root);
  console.log(chalkProcessing('Built: '), chalkSuccess('npm module'));
};
module.exports = {
    runES
};

/* eslint-enable no-console */
