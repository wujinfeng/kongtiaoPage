<template>
  <router-view></router-view>
</template>

<script>
  import * as types from '@/store/mutations-types'

  export default {
    name: 'App',
    created() {
      // 页面刷新时，重新赋值token
      if (window.localStorage.getItem('token')) {
        let data = {
          id: localStorage.getItem('id'),
          username: localStorage.getItem('username'),
          token: localStorage.getItem('token')
        }
        console.log('router,刷新', data)
        this.$store.commit(types.LOGIN, data)
      }
    }
  }
</script>
