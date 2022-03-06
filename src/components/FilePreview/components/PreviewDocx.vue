<template>
  <div>
    <h1>PreviewDocx</h1>
    <div v-html="content"></div>
  </div>
</template>

<script>
import mammoth from 'mammoth';
import axios from 'axios';

export default {
  name: 'PreviewDocx',
  props: {
    file: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      content: '',
    };
  },
  computed: {
    url() {
      return (this.file && this.file.url) || '';
    },
  },
  watch: {
    url: {
      immediate: true,
      handler(value) {
        if (!value) return;
        this.renderItem(value);
      },
    },
  },
  methods: {
    async renderItem(url) {
      url = location.origin + url;
      const { data } = await axios.get(url, { responseType: 'arraybuffer' });
      mammoth
        .convertToHtml({ arrayBuffer: data })
        .then(result => {
          this.content = result.value;
        })
        .done();
    },
  },
};
</script>

<style lang="scss" scoped></style>
