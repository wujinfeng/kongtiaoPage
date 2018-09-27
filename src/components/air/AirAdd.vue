<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
    <el-form-item label="数据类型" prop="type">
      <el-select v-model="ruleForm.type">
        <el-option
          v-for="item in type_option"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="别称" prop="alias">
      <el-input v-model="ruleForm.alias"></el-input>
    </el-form-item>
    <el-form-item label="型号" prop="model">
      <el-input v-model="ruleForm.model"></el-input>
    </el-form-item>
    <el-form-item label="品牌" prop="brand">
      <el-input v-model="ruleForm.brand"></el-input>
    </el-form-item>
    <el-form-item label="产地" prop="place">
      <el-input v-model="ruleForm.place"></el-input>
    </el-form-item>
    <el-form-item label="产品" prop="product">
      <el-input v-model="ruleForm.product"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===1" label="冷却方式" prop="cooling_mode">
      <el-input v-model="ruleForm.cooling_mode"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===1" label="压缩机" prop="compressor">
      <el-input v-model="ruleForm.compressor"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===1 || ruleForm.type===3" label="机组类别" prop="unit_category">
      <el-input v-model="ruleForm.unit_category"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===1 || ruleForm.type===2" label="用途" prop="purpose">
      <el-input v-model="ruleForm.purpose"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===1" label="制冷量" prop="refrigerating_capacity">
      <el-input v-model="ruleForm.refrigerating_capacity"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===1" label="制热量" prop="heat_production">
      <el-input v-model="ruleForm.heat_production"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===1" label="制冷功率" prop="refrigeration_power">
      <el-input v-model="ruleForm.refrigeration_power"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===1" label="制热功率" prop="thermal_power">
      <el-input v-model="ruleForm.thermal_power"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===1" label="COP" prop="cop">
      <el-input v-model="ruleForm.cop"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===1" label="电压类别" prop="voltage_category">
      <el-input v-model="ruleForm.voltage_category"></el-input>
    </el-form-item>
    <el-form-item label="外形尺寸" prop="shape_size">
      <el-input v-model="ruleForm.shape_size"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===1" label="运输重量" prop="transport_weight">
      <el-input v-model="ruleForm.transport_weight"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===1" label="运行重量" prop="operating_weight">
      <el-input v-model="ruleForm.operating_weight"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===1 || ruleForm.type===2" label="噪音" prop="noise">
      <el-input v-model="ruleForm.noise"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===2 || ruleForm.type===3" label="风量" prop="air_volume">
      <el-input v-model="ruleForm.air_volume"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===2 || ruleForm.type===3" label="供冷量" prop="cooling_capacity">
      <el-input v-model="ruleForm.cooling_capacity"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===2 || ruleForm.type===3" label="供热量" prop="heat_supply">
      <el-input v-model="ruleForm.heat_supply"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===2" label="静压" prop="static_pressure">
      <el-input v-model="ruleForm.static_pressure"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===2 || ruleForm.type===3" label="电机功率" prop="motor_power">
      <el-input v-model="ruleForm.motor_power"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===2 || ruleForm.type===3" label="重量" prop="weight">
      <el-input v-model="ruleForm.weight"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===3" label="排管数" prop="tubes_num">
      <el-input v-model="ruleForm.tubes_num"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===3" label="余压" prop="residual_pressure">
      <el-input v-model="ruleForm.residual_pressure"></el-input>
    </el-form-item>
    <el-form-item v-if="ruleForm.type===3" label="工况" prop="working_condition">
      <el-input v-model="ruleForm.working_condition"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'AirAdd',
    data() {
      return {
        pageStatus: 'add', // 页面默认添加 add ,edit
        setHeaders: {
          Authorization: `Bearer ${this.$store.state.token}`
        },
        ruleForm: {
          id: '',
          type: 1, // 数据类型
          title: '', // 标题
          name: '', // 名称
          alias: '', // 别称
          model: '', // 型号
          brand: '', // 品牌
          place: '', // 产地
          product: '', // 产品
          cooling_mode: '', // 冷却方式
          compressor: '', // 压缩机
          unit_category: '', // 机组类别
          purpose: '', // 用途
          refrigerating_capacity: '', // 制冷量
          heat_production: '', // 制热量
          refrigeration_power: '', // 制冷功率
          thermal_power: '', // 制热功率
          cop: '', // COP
          voltage_category: '', // 电压类别
          shape_size: '', // 外形尺寸
          transport_weight: '', // 运输重量
          operating_weight: '', // 运行重量
          noise: '', // 噪音
          air_volume: '', // 风量
          cooling_capacity: '', // 供冷量
          heat_supply: '', // 供热量
          static_pressure: '', // 静压
          motor_power: '', // 电机功率
          weight: '', // 重量
          tubes_num: '', // 排管数
          residual_pressure: '', // 余压
          working_condition: '' // 工况
        },
        rules: {},
        type_option: [
          {
            value: 1,
            label: '主机'
          }, {
            value: 2,
            label: '风机盘管'
          }, {
            value: 3,
            label: '空气处理机组'
          }
        ]
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
      }
    },
    methods: {
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = that.ruleForm
            console.log(form)
            let url = '/api/air/add'
            if (that.pageStatus === 'edit') {
              url = '/api/air/edit'
            }
            that.$axios.post(url, form).then(function (res) {
              if (res.status === 200 && res.data.code === 200) {
                that.$message({type: 'success', message: '保存成功'})
                that.$router.push({name: 'AirList'}) // 跳转列表页
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
