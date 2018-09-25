<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="新密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'Password',
    data() {
      return {
        ruleForm: {
          id: '',
          password: ''
        },
        rules: {
          password: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    beforeMount() {
      this.ruleForm.id = this.$route.params.id
      console.log(this.ruleForm.id)
    },
    methods: {
      submitForm(formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            let form = {
              id: that.ruleForm.id,
              password: that.ruleForm.password
            }
            let url = '/admin/user/password'
            that.$axios.post(url, form).then(function (res) {
              if (res.status === 200 && res.data.code === 200) {
                that.ruleForm.password = ''
                that.$message({type: 'success', message: '提交成功'})
              } else {
                that.$message({type: 'error', message: '提交失败'})
              }
            }).catch(function (err) {
              console.log(err)
              that.$message({type: 'error', message: '提交失败'})
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
    max-width: 500px;
  }
</style>
