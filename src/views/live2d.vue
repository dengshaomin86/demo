<template>
  <div>
    <h1>live2d</h1>
    <el-form ref="form" label-width="60px">
      <el-form-item label="role">
        <el-button @click="change('rolePrev')">prev</el-button>
        <el-button @click="change('roleNext')">next</el-button>
      </el-form-item>
      <el-form-item label="dress">
        <el-button @click="change('dressPrev')">prev</el-button>
        <el-button @click="change('dressNext')">next</el-button>
      </el-form-item>
      <el-form-item label="select">
        <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange"></el-cascader>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/*global live2dFn*/
import { models } from '../../public/static/live2d';

export default {
  name: 'live2d',
  data() {
    return {
      value: [],
      options: []
    };
  },
  methods: {
    init() {
      console.log(models);
      this.value = [];
      this.options = [];
      for (const key in models) {
        const children = models[key].map(item => {
          return {
            value: item,
            label: item
          };
        });
        this.options.push({
          value: key,
          label: key,
          children
        });
      }
      // 获取本地存储
      const localObj = localStorage.getItem('live2d');
      if (localObj) {
        this.value = [JSON.parse(localObj).name, JSON.parse(localObj).dress];
      }
      live2dFn.load();
    },
    change(e) {
      const handler = {
        rolePrev: () => live2dFn.change.role('prev'),
        roleNext: () => live2dFn.change.role(),
        dressPrev: () => live2dFn.change.dress('prev'),
        dressNext: () => live2dFn.change.dress()
      };
      if (handler[e]) handler[e]();
    },
    handleChange(value) {
      console.log(value);
      live2dFn.load(value[0], value[1]);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="scss">
  .el-form {
    margin: 20px;
  }
</style>
