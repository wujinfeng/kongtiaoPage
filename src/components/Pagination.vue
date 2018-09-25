<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: ['totalNum'],
    methods: {
      handleSizeChange(val) {
        console.log(`每页${val}条`)
        this.pageSize = val
        this.$emit('getPageData', {currentPage: this.currentPage, pageSize: val})
      },
      handleCurrentChange(val) {
        console.log(`当前页：${val}`)
        this.currentPage = val
        this.$emit('getPageData', {currentPage: val, pageSize: this.pageSize})
      }
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 10
      }
    }
  }
</script>

<style scoped>
  .block {
    float: right;
    margin-top: 20px;
  }
</style>
