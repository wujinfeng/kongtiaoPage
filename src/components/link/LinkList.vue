<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="link" label="链接"></el-table-column>
      <el-table-column prop="ctime" :formatter="formatTime" label="创建日期"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{name:'LinkAdd',params:{id: scope.row.id, row: scope.row}}">
            <el-button type="primary" size="small">编辑</el-button>
          </router-link>
          <el-button type="danger" size="small" @click="del(scope.row.id, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'LinkList',
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      del(val, index) {
        let that = this
        that.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios.get('/api/link/delete/' + val).then(function (res) {
            if (res.status === 200 && res.data.code === 200) {
              that.tableData.splice(index, 1)
              that.$message({type: 'success', message: '删除成功!'})
            } else {
              that.$message({type: 'error', message: '删除失败'})
            }
          })
        }).catch(() => {
          that.$message({type: 'info', message: '已取消删除'})
        })
      },
      query(that, params) {
        console.log(params)
        that.$axios.get('/api/link/list', {params: params}).then(function (res) {
          if (res.status === 200 && res.data.code === 200) {
            that.tableData = res.data.data
          } else {
            that.tableData = []
          }
        }).catch((error) => {
          console.log(`查询err: ${error}`)
          that.tableData = []
        })
      },
      formatTime(row) {
        return this.$moment(row.ctime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    mounted() {
      this.query(this, {})
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-input {
    display: inline-block;
    width: 140px;
  }

  .el-select {
    width: 100px;
  }

</style>
