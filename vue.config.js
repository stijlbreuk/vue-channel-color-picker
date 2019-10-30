process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  css: {},
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  }
};
