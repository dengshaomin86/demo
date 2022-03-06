<template>
  <div>
    <h1>PreviewXlsx</h1>

    <div v-html="content"></div>
  </div>
</template>

<script>
import xlsx from 'xlsx';

export default {
  name: 'PreviewXlsx',
  props: {
    file: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      content: '',
      workbook: {},
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
      this.workbook = xlsx.read(data, { type: 'array' });
      this.getTable();
    },
    getTable() {
      const { SheetNames } = this.workbook;
      const worksheet = this.workbook.Sheets[SheetNames[0]];
      this.content = xlsx.utils.sheet_to_html(worksheet);
      // this.tableData = xlsx.utils.sheet_to_json(worksheet, {
      //   header: ['A', 'B', 'C', 'D'],
      // });
    },
  },
};
</script>

<style lang="scss" scoped></style>
