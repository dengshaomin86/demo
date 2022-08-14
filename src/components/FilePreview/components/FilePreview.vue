<template>
  <el-dialog title="预览" :visible="visible" width="800px" :before-close="close">
    <div class="file-preview-main">
      <div class="file-preview-main-arrow file-preview-main-arrow-left">
        <i class="el-icon-left"></i>
      </div>
      <component :is="component" :file="current" />
      <div class="file-preview-main-arrow file-preview-main-arrow-right">
        <i class="el-icon-right"></i>
      </div>
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
import PreviewImage from './PreviewImage';

export default {
  name: 'FilePreview',
  components: { PreviewPdf, PreviewDocx, PreviewXlsx, PreviewImage },
  data() {
    return {
      visible: false,
      current: {},
      list: [],
    };
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
    init({ current, list }) {
      this.current = current;
      this.list = list;
      this.visible = true;
    },
    close() {
      this.$emit('update:visible', false);
    },
    confirm() {
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.file-preview-main {
  position: relative;
  &-arrow {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: calc(50% - 20px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #fff;
    &-left {
      left: 0;
    }
    &-right {
      right: 0;
    }
  }
}
</style>
