<template>
  <div class="note">
    <div class="note-header">
      <i class="el-icon-edit"></i>
      <span>{{ title }}</span>
    </div>
    <div class="note-content">
      {{ content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Note-210516',
  props: {
    title: {
      type: String,
      default: 'Note'
    },
    content: {
      type: String,
      default: 'You can make eth_getLogs requests with up to a 5K block range. If you need to pull logs frequently, we recommend using WebSockets to push new logs to you when they are available.'
    }
  }
};
</script>

<style lang="scss" scoped>
.note {
  border-radius: 3px;
  overflow: hidden;
  border-left: 4px solid #448aff;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%), 0 3px 1px -2px rgb(0 0 0 / 20%);
  background-color: #212121;
  color: #fff;

  &-header {
    padding: 10px 15px;
    border-bottom: 1px solid rgba(68, 138, 255, 0.1);
    background-color: rgba(68, 138, 255, 0.1);
    font-weight: 700;
    i {
      color: #448aff;
      font-size: 18px;
      margin-right: 15px;
    }
  }

  &-content {
    padding: 15px;
  }
}
</style>
