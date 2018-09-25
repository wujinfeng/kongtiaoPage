<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" :disabled="setDisabled"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email" type="email"></el-input>
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
    <el-form-item label="头像" prop="avatar">
      <el-upload
        class="upload"
        action="/admin/user/upload"
        :headers="setHeaders"
        :on-preview="handlePreview"
        :on-remove="handleRemoveF"
        :before-upload="beforeUpload"
        :on-error="uploadError"
        :on-success="uploadSuccessF"
        name="image"
        :limit=1
        list-type="picture"
        :on-exceed="handleExceed"
        :file-list="fileListF">
        <el-button size="mini" type="primary">点击上传
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
        <div slot="tip" class="el-upload__tip">只能上传 jpg, png</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'UserAdd',
    data() {
      var checkUserName = (rule, value, callback) => {
        let that = this
        if (!value) {
          return callback(new Error('不能为空'))
        }
        let username = value.toString()
        that.$axios.get('/admin/user/checkUserName/?pageStatus=' + that.pageStatus + '&username=' + username + '&id=' + that.ruleForm.id).then(function (res) {
          if (res.status === 200 && res.data.code === 200) {
            return callback()
          } else {
            return callback(new Error(res.data.msg))
          }
        }).catch((err) => {
          return callback(err)
        })
      }
      var checkPassword = (rule, value, callback) => {
        let that = this
        if (that.pageStatus === 'edit') {
          return callback()
        }
        if (!value) {
          return callback(new Error('密码不能为空'))
        }

        if (value.length < 8 || value.length > 20) {
          return callback(new Error('密码长度在 8 - 20 位'))
        } else {
          return callback()
        }
      }
      return {
        pageStatus: 'add', // 页面默认添加 add ,edit
        loading: false,
        setHeaders: {
          Authorization: `Bearer ${this.$store.state.token}`
        },
        ruleForm: {
          id: '',
          username: '',
          password: '',
          name: '',
          status: '',
          phone: '',
          avatar: '',
          email: ''
        },
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'},
            {validator: checkUserName, trigger: 'blur'}
          ],
          phone: [{required: true, message: '请输入手机号', trigger: 'blur'}],
          password: [{validator: checkPassword, trigger: 'blur'}],
          name: [{required: true, message: '请输入名称', trigger: 'blur'}],
          status: [{required: true, message: '请选择状态', trigger: 'blur'}],
          email: [{required: true, message: '请选择邮箱', trigger: 'blur'}]
        },
        fileListF: [],
        setDisabled: false,
        optionsStatus: [{
          value: 1,
          label: '可用'
        }, {
          value: 2,
          label: '禁用'
        }]
      }
    },
    beforeMount() {
      let that = this
      that.pageStatus = 'add'
      let id = that.$route.params.id
      let row = that.$route.params.row
      if (id) {
        console.log('id:', that.id)
        that.pageStatus = 'edit'
        that.setDisabled = true
        that.ruleForm = row
        if (row.avatar) {
          that.fileListF = [{name: row.avatar, url: row.avatar}]
        }
      }
    },
    methods: {
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = that.ruleForm
            console.log(form)
            let url = '/admin/user/add'
            if (that.pageStatus === 'edit') {
              url = '/admin/user/edit'
            }
            that.$axios.post(url, form).then(function (res) {
              if (res.status === 200 && res.data.code === 200) {
                that.$message({type: 'success', message: '保存成功'})
                that.$router.push({name: 'UserList'}) // 跳转列表页
              } else {
                that.$message({type: 'error', message: '添加失败'})
              }
            }).catch(function (err) {
              console.log('查询err:')
              console.log(err)
              that.$message({type: 'error', message: '保存失败'})
            })
          }
        })
      },
      handleRemoveF(file, fileList) { // 文件列表移除文件时的钩子
        this.ruleForm.avatar = ''
      },
      handlePreview(file) { // 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
        console.log('handlePreview:')
        console.log(file)
      },
      handleExceed(files, fileList) { // 文件超出个数限制时的钩子
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      // 上传成功后的回调
      uploadSuccessF(response, file, fileList) {
        console.log('responseF:')
        console.log(response)
        if (response.code === 200) {
          console.log('upload ok')
          this.ruleForm.avatar = response.data.relativeDir
          this.$message({message: '上传成功！', type: 'success'})
        } else {
          this.$message({message: response.msg, type: 'error'})
        }
      },
      // 上传错误
      uploadError(err, file, fileList) {
        this.$message({message: '上传失败，请重试！', type: 'error'})
        console.log(err)
      },
      beforeUpload(file) {
        console.log('file:')
        console.log(file)
        // file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
        let isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
        let isLtM = file.size / 1024 / 1024 < 10
        if (!isJPG) {
          this.$message.error('上传正确的格式!')
        }
        if (!isLtM) {
          this.$message.error('文件大小不能超过 10MB!')
        }
        return isJPG && isLtM
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
