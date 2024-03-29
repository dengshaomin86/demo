module.exports = {
  // 将ESLint限制为特定项目，ESLint将停止在父文件夹中查找
  root: true,
  // 指定环境
  env: {
    node: true,
    browser: true,
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  // 配置插件
  plugins: ['vue'],
  /**
   * 配置规则：
   * "off"或者0 - 关闭规则
   * "warn"或者1 - 将规则打开为警告（不影响退出代码）
   * "error"或者2 - 将规则打开为错误（触发时退出代码为1）
   */
  rules: {
    // 支持在模版中使用 eslint-disable-next-line 等注释
    'vue/comment-directive': 'error',
    // 定义了的 jsx element 必须使用
    'vue/jsx-uses-vars': 'error',
    // 组件名称必须和文件名一致
    'vue/match-component-file-name': [
      'error',
      {
        extensions: ['jsx', 'vue'],
        shouldMatchCase: true,
      },
    ],
    // 禁止重复的二级键名
    'vue/no-dupe-keys': 'error',
    // 禁止出现重复的属性
    'vue/no-duplicate-attributes': 'error',
    // 禁止覆盖保留字
    'vue/no-reserved-keys': 'error',
    // 组件/实例的选项的顺序
    'vue/order-in-components': [
      'warn',
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: [1, 'single'],
    semi: [2, 'always'],
    'space-before-function-paren': 0,
    'spaced-comment': [0, 'never'],
    'no-unreachable': [0, 'never'],
    indent: 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'ignore',
        imports: 'never',
        exports: 'never',
        functions: 'ignore',
      },
    ],
    'object-curly-spacing': ['error', 'always'], // 解构赋值和导入/导出说明符
  },
  // 指定全局变量：true允许覆盖变量、false禁止覆盖
  globals: {
    axios: true,
  },
};
