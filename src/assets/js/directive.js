const directive = {
  install(Vue) {
    Vue.directive("limit", {
      inserted(el, binding) {
        const modifier = Object.keys(binding.modifiers)[0] || "r";
        const reg = {
          match: {
            r: /[0-9.-]/,
            "+": /[0-9.]/,
            "n+": /[0-9]/
          },
          replace: {
            r: /[^0-9.-]/g,
            "+": /[^0-9.]/g,
            "n+": /[^0-9]/g
          }
        };

        el.onkeypress = (e) => {
          const code = e.charCode;
          if (code !== 0) {
            if (!String.fromCharCode(code).match(reg.match[modifier])) {
              return false;
            }
          }
        };

        el.addEventListener("textInput", (e) => {
          e.target.value = e.target.value.replace(reg.replace[modifier], "");
        });

        el.onkeyup = (e) => {
          e.target.value = e.target.value.replace(reg.replace[modifier], "");
        };
      }
    });
    // 修正 ie 浏览器粘贴时换行符后面的内容丢失
    Vue.directive("iePaste", {
      bind(el) {
        el.addEventListener("paste", function(ev) {
          if (!window.clipboardData) return;
          const text = window.clipboardData.getData("text") || "";
          if (!text) return;
          const val = text.replace(/[\n\r]/g, " ");
          if (!val) return;
          window.clipboardData.setData("text", val);
        });
      }
    });
  }
};

export default directive;
