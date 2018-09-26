<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
    <el-form-item label="名称" prop="name">
      <el-input v-model="ruleForm.name" placeholder="名称"></el-input>
    </el-form-item>
     <el-form-item label="连接地址" prop="link">
      <el-input v-model="ruleForm.link" placeholder="连接地址"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="pic">
      <el-upload
        class="upload"
        action="/api/user/upload"
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
    name: 'BrandAdd',
    data() {
      return {
        pageStatus: 'add', // 页面默认添加 add ,edit
        setHeaders: {
          Authorization: `Bearer ${this.$store.state.token}`
        },
        ruleForm: {
          id: '',
          name: '',
          pic: '',
          link: ''
        },
        rules: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'}],
          link: [{required: true, message: '请输入链接', trigger: 'blur'}],
          pic: [{required: true, message: '请上传图片', trigger: 'blur'}]
        },
        fileListF: []
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
        if (row.pic) {
          that.fileListF = [{name: row.pic, url: row.pic}]
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
            let url = '/api/brand/add'
            if (that.pageStatus === 'edit') {
              url = '/api/brand/edit'
            }
            that.$axios.post(url, form).then(function (res) {
              if (res.status === 200 && res.data.code === 200) {
                that.$message({type: 'success', message: '保存成功'})
                that.$router.push({name: 'BrandList'}) // 跳转列表页
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
        this.ruleForm.pic = ''
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
          this.ruleForm.pic = response.data.relativeDir
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
    max-width: 600px;
  }
</style>
