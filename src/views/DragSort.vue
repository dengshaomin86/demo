<template>
  <div>
    <transition-group name="drag" class="list" tag="ul">
      <li
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event, index)"
        @dragstart="dragstart(index)"
        draggable
        v-for="(item, index) in list"
        :key="item.label"
        class="list-item"
      >
        {{ item.label }}
      </li>
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [{ label: '列表1' }, { label: '列表2' }, { label: '列表3' }, { label: '列表4' }, { label: '列表5' }, { label: '列表6' }],
      dragIndex: '',
      enterIndex: '',
    };
  },
  methods: {
    shuffle() {
      this.list = this.$shuffle(this.list);
    },
    dragstart(index) {
      this.dragIndex = index;
    },
    dragenter(e, index) {
      e.preventDefault();
      // 避免源对象触发自身的dragenter事件
      if (this.dragIndex !== index) {
        const moving = this.list[this.dragIndex];
        this.list.splice(this.dragIndex, 1);
        this.list.splice(index, 0, moving);
        // 排序变化后目标对象的索引变成源对象的索引
        this.dragIndex = index;
      }
    },
    dragover(e, index) {
      e.preventDefault();
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  list-style: none;
  .drag-move {
    transition: transform 0.3s;
  }
  .list-item {
    cursor: move;
    width: 300px;
    background: #ea6e59;
    border-radius: 4px;
    color: #fff;
    margin-bottom: 6px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
</style>
