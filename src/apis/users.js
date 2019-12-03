import { apiHelper } from './../utils/helpers'

export default {
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`)
  },
  getUserProfile({ userId }) {
    return apiHelper.get(`/user/${userId}/profile`, { userId })
  },
  getUserProfileEdit({ userId }) {
    return apiHelper.get(`/user/${userId}/editProfile`, { userId })
  },
  postUserProfile({ userId, formData }) {
    return apiHelper.post(`/user/${userId}/edit`, formData)
  }
}