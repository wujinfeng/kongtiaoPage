<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
    <el-form-item label="名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select v-model="ruleForm.status">
        <el-option
          v-for="item in optionsStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'RoleAdd',
    data() {
      return {
        ruleForm: {
          id: '',
          name: '',
          status: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'blur'}
          ]
        },
        optionsStatus: [{
          value: 1,
          label: '启用'
        }, {
          value: 5,
          label: '禁用'
        }]
      }
    },
    beforeMount() {
      let that = this
      let id = that.$route.params.id
      let row = that.$route.params.row
      if (id) {
        that.ruleForm = row
      }
    },
    methods: {
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = that.ruleForm
            console.log(form)
            let url = '/admin/role/add'
            if (that.ruleForm.id) {
              url = '/admin/role/edit'
            }
            that.$axios.post(url, form).then(function (res) {
              if (res.status === 200 && res.data.code === 200) {
                that.$message({type: 'success', message: '保存成功'})
                that.$router.push({name: 'RoleList'}) // 跳转列表页
              } else {
                that.$message({type: 'error', message: '保存失败'})
              }
            }).catch(function (err) {
              console.log('查询err:')
              console.log(err)
              that.$message({type: 'error', message: '保存失败'})
            })
          } else {
            that.$message({type: 'error', message: '提交失败'})
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-form {
    max-width: 450px;
  }
</style>
