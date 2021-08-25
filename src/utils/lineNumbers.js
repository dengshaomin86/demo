import Vue from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // 样式文件

Vue.directive('highlight', function(el) {
  console.log('自定义指令', el);

  const blocks = el.querySelectorAll('pre code');
  blocks.forEach(block => {
    console.log(block.innerHTML, 'block是', block);
    try {
      const str = block.innerHTML;
      const lang = 'js';

      // 得到经过highlight.js之后的html代码
      const preCode = hljs.highlight(lang, str, true).value;

      // 以换行进行分割
      // const lines = preCode.split(/\n/).slice(0, -1);
      const linesLength = preCode.split('<br></br>').length;

      // 生成行号 aria-hidden 对浏览器语义化隐藏
      let linesNum = '<span aria-hidden="true" class="line-numbers-rows">';
      for (let index = 0; index < linesLength + 1; index++) {
        linesNum = linesNum + '<span></span>';
      }
      linesNum += '</span>';

      let html = preCode;

      // 右上角语言说明
      // if (linesLength) {
      //     html += '<b class="name">' + lang + "</b>";
      // }

      html = '<pre class="hljs"><code>' + html + '</code>' + linesNum + '</pre>';

      block.parentNode.parentNode.innerHTML = html;
    } catch (__) {
      console.log('执行错误', __);
    }

    // 方法一
    // hljs.highlightBlock(block);

    // const linesLength = block.innerHTML.split("<br></br>").length;

    // // 生成行号 aria-hidden 对浏览器语义化隐藏
    // let linesNum = '<span aria-hidden="true" class="line-numbers-rows">';
    // for (let index = 0; index < linesLength + 1; index++) {
    //   linesNum = linesNum + "<span></span>";
    // }
    // linesNum += "</span>";

    // block.parentNode.innerHTML = block.parentNode.innerHTML + linesNum;
  });
});
