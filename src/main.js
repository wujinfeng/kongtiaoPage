// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/css/normalize.css'
import '@/assets/css/main.css'
import Vue from 'vue'
import store from './store'
import axios from './http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import DatePicker from '@/components/DatePicker'
import Pagination from '@/components/Pagination.vue'

Vue.use(ElementUI, {size: 'small'})

Vue.component('date-picker', DatePicker)
Vue.component('pagination', Pagination)

Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
