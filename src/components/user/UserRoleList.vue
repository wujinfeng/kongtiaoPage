<template>
  <div>
    <el-row :gutter="10">
      <el-input v-model="username" placeholder="用户名"></el-input>
      <el-input v-model="roleName" placeholder="角色名"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add">添加</el-button>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userId">
          <el-select v-model="ruleForm.userId">
            <el-option
              v-for="item in userOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleId">
          <el-select v-model="ruleForm.roleId">
            <el-option
              v-for="item in roleOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save('ruleForm')">保 存</el-button>
      </div>
    </el-dialog>
    <hr>
    <el-table :data="tableData">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="userStatus" :formatter="formatUserStatus" label="用户状态"></el-table-column>
      <el-table-column prop="roleName" label="角色名"></el-table-column>
      <el-table-column prop="roleStatus" :formatter="formatRoleStatus" label="角色状态"></el-table-column>
      <el-table-column prop="ctime" label="创建时间"></el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="del(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-on:getPageData="getTablePageData" :total-num="totalNum"></pagination>
  </div>
</template>

<script>
  export default {
    name: 'UserRoleList',
    data() {
      return {
        username: '',
        roleName: '',
        dialogTitle: '添加用户的角色',
        dialogFormVisible: false,
        formLabelWidth: 130,
        ruleForm: {
          userId: '',
          roleId: ''
        },
        rules: {
          userId: [{required: true, message: '请选择', trigger: 'blur'}],
          roleId: [{required: true, message: '请选择', trigger: 'blur'}]
        },
        userOpt: [],
        roleOpt: [],
        tableData: [],
        totalNum: 0
      }
    },
    methods: {
      getTablePageData(pagerObj) {
        let params = {
          username: this.username,
          roleName: this.roleName,
          currentPage: pagerObj.currentPage,
          pageSize: pagerObj.pageSize,
          timestamp: new Date().getTime()
        }
        this.query(this, params)
      },
      search() {
        let params = {
          username: this.username,
          roleName: this.roleName,
          timestamp: new Date().getTime()
        }
        this.query(this, params)
      },
      add() {
        let that = this
        that.dialogFormVisible = true
      },
      save(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = that.ruleForm
            console.log(form)
            let url = '/admin/userRole/add'
            that.$axios.post(url, form).then(function (res) {
              if (res.status === 200 && res.data.code === 200) {
                that.$message({type: 'success', message: '保存成功'})
                that.query(that, {})
                that.dialogFormVisible = false
              } else {
                that.$message({type: 'error', message: '保存失败!'})
              }
            }).catch(function (err) {
              console.log('查询err:')
              console.log(err)
              that.$message({type: 'error', message: '保存失败'})
            })
          }
        })
      },
      del(val, index) {
        let that = this
        let params = {
          userId: val.userId,
          roleId: val.roleId,
          timestamp: new Date().getTime()
        }
        that.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios.get('/admin/userRole/del', {params: params}).then(function (res) {
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
      formatUserStatus(row, column, cellValue) {
        let text = ''
        let status = row.userStatus
        if (status === 1) {
          text = '可用'
        } else {
          text = '禁用'
        }
        return text
      },
      formatRoleStatus(row, column, cellValue) {
        let text = ''
        let status = row.roleStatus
        if (status === 1) {
          text = '可用'
        } else {
          text = '禁用'
        }
        return text
      },
      query(that, params) {
        console.log(params)
        that.$axios.get('/admin/userRole/list', {params: params}).then(function (res) {
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
      let that = this
      this.query(this, {})
      that.$axios.get('/admin/user/allUser').then(function (res) {
        console.log(`查询ok`)
        if (res.status === 200 && res.data.code === 200) {
          that.userOpt = res.data.data.map(function (item) {
            return {value: item.id, label: item.username}
          })
        } else {
          that.userOpt = []
        }
      }).catch((error) => {
        console.log(`查询err: ${error}`)
      })
      that.$axios.get('/admin/role/getAll').then(function (res) {
        console.log(`查询ok`)
        if (res.status === 200 && res.data.code === 200) {
          that.roleOpt = res.data.data.map(function (item) {
            return {value: item.id, label: item.name}
          })
        } else {
          that.roleOpt = []
        }
      }).catch((error) => {
        console.log(`查询err: ${error}`)
      })
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
