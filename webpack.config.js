const minConfig = require('./webpack.config.min.js');
module.exports = {
  ...minConfig,
  output: {
    filename: 'lispress.js',
  },
  optimization: {
    minimize: false,
  },
};
