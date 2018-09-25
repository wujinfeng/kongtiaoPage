import axios from 'axios'
import store from './store'
import * as types from './store/mutations-types'
import router from './router'

// axios 配置
axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'http://127.0.0.1:3022'
axios.defaults.withCredentials = true

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.log(error.response.status)
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)
          router.push({name: 'Login'})
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  })

export default axios
