<template>
  <el-dialog title="预览" :visible="visible" width="800px" :before-close="close">
    <div>
      <component :is="component" :file="file" />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="close">取消</el-button>
      <el-button size="small" type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import path from 'path';
import PreviewPdf from './PreviewPdf';
import PreviewDocx from './PreviewDocx';
import PreviewXlsx from './PreviewXlsx';

export default {
  name: 'FilePreview',
  components: { PreviewPdf, PreviewDocx, PreviewXlsx },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    file: {
      type: Object,
      default: null,
    },
  },
  computed: {
    component() {
      if (!this.file) return false;
      const { url } = this.file;
      const extname = path.extname(url);
      return `preview-${extname.replace(/^./, '')}`;
    },
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    },
    confirm() {
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped></style>
