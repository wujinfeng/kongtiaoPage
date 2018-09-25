<template>
  <div>
    <el-row :gutter="10">
      <el-input v-model="name" placeholder="菜单名称"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="name" label="菜单名称"></el-table-column>
      <el-table-column :formatter="formatType" label="子节点"></el-table-column>
      <el-table-column prop="url" label="url"></el-table-column>
      <el-table-column prop="parentName" label="父菜单"></el-table-column>
      <el-table-column :formatter="formatStatus" label="状态"></el-table-column>
      <el-table-column prop="icon" label="icon"></el-table-column>
      <el-table-column prop="ctime" label="更新日期"></el-table-column>
    </el-table>
    <pagination v-on:getPageData="getTablePageData" :total-num="totalNum"></pagination>
  </div>
</template>

<script>
  export default {
    name: 'BillingList',
    data() {
      return {
        name: '',
        placeName: '',
        tableData: [],
        totalNum: 0
      }
    },
    methods: {
      getTablePageData(pagerObj) {
        let params = {
          name: this.name,
          placeName: this.placeName,
          currentPage: pagerObj.currentPage,
          pageSize: pagerObj.pageSize
        }
        this.query(this, params)
      },
      search() {
        let params = {name: this.name, placeName: this.placeName}
        this.query(this, params)
      },
      del(val, index) {
        let that = this
        that.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios.get('/admin/user/delete/' + val).then(function (res) {
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
      formatStatus(row, column, cellValue) {
        let text = ''
        let status = row.status
        if (status === 1) {
          text = '启用'
        } else if (status === 2) {
          text = '禁用'
        }
        return text
      },
      formatType(row, column, cellValue) {
        let text = ''
        let isLeaf = row.isLeaf
        if (isLeaf === 1) {
          text = '是'
        } else {
          text = '否'
        }
        return text
      },
      formatName(row, column, cellValue) {
        return row.userName ? row.userName + '_' + row.mobile : ''
      },
      query(that, params) {
        console.log(params)
        params.type = 1
        that.$axios.get('/admin/access/list', {params: params}).then(function (res) {
          if (res.status === 200 && res.data.code === 200) {
            that.tableData = res.data.data.tableData
            that.totalNum = res.data.data.totalNum
          } else {
            that.tableData = []
            that.totalNum = 0
          }
        }).catch((error) => {
          console.log(`查询err: ${error}`)
          that.tableData = []
          that.totalNum = 0
        })
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
