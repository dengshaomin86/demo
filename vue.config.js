const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const resolve = dir => {
  return path.join(__dirname, dir);
};

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: '/',
  lintOnSave: false,
  // 底层是 webpack-merge，合并配置参数
  configureWebpack: config => {
    // 生产环境配置
    if (!isProduction) return;
    // 可视化分析包大小
    config.plugins.push(new BundleAnalyzerPlugin());
  },
  // 底层是 webpack-chain，修改配置参数
  chainWebpack: config => {
    // 设置别名
    config.resolve.alias.set('@', resolve('src')).set('_c', resolve('src/components'));

    // 生产环境配置
    if (!isProduction) return;
    // 拆包
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 1000,
      name: true,
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          minSize: 0,
          priority: 1
        },
        elementUI: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          name: 'elementUI',
          priority: 2
        }
      }
    });
  },
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 ''，即空字符串
  devServer: {
    // proxy: 'http://test.com/'
  }
};
