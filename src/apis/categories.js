import { apiHelper } from './../utils/helpers'

export default {
  getCategories() {
    return apiHelper.get(`/index`)
  },
  getCategory({ categoryId, key, value, page }) {
    const searchParams = new URLSearchParams({ key, value, page })
    return apiHelper.get(`/Category/${categoryId}?${searchParams.toString()}`)
  }
}