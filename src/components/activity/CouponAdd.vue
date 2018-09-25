<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
    <el-form-item label="活动标题" prop="name">
      <el-input v-model.number="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="优惠金额/元" prop="money">
      <el-input v-model.number="ruleForm.money"></el-input>
    </el-form-item>
    <el-form-item label="开始时间" prop="startTime">
      <el-date-picker
        v-model="ruleForm.startTime"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间" prop="endTime">
      <el-date-picker
        v-model="ruleForm.endTime"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select v-model="ruleForm.status" placeholder="所有活动只能一个处于启用状态">
        <el-option
          v-for="item in optionsStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动介绍" prop="introduce">
      <el-input v-model="ruleForm.introduce" type="textarea" :rows="15"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'CouponAdd',
    data() {
      return {
        loading: false,
        ruleForm: {
          name: '',
          introduce: '',
          money: '',
          startTime: '',
          endTime: '',
          status: ''
        },
        rules: {
          name: [{required: true, message: '请输入活动标题', trigger: 'blur'}],
          introduce: [{required: true, message: '请输入活动介绍', trigger: 'blur'}],
          money: [{required: true, message: '请输入金额', trigger: 'blur'}],
          startTime: [{required: true, message: '请选择开始时间', trigger: 'blur'}],
          endTime: [{required: true, message: '请选择结束时间', trigger: 'blur'}],
          status: [{required: true, message: '请选择状态', trigger: 'blur'}]
        },
        id: '',
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
      that.id = that.$route.params.id
      let row = that.$route.params.row
      if (that.id) {
        that.ruleForm = row
      }
    },
    methods: {
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = {
              id: that.id || '',
              name: that.ruleForm.name,
              introduce: that.ruleForm.introduce,
              money: that.ruleForm.money,
              startTime: that.ruleForm.startTime,
              endTime: that.ruleForm.endTime,
              status: that.ruleForm.status
            }
            console.log(form)
            let url = '/admin/coupon/add'
            if (that.id) {
              url = '/admin/coupon/edit'
            }
            that.$axios.post(url, form).then(function (res) {
              if (res.status === 200 && res.data.code === 200) {
                that.$message({type: 'success', message: '保存成功'})
                that.$router.push({name: 'CouponList'}) // 跳转列表页
              } else {
                that.$message({type: 'error', message: '添加失败'})
              }
            }).catch(function (err) {
              console.log('查询err:')
              console.log(err)
              that.$message({type: 'error', message: '保存失败'})
            })
          } else {
            that.$message({type: 'error', message: '保存失败'})
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

  .el-select, .el-input {
    width: 300px;
  }
</style>
