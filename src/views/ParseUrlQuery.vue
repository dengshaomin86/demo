<template>
  <div class="wrapper">
    <h1>ParseUrlQuery</h1>
    <el-input v-model="url" type="textarea" :rows="6" placeholder="请输入" />
    <el-button size="small" type="primary" @click="parsing">解析</el-button>
    <el-input v-if="parseDataStr" :value="parseDataStr" type="textarea" :rows="6" autosize placeholder="请输入" />
  </div>
</template>

<script>
import qs from 'qs';

export default {
  name: 'ParseUrlQuery',
  data() {
    return {
      url: '',
      parseDataStr: '',
    };
  },
  methods: {
    parsing() {
      if (!this.url) {
        this.parseData = {};
        return;
      }
      const str = this.url.split('?')[1];
      this.parseDataStr = JSON.stringify(qs.parse(str), null, 2);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  .el-button {
    margin: 10px 0;
  }
}
</style>
