import Vue from "vue";
import directive from "./directive.js";

Vue.use(directive);

// 首字母大写换小写
export function replaceFirst(str) {
  return str.replace(/( |^)[A-Z]/g, (L) => L.toLowerCase());
}
