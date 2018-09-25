import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

// 当前运行模式
const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: debug, // 设置运行模式
  plugin: debug ? [createLogger()] : [] // 调试模式则加入日志插件
})

export default store
