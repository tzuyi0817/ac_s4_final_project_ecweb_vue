import { apiHelper } from './../utils/helpers'

export default {
  // Index page
  getIndex() {
    return apiHelper.get(`/admin/index`)
  },
  putStoreInfo({ name, description }) {
    return apiHelper.put(`/admin/index`, { name, description })
  },

  // product page
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
  },

  // order page
  getOrderManagePage({ page, orderstatusid, paymentstatusid, shipmentstatusid, orderer }) {
    const searchParams = new URLSearchParams({ page, orderstatusid, paymentstatusid, shipmentstatusid, orderer })
    return apiHelper.get(`/admin/productmodel/order_mange?${searchParams.toString()}`)
  },
  getOrder({ orderId }) {
    return apiHelper.get(`/admin/productmodel/order_mange/${orderId}`, { orderId })
  },
  putOrderStatus({ orderId, memo, OrderStatusId }) {
    return apiHelper.put(`/admin/productmodel/order_mange/${orderId}/oderstatus`, { orderId, memo, OrderStatusId })
  },
  putPaymentStatus({ orderId, PaymentTypeId, PaymentStatusId }) {
    return apiHelper.put(`/admin/productmodel/order_mange/${orderId}/payment_status`, { orderId, PaymentTypeId, PaymentStatusId })
  },
  putShipmentStatus({ orderId, ShipmentStatusId, ShipmentTypeId, name, phone, address }) {
    return apiHelper.put(`/admin/productmodel/order_mange/${orderId}/shipment_status`, { orderId, ShipmentStatusId, ShipmentTypeId, name, phone, address })
  },

  // delivery notice
  getDeliveryNotice() {
    return apiHelper.get(`/admin/productmodel/deliveryNotice`)
  },
  deleteDeliveryNotice({ deliveryNoticeId }) {
    return apiHelper.delete(`/admin/productmodel/deliveryNotice/${deliveryNoticeId}`, { deliveryNoticeId })
  },

  // coupon
  getCouponManagePage() {
    return apiHelper.get(`/admin/coupon/managePage`)
  },
  getCouponEditPage({ couponId }) {
    return apiHelper.get(`/admin/coupon/managePage/${couponId}/edit`, { couponId })
  },
  postCouponEdit({ couponId, StoreId, couponTypeId, CouponDiscount, CouponDescription, available, expiredDate }) {
    return apiHelper.post(`/admin/coupon/edit`, { couponId, StoreId, couponTypeId, CouponDiscount, CouponDescription, available, expiredDate })
  },
  postCouponMake({ storeId, couponTypeId, CouponDiscount, CouponDescription, expiredDate }) {
    return apiHelper.post(`/admin/coupon/make`, { storeId, couponTypeId, CouponDiscount, CouponDescription, expiredDate })
  },

  // track code
  getTrackCodePage() {
    return apiHelper.get(`/admin/marketingmodel/track_code`)
  },
  putGaTrackCode({ storeId, trackGA }) {
    return apiHelper.put(`/admin/marketingmodel/track_code/ga_trackcode`, { storeId, trackGA })
  }
}