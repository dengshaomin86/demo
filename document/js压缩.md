# 压缩 js 文件，删除 console.log、debugger

## 1. 安装模块

```
npm install uglifyjs-webpack-plugin -D
```

## 2. 配置

```
new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true // 生产环境自动删除console
          },
          warnings: false
        },
        sourceMap: false,
        parallel: true // 使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
      })
```

## 相关

- terser-webpack-plugin 也可以实现
