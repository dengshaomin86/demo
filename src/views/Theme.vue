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
      document.body.style.setProperty('--bg-color', '#f00');
      document.body.style.setProperty('--font-color', 'blue');
    },
  },
};
</script>

<style lang="scss" scoped></style>
