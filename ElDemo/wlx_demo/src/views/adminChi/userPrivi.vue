<template>
  <div class="userPrivi">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="账号" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.userName" placeholder="请输入内容"></el-input>
          <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.userNickName" placeholder="请输入内容"></el-input>
          <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="密码" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.userPass" placeholder="请输入内容"></el-input>
          <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="240">
        <template slot-scope="scope">
          <el-input v-model="scope.row.userCreateTime" placeholder="请输入内容" :disabled="true"></el-input>
          <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="是否管理员" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.isadmin ? "是" : "否" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{ scope.row.isadmin ? "移除管理员" : "提为管理员"
          }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">移除用户</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'userPrivi',
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    async handleEdit(index, row) {
      if (row.isadmin) {
        let {data} = await this.$axios.post("/node/login/removeAdmin", { id: row._id })
        this.$message.success("移除成功")
        row.isadmin = false
      } else {
        let {data} = await this.$axios.post("/node/login/addAdmin", { id: row._id })
        this.$message.success("添加成功")
        row.isadmin = true
      }
    },
    async handleDelete(index, row) {
      let {data} = await this.$axios.post("/node/login/deleteUser", { id: row._id });
      this.$message.success(data)
      this.tableData.splice(index, 1);
      this.$message.success("删除用户成功");
      // console.log(data);
    },
    async getAllUserAdmin() {
      let { data } = await this.$axios.get("/node/login/getAllUserAdmin");
      // console.log(data);
      this.tableData = data;
    },
  },
  mounted() {
    this.getAllUserAdmin();
  },
  beforeDestroy(){
    removeEventListener('click', this.click, false)
  }
}
</script>

<style lang="less">

</style>