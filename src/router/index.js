import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Password from '@/components/Password'

import AirAdd from '@/components/air/AirAdd'
import AirList from '@/components/air/AirList'

import BrandList from '@/components/brand/BrandList'
import BrandAdd from '@/components/brand/BrandAdd'

import LinkList from '@/components/link/LinkList'
import LinkAdd from '@/components/link/LinkAdd'

import NewsList from '@/components/news/NewsList'
import NewsAdd from '@/components/news/NewsAdd'

import MessageList from '@/components/message/MessageList'
import UserList from '@/components/user/UserList'

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
        {path: 'AirAdd', name: 'AirAdd', component: AirAdd}, // 空调添加
        {path: 'AirList', name: 'AirList', component: AirList}, // 空调列表

        {path: 'BrandList', name: 'BrandList', component: BrandList}, // 品牌列表
        {path: 'BrandAdd', name: 'BrandAdd', component: BrandAdd}, // 品牌添加

        {path: 'LinkList', name: 'LinkList', component: LinkList}, // 链接列表
        {path: 'LinkAdd', name: 'LinkAdd', component: LinkAdd}, // 链接添加

        {path: 'NewsList', name: 'NewsList', component: NewsList}, // 资讯列表
        {path: 'NewsAdd', name: 'NewsAdd', component: NewsAdd}, // 资讯添加

        {path: 'MessageList', name: 'MessageList', component: MessageList}, // 留言列表
        {path: 'UserList', name: 'UserList', component: UserList}, // 用户列表

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
