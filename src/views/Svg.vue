<template>
  <div class="wrapper">
    <h1>Svg</h1>
    <div>
      <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
      </svg>
    </div>

    <div>
      <!-- stroke-dasharray属性可以将图形的描边进行点状化 -->
      <!-- stroke-dashoffset可以使上一步中使用 stroke-dasharray 生成的点沿着path移动 -->
      <!-- stroke-linecap可以设置描边末端的样式：round -->
      <svg>
        <circle cx="60" cy="0" r="60" stroke="black" stroke-width="12" stroke-dasharray="300" stroke-dashoffset="50" stroke-linecap="round" fill="none" />
      </svg>
    </div>
    <svg>
      <path d="M275,175 v-150 a150,150 0 0,0 -150,150 z" fill="yellow" stroke="blue" stroke-width="15" stroke-linecap="round" />
    </svg>
    <svg>
      <path d="M 100,150 a 50 50 0 1 1 0 1 z" fill="none" stroke="black" stroke-width="15" stroke-linecap="round" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SvgT'
};
</script>

<style lang="scss" scoped></style>
