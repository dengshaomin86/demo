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
  }
};

export default directive;
