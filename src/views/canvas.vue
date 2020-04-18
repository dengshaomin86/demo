<template>
  <div>
    <h1>canvas</h1>
    <canvas id="canvas" width="800" height="800"></canvas>
  </div>
</template>

<script>
export default {
  name: "canvas-t",
  data() {
    return {};
  },
  methods: {
    init() {
      this.draw();
    },
    draw() {
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      this.drawRect(context);
      this.drawPath(context);
      this.drawSmile(context);
    },
    // 绘制矩形
    drawRect(context) {
      context.fillStyle = "blue";
      context.fillRect(0, 0, 200, 200); // x,y,width,height 填充矩形
      context.clearRect(60, 60, 80, 80); // 清除矩形区域
      context.strokeRect(70, 70, 60, 60); // 绘制矩形边框
    },
    // 绘制路径
    drawPath(context) {
      context.fillStyle = "yellow";
      context.beginPath(); // 新建一条路径
      context.moveTo(100, 200); // x,y 指定你的起始位置
      context.lineTo(0, 400); // x,y 绘制直线
      context.lineTo(200, 400);
      context.closePath(); // 闭合路径之后图形绘制命令又重新指向到上下文中
      // context.fill(); // 通过填充路径的内容区域生成实心的图形（实心，会自动闭合）
      context.stroke(); // 通过线条来绘制图形轮廓（空心，不会自动闭合）
    },
    /**
       * 绘制笑脸
       * 1. 绘制圆弧 arc(x, y, radius, startAngle, endAngle, anticlockwise)
       * 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
       * 2. arcTo(x1, y1, x2, y2, radius)
       * 根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。
       * x,y - 圆心坐标
       * radius - 半径
       * startAngle - 开始弧度，以x轴为基准
       * endAngle - 结束弧度，以x轴为基准
       * arc() 函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式：弧度=(Math.PI/180)*角度。
       * anticlockwise - Boolean，为true时，是逆时针方向，否则顺时针方向
       * @param context
       */
    drawSmile(context) {
      context.fillStyle = "pink";
      context.beginPath();
      context.arc(100, 500, 100, 0, Math.PI * 2, true);
      context.moveTo(180, 500); // 用 moveTo 绘制不连续的线
      context.arc(100, 500, 80, 0, Math.PI, false);
      context.moveTo(60, 450);
      context.arc(50, 450, 10, 0, Math.PI * 2);
      context.moveTo(160, 450);
      context.arc(150, 450, 10, 0, Math.PI * 2);
      context.stroke();
      context.fill();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="scss">
  canvas {
    border: 1px solid #ccc;
  }

</style>
