<template>
  <div>
    <h1>FilePreviewView</h1>
    <ul>
      <li v-for="item in list" :key="item.url">
        <span @click="preview(item)">{{ item.label }}</span>
      </li>
    </ul>

    <FilePreview ref="preview" />
  </div>
</template>

<script>
import path from 'path';
import FilePreview from '@/components/FilePreview';

export default {
  name: 'FilePreviewView',
  components: { FilePreview },
  computed: {
    list() {
      const list = ['/files/example-docx.docx', '/files/example-pdf.pdf', '/files/example-xlsx.xlsx'];
      return list.map(v => ({ label: path.basename(v), url: v }));
    },
  },
  methods: {
    preview(item) {
      this.$refs.preview.init({ current: item, list: [item] });
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  li {
    span {
      &:hover {
        cursor: pointer;
        color: blueviolet;
      }
    }
  }
}
</style>
