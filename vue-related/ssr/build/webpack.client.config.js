const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
  entry: './src/entry-client.js',
  output: {
    path: path.resolve(__dirname, '../dist/client'),
  },
  plugins: [
    /**
     * 重要信息: 这将webpack运行时分离到一个引导chunk中,
     * 以便可以在之后正确注入异步chunk
     * 这也为你的 应用程序/vendor代码听过了更好的缓存
     */
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity
    // }),
    // 此插件在输出目录中
    // 生成`vue-ssr-client-mainifest.json`
    new VueSSRClientPlugin()
  ],
  optimization: {
    splitChunks: {
      name: 'manifest',
    }
  }
})