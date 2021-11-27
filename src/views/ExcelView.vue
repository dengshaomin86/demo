<template>
  <div>
    <h1>excelView</h1>
    <input type="file" @change="change" />
  </div>
</template>

<script>
import xlsx from 'xlsx';

export default {
  name: 'excelView',
  methods: {
    async change(e) {
      const { files } = e.target;
      const result = await this.getFileData(files[0]);
      console.log(result);
    },
    getFileData(file) {
      return new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.onload = e => {
          const data = e.target.result;
          const result = xlsx.read(data, {
            type: 'binary',
          });
          resolve(result);
        };
        fileReader.readAsBinaryString(file);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
