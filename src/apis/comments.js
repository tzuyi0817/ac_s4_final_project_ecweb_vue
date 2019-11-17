import { apiHelper } from './../utils/helpers'

export default {
  deleteComment({ ProductId, commentId }) {
    return apiHelper.delete(`/product/${ProductId}/rate/${commentId}`)
  },
  createComment({ ProductId, comment, rating }) {
    return apiHelper.post(`/product/${ProductId}/rate`, { ProductId, comment, rating })
  },
}