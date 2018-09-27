<template>
  <div>
    <el-row :gutter="10">
      <el-input v-model="title" placeholder="输入标题（模糊查询）"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-if="props.row.type===1" label="冷却方式:">
              <span>{{ props.row.cooling_mode }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===1" label="压缩机:">
              <span>{{ props.row.compressor }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===1 || props.row.type===3" label="机组类别:">
              <span>{{ props.row.unit_category }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===1 || props.row.type===2" label="用途:">
              <span>{{ props.row.purpose }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===1" label="制冷量:">
              <span>{{ props.row.refrigerating_capacity }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===1" label="制热量:">
              <span>{{ props.row.heat_production }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===1" label="制冷功率:">
              <span>{{ props.row.refrigeration_power }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===1" label="制热功率:">
              <span>{{ props.row.thermal_power }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===1" label="COP:">
              <span>{{ props.row.cop }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===1" label="电压类别:">
              <span>{{ props.row.voltage_category }}</span>
            </el-form-item>
            <el-form-item label="外形尺寸:">
              <span>{{ props.row.shape_size }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===1" label="运输重量:">
              <span>{{ props.row.transport_weight }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===1" label="运行重量:">
              <span>{{ props.row.operating_weight }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===1 || props.row.type===2" label="噪音:">
              <span>{{ props.row.noise }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===2 || props.row.type===3" label="风量:">
              <span>{{ props.row.air_volume }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===2 || props.row.type===3" label="供冷量:">
              <span>{{ props.row.cooling_capacity }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===2 || props.row.type===3" label="供热量:">
              <span>{{ props.row.heat_supply }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===2" label="静压:">
              <span>{{ props.row.static_pressure }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===2 || props.row.type===3" label="电机功率:">
              <span>{{ props.row.motor_power }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===2 || props.row.type===3" label="重量:">
              <span>{{ props.row.weight }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===3" label="排管数:">
              <span>{{ props.row.tubes_num }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===3" label="余压:">
              <span>{{ props.row.residual_pressure }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.type===3" label="工况:">
              <span>{{ props.row.working_condition }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="type" :formatter="formatType" label="类型"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="alias" label="别称"></el-table-column>
      <el-table-column prop="model" label="型号"></el-table-column>
      <el-table-column prop="brand" label="品牌"></el-table-column>
      <el-table-column prop="place" label="产地"></el-table-column>
      <el-table-column prop="product" label="产品"></el-table-column>
      <el-table-column prop="ctime" :formatter="formatTime" label="创建日期"></el-table-column>
      <el-table-column width='150' label="操作">
        <template slot-scope="scope">
          <router-link :to="{name:'AirAdd',params:{id: scope.row.id, row: scope.row}}">
            <el-button type="primary" size="small">编辑</el-button>
          </router-link>
          <el-button type="danger" size="small" @click="del(scope.row.id, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-on:getPageData="getTablePageData" :total-num="totalNum"></pagination>
  </div>
</template>

<script>
  export default {
    name: 'AirList',
    data() {
      return {
        title: '',
        tableData: [],
        totalNum: 0
      }
    },
    methods: {
      getTablePageData(pagerObj) {
        let params = {
          title: this.title,
          currentPage: pagerObj.currentPage,
          pageSize: pagerObj.pageSize
        }
        this.query(this, params)
      },
      search() {
        let params = {title: this.title}
        this.query(this, params)
      },
      formatType(row) {
        let text = ''
        let status = row.type
        if (status === 1) {
          text = '主机'
        } else if (status === 2) {
          text = '风机盘管'
        } else if (status === 3) {
          text = '空气处理机组'
        }
        return text
      },
      del(val, index) {
        let that = this
        that.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios.get('/api/air/delete/' + val).then(function (res) {
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
        that.$axios.get('/api/air/list', {params: params}).then(function (res) {
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
    width: 330px;
  }

  .el-select {
    width: 100px;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
