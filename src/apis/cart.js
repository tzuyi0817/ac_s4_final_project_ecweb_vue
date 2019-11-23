import { apiHelper } from './../utils/helpers'

export default {
  postCart({ productId, quantity }) {
    return apiHelper.post(`/cart`, { productId, quantity })
  },
  getCart({ couponId }) {
    if (couponId) {
      const searchParams = new URLSearchParams({ couponId })
      return apiHelper.get(`/cart?${searchParams.toString()}`)
    }
    return apiHelper.get(`/cart`)
  },
  addCartItem({ cartItemId }) {
    return apiHelper.post(`/cartItem/${cartItemId}/add`, { cartItemId })
  },
  subCartItem({ cartItemId }) {
    return apiHelper.post(`/cartItem/${cartItemId}/sub`, { cartItemId })
  },
  deleteCartItem({ cartItemId }) {
    return apiHelper.delete(`/cartItem/${cartItemId}`, { cartItemId })
  },
}