import { apiHelper } from './../utils/helpers'

export default {
  getOrder() {
    return apiHelper.get(`/orderEdit`)
  },
  postOrder({
    amount,
    UserId,
    StoreId,
    name,
    address,
    phone,
    shipmentType,
    paymentType,
    cartId,
    couponId
  }) {
    return apiHelper.post(`/order`, {
      amount,
      UserId,
      StoreId,
      name,
      address,
      phone,
      shipmentType,
      paymentType,
      cartId,
      couponId
    })
  },
  getOrderSuccess({ orderId }) {
    return apiHelper.get(`/order/${orderId}/success`, { orderId })
  },
  getPayment({ orderId }) {
    return apiHelper.get(`/order/${orderId}/payment`, { orderId })
  },
  getBranchSelection({ orderId }) {
    return apiHelper.get(`/order/${orderId}/branchselection`, { orderId })
  },
  cancelOrder({ orderId }) {
    return apiHelper.post(`/order/${orderId}`, { orderId })
  }
}