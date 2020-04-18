module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/standard"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: [1, "double"],
    semi: [2, "always"],
    "space-before-function-paren": 0,
    "spaced-comment": [0, "never"]
  },
  globals: {
    axios: true
  }
};
