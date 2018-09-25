<template>
  <el-aside width="200px">
    <el-menu router unique-opened  :default-active="this.$router.path">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>空调管理</template>
        <el-menu-item :route="{name: 'AirList'}" index="1-1">空调列表</el-menu-item>
        <el-menu-item :route="{name: 'AirAdd'}" index="1-2">空调添加</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>资讯管理</template>
        <el-menu-item :route="{name: 'NewsList'}" index="2-1">资讯列表</el-menu-item>
        <el-menu-item :route="{name: 'NewsAdd'}" index="2-3">资讯添加</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>品牌管理</template>
        <el-menu-item :route="{name: 'BrandList'}" index="3-1">品牌列表</el-menu-item>
        <el-menu-item :route="{name: 'BrandAdd'}" index="3-2">品牌添加</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-goods"></i>链接管理</template>
        <el-menu-item :route="{name: 'LinkList'}" index="4-1">链接列表</el-menu-item>
        <el-menu-item :route="{name: 'LinkAdd'}" index="4-2">链接添加</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-news"></i>用户管理</template>
        <el-menu-item :route="{name: 'UserList'}" index="5-1">用户列表</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-view"></i>留言管理</template>
        <el-menu-item :route="{name: 'MessageList'}" index="6-1">留言列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    name: 'LeftMenu',
    data() {
      return {
        menus: []
      }
    },
    mounted() {
      let that = this
      that.$axios.get('/admin/roleAccess/myMenu').then(function (res) {
        if (res.status === 200 && res.data.code === 200) {
          that.menus = res.data.data
          console.log('menus', that.menus)
        } else {
          that.menus = []
        }
      }).catch(function (err) {
        that.menus = []
        console.log('myMenu err:')
        console.log(err)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
