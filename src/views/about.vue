<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <div style="width: 200px; height: 200px;background-color: blue;" v-drag></div> -->
    <Note />
  </div>
</template>

<script>
import Note from '@/components/Note';

export default {
  name: 'About',
  components: {
    Note
  }
};
</script>

<style lang="scss" scoped></style>
