import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      StoreId: '',
      role: '',
      name: '',
      email: '',
      address: '',
      password: '',
      emailVerf: false,
      resetPasswordToken: '',
      resetPasswordExpires: '',
      image: ''
    },
    isAuthenticated: false,
    token: '',
    cartItemNumber: 0
  },
  mutations: {
    setCartItemNumber(state, number) {
      const cartItemNumber = state.cartItemNumber
      if (cartItemNumber + number < 0) return state.cartItemNumber = 0
      return state.cartItemNumber += number
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者驗證用的 token 儲存在 state 中
      state.token = localStorage.getItem('token')
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      // 登出時，清空 state 中的 token
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        // 呼叫 usersAPI.getCurrentUser() 方法，並將 response 顯示出來
        const { data, statusText } = await usersAPI.getCurrentUser()

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        commit('setCurrentUser', {
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.image,
          role: data.role
        })
        return true
      } catch (error) {
        commit('revokeAuthentication')
        return false
      }
    }
  }
})
