import { apiHelper } from './../utils/helpers'

export default {
  postDeliveryNotice({ ProductId, email, email_confirm }) {
    return apiHelper.post(`/product/${ProductId}/deliveryNotice`, { ProductId, email, email_confirm })
  }
}