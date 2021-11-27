<template>
  <div class="con">
    <h1>database</h1>
    <div class="btn-con">
      <el-button @click="addBtn">新增</el-button>
    </div>
    <el-table stripe :data="tableData" style="width: 100%">
      <el-table-column type="index" align="center"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="opt" label="操作">
        <template slot-scope="scope">
          <el-button @click="modifyBtn(scope.row)">修改</el-button>
          <el-button @click="removeBtn(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'database',
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      type: '',
      form: {
        _id: '',
        name: '',
        sex: '',
        age: '',
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get('/database/find')
        .then(res => {
          console.log(res);
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    addBtn() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = '';
      });
      this.dialogVisible = true;
      this.type = 'add';
    },

    add() {
      this.dialogVisible = false;
      const params = JSON.parse(JSON.stringify(this.form));
      delete params._id;
      axios
        .get('/database/add', {
          params,
        })
        .then(res => {
          console.log(res);
          this.$message.success(res.data);
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },

    modifyBtn(item) {
      console.log(item);
      Object.keys(this.form).forEach(key => {
        this.form[key] = item[key];
      });
      this.dialogVisible = true;
      this.type = 'modify';
    },

    modify() {
      this.dialogVisible = false;
      axios
        .get('/database/modify', {
          params: this.form,
        })
        .then(res => {
          console.log(res);
          this.$message.success(res.data);
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },

    removeBtn(item) {
      axios
        .get('/database/remove', {
          params: item,
        })
        .then(res => {
          console.log(res);
          this.$message.success(res.data);
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },

    submit() {
      this[this.type]();
    },
  },
};
</script>

<style scoped lang="scss">
.con {
  padding: 30px;

  .btn-con {
    text-align: right;
    margin-bottom: 10px;
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>
