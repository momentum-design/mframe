// More info on Webpack's Node API here: https://webpack.js.org/api/node/
// Allowing console calls below since this is a build file.

/* eslint-disable no-console */

const fse = require('fs-extra');
const {
  chalkSuccess,
  chalkProcessing
} = require('../../config/chalkConfig');
const { componentRoot, es5Root } = require('../../config/constants');
const buildBabel = require('./buildBabel');

/* eslint-disable */

// Remove ES Directory
const runES = async () => {
  console.log(chalkProcessing('Building: '), chalkSuccess('es module'));
  if (fse.existsSync(es5Root)) await fse.remove(es5Root);
  // Create ES Directory
  await fse.mkdirs(es5Root);
  // Build Babel Transformed Files
  console.log(componentRoot, es5Root);
  await buildBabel(componentRoot, es5Root, { modules: true });
  console.log(chalkProcessing('Built: '), chalkSuccess('es module'));
};


module.exports = {
  runES
};

/* eslint-enable no-console */
