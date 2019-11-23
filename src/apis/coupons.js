import { apiHelper } from './../utils/helpers'

export default {
  checkCoupon({ couponCode }) {
    return apiHelper.post(`/checkCoupon`, { couponCode })
  },
}

