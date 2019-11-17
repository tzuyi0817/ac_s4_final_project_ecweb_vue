import { apiHelper } from './../utils/helpers'

export default {
  // 帶入需要的參數
  logIn({ email, password, redirectUrl }) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.post('/users/logIn', {
      email,
      password,
      redirectUrl
    })
  },
  signUp({ name, email, password, password_confirm }) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.post('/users/signUp', {
      name,
      email,
      password,
      password_confirm
    })
  }
}