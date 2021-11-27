<template>
  <div class="home">
    <ul>
      <li v-for="(item, idx) in list" :key="idx">
        <router-link :to="item">{{ item }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getList();
    },
    getList() {
      this.list = this.$router.options.routes.map(item => item.path);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  @include clear-overflow;
  background: $bg-color;
  a {
    color: $font-color;
  }
  ul {
    li {
      margin: 10px;
    }
  }
}
</style>
