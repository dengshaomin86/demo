<template>
  <div class="wrapper">
    <h1>audio-viewer</h1>
    <canvas style="position: fixed;right:0;top:0;" id="canvas" width="800" height="350"></canvas>
    <el-form>
      <el-form-item>
        <el-button @click="getBlob">getBlob</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="getBuff">getBuff</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AudioViewer',
  data() {
    return {
      animationId: null,
      status: 0,
      url: `${location.origin}/static/music/world.mp3`,
      // url: `${location.origin}/static/music/周杰伦%20-%20不能说的秘密(正式EP版).mp3`,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    // 获取 blob 数据
    getBlob() {
      axios({
        url: this.url,
        method: 'get',
        responseType: 'blob',
      })
        .then(res => {
          this.blobToBuffer(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    // blob 转 buffer
    blobToBuffer(file) {
      const fileReader = new FileReader(); // 实例化一个FileReader用于读取文件
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = e => {
        this.bufferToAudioBuffer(e.target.result);
      };
      fileReader.onerror = err => {
        console.error(err);
      };
    },
    // 获取 arraybuffer 数据
    getBuff() {
      axios({
        url: this.url,
        method: 'get',
        responseType: 'arraybuffer',
      })
        .then(res => {
          this.bufferToAudioBuffer(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 把 buffer 转 AudioBuffer，否则后面无法赋值
    bufferToAudioBuffer(data) {
      const audioContext = new AudioContext();
      audioContext.decodeAudioData(
        data,
        buffer => {
          this.visualize(audioContext, buffer);
        },
        err => {
          console.error(err);
        },
      );
    },
    // 可视化
    visualize(audioContext, buffer) {
      const audioBufferSourceNode = audioContext.createBufferSource();
      // 创建 Analyser 分析器
      const analyser = audioContext.createAnalyser();
      // 将 source 与分析器连接
      audioBufferSourceNode.connect(analyser);
      // 将分析器与 destination 连接，这样才能形成到达扬声器的通路
      analyser.connect(audioContext.destination);
      // 将上一步解码得到的 buffer 数据赋值给 source
      audioBufferSourceNode.buffer = buffer;
      // stop the previous sound if any
      if (this.animationId !== null) {
        cancelAnimationFrame(this.animationId);
      }
      // 播放
      audioBufferSourceNode.start(0);
      this.status = 1;
      // 播放结束事件
      audioBufferSourceNode.onended = () => {
        console.log('play ended');
        this.status = 0;
      };
      this.drawSpectrum(analyser);
    },
    // 绘制
    drawSpectrum(analyser) {
      const canvas = document.getElementById('canvas');
      const cwidth = canvas.width;
      const cheight = canvas.height - 2;
      const meterWidth = 10; // 能量条的宽度
      // gap = 2, // 能量条间的间距
      const capHeight = 2;
      const capStyle = '#fff';
      const meterNum = 800 / (10 + 2); // 计算当前画布上能画多少条
      const capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
      const ctx = canvas.getContext('2d');
      // 定义一个渐变样式用于画图
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(1, '#0f0');
      gradient.addColorStop(0.5, '#ff0');
      gradient.addColorStop(0, '#f00');
      const drawMeter = () => {
        // 从 analyser 中得到此刻的音频中各频率的能量值
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        if (this.status === 0) {
          // fix when some sounds end the value still not back to zero
          for (let i = array.length - 1; i >= 0; i--) {
            array[i] = 0;
          }
          let allCapsReachBottom = true;
          for (let i = capYPositionArray.length - 1; i >= 0; i--) {
            allCapsReachBottom = allCapsReachBottom && capYPositionArray[i] === 0;
          }
          if (allCapsReachBottom) {
            // *** 结束时停止 requestAnimation 以防止内存泄漏 ***
            cancelAnimationFrame(this.animationId);
            return;
          }
        }
        const step = Math.round(array.length / meterNum); // 计算从analyser中的采样步长
        ctx.clearRect(0, 0, cwidth, cheight); // 清理画布准备画画
        // 对信源数组进行抽样遍历，画出每个频谱条
        for (let i = 0; i < meterNum; i++) {
          const value = array[i * step];
          if (capYPositionArray.length < Math.round(meterNum)) {
            capYPositionArray.push(value);
          }
          ctx.fillStyle = capStyle;
          // 开始绘制帽头
          // 如果当前值小于之前值
          if (value < capYPositionArray[i]) {
            // 则使用前一次保存的值来绘制帽头
            ctx.fillRect(i * 12, cheight - --capYPositionArray[i], meterWidth, capHeight);
          } else {
            // 否则使用当前值直接绘制
            ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
            capYPositionArray[i] = value;
          }
          // 开始绘制频谱条
          ctx.fillStyle = gradient;
          // 绘制能量条，频谱条的宽度 + 条间间距
          ctx.fillRect(i * 12, cheight - value + capHeight, meterWidth, cheight);
        }
        // 使用 requestAnimationFrame 让柱条动起来
        this.animationId = requestAnimationFrame(drawMeter);
      };
      this.animationId = requestAnimationFrame(drawMeter);
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  background: $--bg-color;
}
</style>
