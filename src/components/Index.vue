<template>
  <div class="welcome">
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        msg: '登录成功！' + new Date().toLocaleString()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2, h3 {
    font-weight: normal;
  }
</style>
