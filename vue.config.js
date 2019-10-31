process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  css: {
    extract: false
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  }
};
