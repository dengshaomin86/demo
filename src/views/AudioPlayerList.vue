<template>
  <div>
    <h1>AudioPlayerList</h1>
    <AudioPlayer src="static/music/world.mp3" />
    <AudioPlayer src="static/music/周杰伦 - 不能说的秘密(正式EP版).mp3" />
  </div>
</template>

<script>
import AudioPlayer from '@/components/AudioPlayer';

export default {
  name: 'AudioPlayerList',
  components: { AudioPlayer },
  mounted() {
    console.log('***mounted');
  },
  activated() {
    console.log('***activated');
  },
};
</script>

<style lang="scss" scoped></style>
