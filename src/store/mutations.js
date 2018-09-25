// 函数必须都是同步的
import * as types from './mutations-types'

const mutations = {
  [types.LOGIN] (state, params) {
    localStorage.setItem('id', params.id)
    localStorage.setItem('username', params.username)
    localStorage.setItem('token', params.token)
    state.id = params.id
    state.name = params.name
    state.token = params.token
  },
  [types.LOGOUT] (state) {
    localStorage.removeItem('id')
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    state.id = ''
    state.name = ''
    state.mobile = ''
    state.token = ''
  }
}

export default mutations
