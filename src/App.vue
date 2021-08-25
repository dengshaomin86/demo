<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  &:before,
  &:after {
    display: table;
    content: '';
  }
}
</style>
