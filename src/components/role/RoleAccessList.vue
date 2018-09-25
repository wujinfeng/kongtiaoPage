<template>
  <div>
    <el-row :gutter="10">
      <el-input v-model="name" placeholder="角色名称"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column label="权限">
        <template slot-scope="scope">
          <el-tree :data="scope.row.tree" :props="defaultProps"></el-tree>
        </template>
      </el-table-column>
      <el-table-column prop="uptime" label="更新日期"></el-table-column>
      <el-table-column prop="id" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editAccess(scope.row)">编辑权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-on:getPageData="getTablePageData" :total-num="totalNum"></pagination>
    <!--编辑对话框-->
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="500px">
      <el-tree :data="allMenuTree" :props="allMenuTreeProps" show-checkbox default-expand-all node-key="id"
               ref="tree"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSaveAccess()">取 消</el-button>
        <el-button type="primary" @click="saveAccess()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'RoleAccessList',
    data() {
      return {
        name: '',
        tableData: [],
        defaultProps: {
          children: 'children',
          label: 'menuName'
        },
        allMenuTreeProps: {
          children: 'children',
          label: 'menuName'
        },
        dialogVisible: false,
        currentRoleId: '',
        allMenuTree: [],
        currentMenuTree: [],
        totalNum: 0
      }
    },
    methods: {
      getTablePageData(pagerObj) {
        let params = {
          name: this.name,
          currentPage: pagerObj.currentPage,
          pageSize: pagerObj.pageSize
        }
        this.query(this, params)
      },
      search() {
        let params = {
          name: this.name
        }
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
      editAccess(row) {
        console.log(row.roleId)
        let that = this
        this.currentRoleId = row.roleId
        this.currentMenuTree = row.tree
        console.log(this.currentMenuTree)
        this.dialogVisible = true
        // 获取所有key,即id
        let currentIdArr = that.getCurrentIdArr(that.currentMenuTree)
        console.log('currentIdArr:', currentIdArr)
        that.$nextTick(function () {
          that.$refs.tree.setCheckedKeys(currentIdArr)
        })
      },
      saveAccess() {
        let that = this
        let getCheckedKeys = that.$refs.tree.getCheckedKeys()
        let getHalfCheckedKeys = that.$refs.tree.getHalfCheckedKeys()
        console.log('getCheckedKeys:', getCheckedKeys)
        console.log('getHalfCheckedKeys:', getHalfCheckedKeys)
        let checkedkeys = getCheckedKeys.concat(getHalfCheckedKeys)
        let params = {accessArr: checkedkeys, roleId: that.currentRoleId, type: 1} // type 1:菜单，2元素
        that.$axios.post('/admin/roleAccess/add', params).then(function (res) {
          if (res.status === 200 && res.data.code === 200) {
            that.$message({type: 'success', message: '保存成功'})
            that.dialogVisible = false
          } else {
            that.$message({type: 'error', message: '保存失败'})
          }
        }).catch((error) => {
          console.log(error)
          that.$message({type: 'error', message: '保存失败'})
        })
      },
      cancelSaveAccess() {
        this.dialogVisible = false
      },
      formatStatus(row, column, cellValue) {
        let text = ''
        let status = row.status
        if (status === 1) {
          text = '在岗启用'
        } else if (status === 5) {
          text = '离岗禁用'
        }
        return text
      },
      query(that, params) {
        console.log(params)
        that.$axios.get('/admin/roleAccess/list', {params: params}).then(function (res) {
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
      getCurrentIdArr(arr) {
        let currentIdArr = []
        function getId(arr) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].isLeaf === 1) { // 取树子节点
              currentIdArr.push(arr[i].id)
            }
            if (arr[i].children && arr[i].children.length > 0) {
              getId(arr[i].children)
            }
          }
        }
        getId(arr)
        return currentIdArr
      },
      getAllMenuTree() {
        let that = this
        that.$axios.get('/admin/access/allmenutree').then(function (res) {
          console.log('allmenutree', res.data)
          if (res.status === 200 && res.data.code === 200) {
            that.allMenuTree = res.data.data
          } else {
            that.allMenuTree = []
          }
        }).catch((error) => {
          console.log(`查询err: ${error}`)
          that.allMenuTree = []
        })
      }
    },
    mounted() {
      this.query(this, {})
      this.getAllMenuTree()
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
