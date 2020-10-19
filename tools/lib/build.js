const { runWebpack } = require('./build-bundle');
const { runES } = require('./build-es5');

(async() => {
  //await runWebpack();
  await runES();
})();
