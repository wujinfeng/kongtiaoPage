<template>
  <div>
    <el-row :gutter="10">
      <el-input v-model="couponId" placeholder="活动编号"></el-input>
      <el-input v-model="name" placeholder="活动名称"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column prop="id" width="120" label="编号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="introduce" width="260" label="介绍"></el-table-column>
      <el-table-column prop="money" width="90" label="优惠金额/元"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column prop="status"  width="50" :formatter="formatStatus" label="状态"></el-table-column>
      <el-table-column prop="operatorName" label="操作者"></el-table-column>
      <el-table-column width="70" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name:'CouponAdd',params:{id: scope.row.id, row: scope.row}}">
            <el-button type="primary" size="small">编辑</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-on:getPageData="getTablePageData" :total-num="totalNum"></pagination>
  </div>
</template>

<script>
  export default {
    name: 'CouponList',
    data() {
      return {
        couponId: '',
        name: '',
        tableData: [],
        totalNum: 0
      }
    },
    methods: {
      getTablePageData(pagerObj) {
        let params = {
          couponId: this.couponId,
          name: this.name,
          currentPage: pagerObj.currentPage,
          pageSize: pagerObj.pageSize
        }
        this.query(this, params)
      },
      search() {
        let params = {
          couponId: this.couponId,
          name: this.name
        }
        this.query(this, params)
      },
      formatStatus(row, column, cellValue) {
        let text = ''
        let status = row.status
        if (status === 1) {
          text = '启用'
        } else if (status === 5) {
          text = '禁用'
        }
        return text
      },
      query(that, params) {
        console.log(params)
        that.$axios.get('/admin/coupon/list', {params: params}).then(function (res) {
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
