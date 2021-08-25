<template>
  <div>webworker</div>
</template>

<script>
import SWorker from 'simple-web-worker';

export default {
  name: 'webworker',
  mounted() {
    console.log(SWorker);
  },
};
</script>

<style scoped></style>
