# 文件 gzip 压缩

## 1. 安装模块

```
npm install compression-webpack-plugin -D
```

## 2. 配置

```
const CompressionPlugin = require('compression-webpack-plugin');

new CompressionPlugin({
        algorithm: 'gzip', // 使用gzip压缩
        test: /\.js$|\.html$|\.css$/, // 匹配文件名
        filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
        minRatio: 1, // 压缩率小于1才会压缩
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
      })
```

## 注意事项

- 高版本可能会报错：Cannot read property 'tapPromise' of undefined，安装 v5.0.x 的就可以
- gzip 可以服务器配置就可以，本地配置可以减少服务器处理时间
