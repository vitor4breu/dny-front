const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@redux': path.resolve(__dirname, 'src/redux'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@utils': path.resolve(__dirname, 'src/utils')
  })
);