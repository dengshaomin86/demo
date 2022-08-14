<template>
  <div>
    <h1>ClearKeepAlive</h1>
  </div>
</template>

<script>
export default {
  name: 'ClearKeepAlive',
  beforeRouteLeave(to, from, next) {
    if (to.path === 'xxx') {
      this.$vnode.parent.componentInstance.cache = {};
      this.$vnode.parent.componentInstance.keys = [];
    }
    next();
  },
};
</script>

<style lang="scss" scoped></style>
