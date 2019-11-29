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
  spgatewayCallback({ MerchantID, TradeInfo, TradeSha, Version }) {
    return apiHelper.post(`/spgateway/callback`, { MerchantID, TradeInfo, TradeSha, Version })
  }
}