<template>
  <div>
    <el-row :gutter="10">
      <el-input v-model="username" placeholder="用户名"></el-input>
      <el-date-picker
        v-model="createdAt"
        type="daterange"
        :clearable=false
        unlink-panels
        range-separator='-'
        :editable=false
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="type" label="操作类型"></el-table-column>
      <el-table-column prop="original" label="原值"></el-table-column>
      <el-table-column prop="new" label="新值"></el-table-column>
      <el-table-column prop="ctime" label="创建日期"></el-table-column>
    </el-table>
    <pagination v-on:getPageData="getTablePageData" :total-num="totalNum"></pagination>
  </div>
</template>

<script>
  export default {
    name: 'LoginLogList',
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近7天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近30天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近90天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        username: '',
        createdAt: [],
        tableData: [],
        totalNum: 0
      }
    },
    methods: {
      getTablePageData(pagerObj) {
        let params = {
          username: this.username,
          createdAt: this.createdAt,
          currentPage: pagerObj.currentPage,
          pageSize: pagerObj.pageSize
        }
        this.query(this, params)
      },
      search() {
        let params = {
          username: this.username,
          createdAt: this.createdAt
        }
        this.query(this, params)
      },
      query(that, params) {
        console.log(params)
        that.$axios.get('/admin/handleLog/list', {params: params}).then(function (res) {
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
