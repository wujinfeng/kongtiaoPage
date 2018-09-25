<template>
  <div>
    <el-row :gutter="10">
      <el-input v-model="username" placeholder="用户名"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column label="头像">
        <template slot-scope="scope">
          <a :href="scope.row.avatar" target="_blank">
            <img :src="scope.row.avatar" style="max-width: 100px;height: 50px"/>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="status" :formatter="formatStatus" label="状态"></el-table-column>
      <el-table-column prop="ctime" label="创建日期"></el-table-column>
      <el-table-column width='150' label="操作">
        <template slot-scope="scope">
          <router-link :to="{name:'UserAdd',params:{id: scope.row.id, row: scope.row}}">
            <el-button type="primary" size="small">编辑</el-button>
          </router-link>
          <router-link :to="{name:'Password',params:{id: scope.row.id, mobile: scope.row.mobile}}">
            <el-button type="warning" size="small" title="修改密码">改密</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-on:getPageData="getTablePageData" :total-num="totalNum"></pagination>
  </div>
</template>

<script>
  export default {
    name: 'UserList',
    data() {
      return {
        username: '',
        tableData: [],
        totalNum: 0
      }
    },
    methods: {
      getTablePageData(pagerObj) {
        let params = {
          username: this.username,
          currentPage: pagerObj.currentPage,
          pageSize: pagerObj.pageSize
        }
        this.query(this, params)
      },
      search() {
        let params = {username: this.username}
        this.query(this, params)
      },
      formatStatus(row, column, cellValue) {
        let text = ''
        let status = row.status
        if (status === 1) {
          text = '可用'
        } else if (status === 2) {
          text = '禁用'
        }
        return text
      },
      query(that, params) {
        console.log(params)
        that.$axios.get('/admin/user/list', {params: params}).then(function (res) {
          console.log(`查询ok`)
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
