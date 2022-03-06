<template>
  <div>
    <pdf v-for="page in numPages" :key="page" :page="page" :src="url" @error="error" />
  </div>
</template>

<script>
import pdf from 'vue-pdf';

export default {
  name: 'PreviewPdf',
  components: { pdf },
  props: {
    file: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      numPages: 0,
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
        this.getPages(value);
      },
    },
  },
  methods: {
    async getPages(url) {
      const result = await pdf.createLoadingTask(url).promise;
      if (!result) return false;
      this.numPages = result.numPages;
    },
    error(e) {
      alert('error', e);
    },
  },
};
</script>

<style lang="scss" scoped></style>
