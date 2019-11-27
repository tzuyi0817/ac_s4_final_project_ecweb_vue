import { apiHelper } from './../utils/helpers'

export default {
  checkCoupon({ couponCode }) {
    return apiHelper.post(`/checkCoupon`, { couponCode })
  },
  getCouponOrderEdit({ couponId }) {
    return apiHelper.get(`/couponOrder/${couponId}`, { couponId })
  }
}

