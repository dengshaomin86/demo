<template>
  <div>
    <h1>Theme</h1>
    <button @click="changeTheme">changeTheme</button>
  </div>
</template>

<script>
export default {
  name: 'Theme',
  methods: {
    changeTheme() {
      document.body.style.setProperty('--color', 'blue');
      document.body.style.setProperty('--bg-color', '#f00');
    },
  },
};
</script>

<style lang="scss" scoped></style>
