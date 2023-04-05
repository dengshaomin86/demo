<template>
  <div>
    <h1>AudioPlayer</h1>
    <div>{{ src }}</div>
    <div>{{ duration }}</div>
    <div>{{ currentTime }}</div>
    <div>{{ status }}</div>
    <button @click="change">change</button>
    <button @click="$router.back()">back</button>
  </div>
</template>

<script>
const audioNodeList = [];

export default {
  name: 'AudioPlayer',
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      el: null,
      duration: 0,
      currentTime: 0,
      status: 'pause',
    };
  },
  computed: {},
  watch: {
    src: {
      immediate: true,
      handler() {
        this.init();
      },
    },
  },
  beforeDestroy() {
    this.resetAudio(this.el);
  },
  deactivated() {
    this.resetAudio(this.el);
  },
  methods: {
    init() {
      this.createAudioEl();
    },
    oncanplay() {
      this.duration = this.el.duration;
    },
    onplay() {
      this.status = 'play';
    },
    onpause() {
      this.status = 'pause';
    },
    onended() {
      this.status = 'onended';
    },
    ontimeupdate() {
      if (!this.el) return;
      this.currentTime = this.el.currentTime;
    },
    createAudioEl() {
      if (!this.src) return;
      this.el = new Audio(this.src);
      this.el.addEventListener('canplay', this.oncanplay);
      this.el.addEventListener('play', this.onplay);
      this.el.addEventListener('pause', this.onpause);
      this.el.addEventListener('ended', this.onended);
      this.el.addEventListener('timeupdate', this.ontimeupdate);
      audioNodeList.push(this.el);
    },
    resetAudio(el) {
      if (!el) return;
      el.pause();
      el.currentTime = 0;
    },
    closeAll() {
      for (const el of audioNodeList) {
        if (el && !el.paused) {
          this.resetAudio(el);
        }
      }
    },
    play() {
      this.closeAll();
      this.el.play();
    },
    pause() {
      this.el.pause();
    },
    change() {
      if (!this.el) return;
      this.el.paused ? this.play() : this.pause();
    },
  },
};
</script>

<style lang="scss" scoped></style>
