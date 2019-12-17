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
}