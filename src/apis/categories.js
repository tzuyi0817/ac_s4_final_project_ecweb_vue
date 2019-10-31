import { apiHelper } from './../utils/helpers'

export default {
  getCategories() {
    return apiHelper.get(`/index`)
  },
  getCategory({ categoryId, key, value, page }) {
    const searchParams = new URLSearchParams({ key, value, page })
    return apiHelper.get(`/Category/${categoryId}?${searchParams.toString()}`)
  },
  getSearch({ keyword, key, value, page }) {
    const searchParams = new URLSearchParams({ keyword, key, value, page })
    return apiHelper.get(`/ESHOP/search?${searchParams.toString()}`)
  }
}