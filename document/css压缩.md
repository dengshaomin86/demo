# 压缩打包后的 css 文件

## 1. 安装模块

```
npm install optimize-css-assets-webpack-plugin -D
```

## 2. 在 `vue.config.js` 文件内配置插件

```
config.plugins.push(new OptimizeCss());
```

## 3. 相关

- 使用 cssnano 配置规则，实现深度配置压缩
