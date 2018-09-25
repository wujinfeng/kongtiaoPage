<template>
  <div>
    <el-row :gutter="10">
      <el-input v-model="mobile" placeholder="手机号"></el-input>
      <el-input v-model="name" placeholder="活动名称"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="name" label="优惠名称"></el-table-column>
      <el-table-column prop="couponId"  label="优惠活动编号"></el-table-column>
      <el-table-column prop="status"  :formatter="formatStatus" label="状态"></el-table-column>
      <el-table-column prop="ctime" label="参与时间"></el-table-column>
    </el-table>
    <pagination v-on:getPageData="getTablePageData" :total-num="totalNum"></pagination>
  </div>
</template>

<script>
  export default {
    name: 'CouponUserList',
    data() {
      return {
        mobile: '',
        name: '',
        tableData: [],
        totalNum: 0
      }
    },
    methods: {
      getTablePageData(pagerObj) {
        let params = {
          mobile: this.mobile,
          name: this.name,
          currentPage: pagerObj.currentPage,
          pageSize: pagerObj.pageSize
        }
        this.query(this, params)
      },
      search() {
        let params = {
          mobile: this.mobile,
          name: this.name
        }
        this.query(this, params)
      },
      formatStatus(row, column, cellValue) {
        let text = ''
        let status = row.status
        if (status === 1) {
          text = '未使用'
        } else if (status === 2) {
          text = '已使用'
        }
        return text
      },
      query(that, params) {
        console.log(params)
        that.$axios.get('/admin/coupon/usercouponlist', {params: params}).then(function (res) {
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
