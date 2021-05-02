const path = require('path');

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: '/',
  lintOnSave: false,
  chainWebpack: config => {
    // 设置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'));
  },
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    // proxy: 'http://test.com/'
  }
};
