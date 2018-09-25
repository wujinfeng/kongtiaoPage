<template>
  <el-container direction="vertical" style="height: 100%;">
    <TopHeader/>
    <el-container>
      <LeftMenu/>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import TopHeader from '@/components/TopHeader.vue'
  import LeftMenu from '@/components/LeftMenu.vue'

  export default {
    name: 'Main',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    },
    data() {
      return {
        name: ''
      }
    },
    components: {
      TopHeader, LeftMenu
    }
  }
</script>

<style>

</style>
