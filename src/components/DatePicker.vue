<template>
  <div class="block">
    <el-date-picker
      v-model="value"
      type="date"
      :editable=false
      :format="yyyy-MM-dd"
      :value-format="yyyy-MM-dd"
      placeholder="选择日期"
      :picker-options="pickerOptions0">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        value: ''
      }
    },
    methods: {
      getDate(val) {
        this.$emit('datePick', val)
      }
    }
  }
</script>
<style scoped>
  .block {
    display: inline-block;
  }

</style>
