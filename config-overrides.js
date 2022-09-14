const { override, fixBabelImports, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra')
const { resolve } = require("path");//改别名
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addWebpackAlias({//改别名
    "@": resolve("src")
  }),
  addDecoratorsLegacy()
);