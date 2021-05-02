<template>
  <div>
    <h1>vue-markdown</h1>
    <vue-markdown :source="source"></vue-markdown>
    <textarea v-model="source"></textarea>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown';

  export default {
    name: 'vue-markdown',
    components: {
      VueMarkdown
    },
    data() {
      return {
        value: '',
        source: new Date().toLocaleTimeString(),
        anchorAttrs: {
          target: '_blank',
          rel: 'noopener noreferrer nofollow'
        }
      };
    }
  };
</script>

<style scoped>

</style>
