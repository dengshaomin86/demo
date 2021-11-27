const path = require('path');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const isProduction = process.env.NODE_ENV === 'production';
const openBundleAnalyzer = true;
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: './',
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/scss/variables.scss";
        @import "@/assets/scss/mixins.scss";
        `,
      },
    },
  },
  // 底层是 webpack-merge，合并配置参数
  configureWebpack: config => {
    // 生产环境配置
    if (!isProduction) return;
    // 可视化分析包大小
    if (openBundleAnalyzer) config.plugins.push(new BundleAnalyzerPlugin());
    // css 压缩
    config.plugins.push(new OptimizeCss());
    // js 压缩
    config.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true, // 生产环境自动删除console
          },
          warnings: false,
        },
        sourceMap: false,
        parallel: true, // 使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
      }),
    );
  },
  // 底层是 webpack-chain，修改配置参数
  chainWebpack: config => {
    // 设置别名
    config.resolve.alias.set('@', resolve('src')).set('_c', resolve('src/components'));

    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
      });

    // 生产环境配置
    if (!isProduction) return;
    // 拆包
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 1000,
      name: true,
      cacheGroups: {
        elementUI: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          name: 'elementUI',
          priority: 1,
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
      },
    });
  },
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 ''，即空字符串
  devServer: {
    // proxy: 'http://test.com/'
  },
};
