const svgsFont = require("@liepin/nodejs-svgs2font");
const path = require("path");

// 字体图标默认属性
svgsFont({
  fontName: "iconfont", // 字体名称
  baseClass: "text-icon", // 基础css类
  classPrefix: "icon-", // 图标css前缀
  files: path.resolve(process.cwd(), "icons"), // svg path
  output: path.resolve(process.cwd(), "fonts"), // output path
  cssPath: path.resolve(process.cwd(), "/font.css"), // css文件
  publicPath: "../fonts", // 当使用less的@import时，出现找不到字体文件时，可以手动传入文件夹相对路径
  successLog: true // 是否展示成功日志
});
