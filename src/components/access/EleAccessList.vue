<template>
  <div>
    <el-row :gutter="10">
      <el-input v-model="menuName" placeholder="菜单名称"></el-input>
      <el-input v-model="name" placeholder="元素名称"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column prop="menuName" label="归属菜单"></el-table-column>
      <el-table-column prop="name" label="元素名称"></el-table-column>
      <el-table-column prop="code" label="编码"></el-table-column>
      <el-table-column :formatter="formatStatus" label="状态"></el-table-column>
      <el-table-column prop="ctime" label="创建日期"></el-table-column>
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
        menuName: '',
        tableData: [],
        totalNum: 0
      }
    },
    methods: {
      getTablePageData(pagerObj) {
        let params = {
          name: this.name,
          menuName: this.menuName,
          currentPage: pagerObj.currentPage,
          pageSize: pagerObj.pageSize
        }
        this.query(this, params)
      },
      search() {
        let params = {name: this.name, menuName: this.menuName}
        this.query(this, params)
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
      query(that, params) {
        console.log(params)
        params.type = 2
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
