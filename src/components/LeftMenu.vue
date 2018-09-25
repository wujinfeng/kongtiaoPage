<template>
  <el-aside width="200px">
    <el-menu router unique-opened :default-active="this.$router.path">
      <template v-for="item in menus">
          <template v-if="item.isLeaf===2">
            <!--父节点-->
            <el-submenu  :index="item.id.toString()" :key="item.id">
              <template slot="title"><i :class="item.icon"></i>{{item.menuName}}</template>

              <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.url" v-if="subItem.isLeaf===1">{{ subItem.menuName}}</el-menu-item>

              <el-submenu v-for="(subItem,i) in item.children" :key="i" :index="subItem.id.toString()"  v-if="subItem.isLeaf===2">
                <template slot="title"><i :class="item.icon"></i>{{ subItem.menuName}}</template>
                <el-menu-item v-for="(data,n) in subItem.children" :key="n" :index="data.url">{{data.name}}</el-menu-item>
              </el-submenu>
            </el-submenu>
          </template>
          <template v-else>
            <!--叶子节点-->
            <el-menu-item :index="item.url" :key="item.id" >{{item.menuName}}</el-menu-item>
          </template>
      </template>

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
