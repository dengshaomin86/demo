const directive = {
  install(Vue) {
    Vue.directive('limit', {
      inserted(el, binding) {
        const modifier = Object.keys(binding.modifiers)[0] || 'r';
        const reg = {
          match: {
            r: /[0-9.-]/,
            '+': /[0-9.]/,
            'n+': /[0-9]/
          },
          replace: {
            r: /[^0-9.-]/g,
            '+': /[^0-9.]/g,
            'n+': /[^0-9]/g
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

        el.addEventListener('textInput', (e) => {
          e.target.value = e.target.value.replace(reg.replace[modifier], '');
        });

        el.onkeyup = (e) => {
          e.target.value = e.target.value.replace(reg.replace[modifier], '');
        };
      }
    });
    // 修正 ie 浏览器粘贴时换行符后面的内容丢失
    Vue.directive('iePaste', {
      bind(el) {
        el.addEventListener('paste', (ev) => {
          if (!window.clipboardData) return;
          const text = window.clipboardData.getData('text') || '';
          if (!text) return;
          const val = text.replace(/[\n\r]/g, ' ');
          if (!val) return;
          window.clipboardData.setData('text', val);
        });
      }
    });
    // 自由拖拽
    Vue.directive('drag', {
      bind(el) {
        const dom = el;
        dom.style.cursor = 'move';
        dom.style.position = 'absolute';
        dom.addEventListener('mousedown', (e) => {
          const disX = e.clientX - dom.offsetLeft;
          const disY = e.clientY - dom.offsetTop;
          document.onmousemove = function (ev) {
            dom.style.left = ev.clientX - disX + 'px';
            dom.style.top = ev.clientY - disY + 'px';
          };
          document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
          };
          e.preventDefault(); // 阻止冒泡事件，禁止选择文字，禁止网页原生图片拖动效果
        });
      }
    });
    // 自动隐藏鼠标
    Vue.directive('autoHideCursor', {
      bind(el, binding) {
        const dom = el;
        const { cursor } = dom.style;
        let timeOut = null;
        const time = binding.arg && !isNaN(binding.arg) && binding.arg;
        dom.addEventListener('mousemove', (e) => {
          dom.style.cursor = cursor;
          clearTimeout(timeOut);
          timeOut = null;
          timeOut = setTimeout(() => {
            dom.style.cursor = 'none';
          }, time || 2000);
        });
      }
    });
    // 鼠标滚动放大缩小
    Vue.directive('wheel', {
      bind(el, binding) {
        const dom = el;
        const step = 300;
        if (dom.nodeName !== 'IMG') return;
        dom.addEventListener('mousewheel', (e) => {
          // 鼠标向上滚动
          if (e.wheelDelta > 0) {
            dom.width += step;
          } else {
            if (dom.width > step) dom.width -= step;
            if (dom.width < 60) dom.width = 60;
          }
        });
      }
    });
  }
};

export default directive;
