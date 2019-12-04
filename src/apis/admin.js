import { apiHelper } from './../utils/helpers'

export default {
  getIndex() {
    return apiHelper.get(`/admin/index`)
  },
  putStoreInfo({ name, description }) {
    return apiHelper.put(`/admin/index`, { name, description })
  }
}