import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Index from '@/components/Index'
import Login from '@/components/Login'

import UserAdd from '@/components/user/UserAdd'
import UserList from '@/components/user/UserList'
import UserRoleList from '@/components/user/UserRoleList'

import Password from '@/components/Password'

import RoleList from '@/components/role/RoleList'
import RoleAdd from '@/components/role/RoleAdd'
import RoleAccessList from '@/components/role/RoleAccessList'

import EleAccessList from '@/components/access/EleAccessList'
import MenuAccessList from '@/components/access/MenuAccessList'

import LoginLogList from '@/components/log/LoginLogList'
import HandleLogList from '@/components/log/HandleLogList'

import CouponAdd from '@/components/activity/CouponAdd'
import CouponList from '@/components/activity/CouponList'
import CouponUserList from '@/components/activity/CouponUserList'

Vue.use(Router)

let router = new Router({
  linkActiveClass: 'active',
  routes: [
    {path: '/login', name: 'Login', component: Login},
    {
      name: 'Main',
      path: '/',
      component: Main,
      children: [
        {path: 'index', name: 'Index', component: Index},
        {path: 'UserAdd', name: 'UserAdd', component: UserAdd}, // 用户添加
        {path: 'UserList', name: 'UserList', component: UserList}, // 用户列表
        {path: 'UserRoleList', name: 'UserRoleList', component: UserRoleList}, // 用户角色

        {path: 'RoleList', name: 'RoleList', component: RoleList}, // 角色列表
        {path: 'RoleAdd', name: 'RoleAdd', component: RoleAdd}, // 角色添加
        {path: 'RoleAccessList', name: 'RoleAccessList', component: RoleAccessList}, // 角色权限列表

        {path: 'MenuAccessList', name: 'MenuAccessList', component: MenuAccessList}, // 菜单权限列表
        {path: 'EleAccessList', name: 'EleAccessList', component: EleAccessList}, // 元素权限列表

        {path: 'LoginLogList', name: 'LoginLogList', component: LoginLogList}, // 登录日志
        {path: 'HandleLogList', name: 'HandleLogList', component: HandleLogList}, // 操作日志

        {path: 'CouponList', name: 'CouponList', component: CouponList}, // 优惠活动列表
        {path: 'CouponAdd', name: 'CouponAdd', component: CouponAdd}, // 优惠活动添加
        {path: 'CouponUserList', name: 'CouponUserList', component: CouponUserList}, // 用户领取优惠

        {path: 'Password', name: 'Password', component: Password} // 用户密码
      ]
    }
  ]
})

router.beforeEach(({name}, from, next) => {
  if (localStorage.getItem('token')) {
    if (name === 'Login') {
      next('/index')
    } else {
      next()
    }
  } else {
    if (name === 'Login') {
      next()
    } else {
      next({name: 'Login'})
    }
  }
})

export default router
