<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
    <el-form-item label="名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
       <el-form-item label="连接地址" prop="link">
      <el-input v-model="ruleForm.link" placeholder="连接地址"></el-input>
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
          link: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          link: [
            {required: true, message: '请输入链接地址', trigger: 'blur'}
          ]
        }
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
            let url = '/api/link/add'
            if (that.ruleForm.id) {
              url = '/api/link/edit'
            }
            that.$axios.post(url, form).then(function (res) {
              if (res.status === 200 && res.data.code === 200) {
                that.$message({type: 'success', message: '保存成功'})
                that.$router.push({name: 'LinkList'}) // 跳转列表页
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
