<template>
  <div class="home">
    <ul>
      <li v-for="(item, idx) in list" :key="idx">
        <router-link :to="item">{{ item }}</router-link>
      </li>
    </ul>
    <button @click="changeTheme">changeTheme</button>
  </div>
</template>

<script>
export default {
  name: 'home-1',
  components: {},
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.init();
  },
  activated() {},
  methods: {
    init() {
      this.getList();
    },
    getList() {
      this.list = this.$router.options.routes.map(item => item.path);
    },
    changeTheme() {
      document.body.style.setProperty('--bg-color', '#f00');
      document.body.style.setProperty('--font-color', 'blue');
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: $bg-color;
  a {
    color: $font-color;
  }
}
</style>
