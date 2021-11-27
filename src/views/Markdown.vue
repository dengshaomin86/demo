<template>
  <div>
    <h1>vue-markdown</h1>
    <div class="markdown-body">
      <VueMarkdown />
    </div>
  </div>
</template>

<script>
import VueMarkdown from '@/assets/code.md';
import 'highlight.js/styles/github.css';
import 'github-markdown-css';
// import hljs from 'highlight.js';

export default {
  name: 'vue-markdown',
  components: {
    VueMarkdown,
  },
  mounted() {
    // console.log(hljs);
    // hljs.initHighlightingOnLoad();
    // hljs.initLineNumbersOnLoad();
  },
};
</script>

<style scoped></style>
