import { apiHelper } from './../utils/helpers'

export default {
  // Index
  getIndex() {
    return apiHelper.get(`/admin/index`)
  },

  // product
  putStoreInfo({ name, description }) {
    return apiHelper.put(`/admin/index`, { name, description })
  },
  getProductManagePage({ page, launched }) {
    const searchParams = new URLSearchParams({ page, launched })
    return apiHelper.get(`/admin/productmodel/product_mange?${searchParams.toString()}`)
  },
  putProductLaunched({ productId, launched }) {
    return apiHelper.put(`/admin/productmodel/update?productId=${productId}&launched=${launched}`, { productId, launched })
  },
  deleteProduct({ productId }) {
    return apiHelper.delete(`/admin/productmodel/delete/${productId}`, { productId })
  },
  getProduct({ productId }) {
    return apiHelper.get(`/admin/productmodel/update/${productId}`, { productId })
  },
  putProduct({ productId, formData }) {
    return apiHelper.put(`/admin/productmodel/update/${productId}`, formData)
  },
  getProductCreatePage() {
    return apiHelper.get(`/admin/productmodel/create`)
  },
  postProduct({ formData }) {
    return apiHelper.post(`/admin/productmodel/create`, formData)
  }
}