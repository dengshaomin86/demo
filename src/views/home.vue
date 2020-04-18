<template>
  <div class="home">
    <ul>
      <li v-for="(item, idx) in list" :key="idx">
        <router-link :to="item">{{item}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    init() {
      this.getList();
    },
    getList() {
      this.list = this.$router.options.routes.map(item => item.path);
    }
  },
  mounted() {
    this.init();
  }
};
</script>
