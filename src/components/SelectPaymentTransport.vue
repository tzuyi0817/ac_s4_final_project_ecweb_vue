<template>
  <div class="mt-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="orderNav col-12 mt-3">
        <h3 class="d-inline text-white">&nbsp;選擇您的付款與運送方式&nbsp;</h3>
      </div>

      <div class="row">
        <div class="col-lg-7">
          <div class="mt-5">
            <h4>購買人資訊：</h4>

            <div class="form_group row mt-5">
              <label class="col-2">名字:</label>
              <div class="col-10">
                <input v-model="user.name" type="text" class="form-control" name="name" required />
              </div>
            </div>

            <div class="form-group row mt-4">
              <label class="col-2">電話:</label>
              <div class="col-10">
                <input v-model="user.phone" type="tel" class="form-control" name="phone" required />
              </div>
            </div>

            <div class="form-group row mt-4">
              <label class="col-2">地址:</label>
              <div class="col-10">
                <textarea
                  v-model="user.address"
                  type="address"
                  class="form-control"
                  name="address"
                  rows="5"
                  required
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="mt-5">
            <h4>運送與付款方式：</h4>

            <div class="form-group mt-5">
              <label class="col-md-5">運送方式:</label>
              <div class="col-md-10 mt-3">
                <!--value為對應的id-->
                <label class="radio-inline">
                  <input
                    v-model="shipmentType"
                    class="home"
                    type="radio"
                    name="shipmentType"
                    value="1"
                  />&nbsp;宅配
                </label>

                <label class="radio-inline">
                  <input
                    v-model="shipmentType"
                    class="pick-up"
                    type="radio"
                    name="shipmentType"
                    value="2"
                  />&nbsp;超商取貨
                </label>
              </div>
            </div>

            <div class="form-group mt-5">
              <label class="col-md-5">付款方式:</label>
              <div class="col-md-10 mt-3">
                <label
                  v-if="this.shipmentType === this.creditCard"
                  id="payment"
                  class="radio-inline"
                >
                  <input
                    v-model="paymentType"
                    class="payment"
                    type="radio"
                    name="paymentType"
                    value="2"
                    disabled
                  />&nbsp;線上支付
                </label>

                <label v-else id="payment" class="radio-inline">
                  <input
                    v-model="paymentType"
                    class="payment"
                    type="radio"
                    name="paymentType"
                    value="1"
                  />&nbsp;線上支付
                </label>

                <label class="radio-inline ml-3">
                  <input v-model="paymentType" type="radio" name="paymentType" value="2" />&nbsp;貨到付款
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group mt-4 row">
        <p class="col">&nbsp;</p>
        <input type="hidden" name="cartId" :value="cart.id" />
        <!--先將cardId儲存起來-->
        <input type="hidden" name="amount" :value="totalPrice" />
        <!--先將totalPrice儲存起來-->
        <input v-if="couponId" type="hidden" name="couponId" :value="couponId" />
        <input type="hidden" name="shipping_status" value="0" />
        <input type="hidden" name="payment_status" value="0" />
        <input type="hidden" name="StoreId" :value="user.StoreId" />
        <button type="submit" class="btn btn-success" :disabled="isProcessing">前往結帳</button>
      </div>
    </form>
  </div>
</template>

<script>
import orderAPI from "./../apis/orders";
import { Toast } from "./../utils/helpers";

export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    cart: {
      type: Object,
      required: true
    },
    totalPrice: {
      type: Number,
      default: -1
    },
    couponId: {
      type: Number
    }
  },
  data() {
    return {
      name: "",
      phone: "",
      address: "",
      shipmentType: -1,
      paymentType: -1,
      creditCard: "2",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true;

        const { data, statusText } = await orderAPI.postOrder({
          amount: this.totalPrice,
          StoreId: this.user.StoreId,
          name: this.user.name,
          address: this.user.address,
          phone: this.user.phone,
          shipmentType: this.shipmentType,
          paymentType: this.paymentType,
          cartId: this.cart.id,
          couponId: this.couponId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.isProcessing = false;
        localStorage.setItem("cartItemNumber", 0);
        this.$store.commit("setCartItemNumber");

        Toast.fire({
          type: "success",
          title: "已成功建立訂單"
        });

        if (this.paymentType === "1") {
          this.$router.push(`order/${data.order.id}/payment`);
        } else if (this.shipmentType === "2") {
          this.$router.push(`order/${data.order.id}/branchselection`);
        } else this.$router.push(`order/${data.order.id}/success`);
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          type: "error",
          title: "無法建立訂單，請稍後再試"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.orderNav {
  border-radius: 10px;
  padding: 20px;
  margin-left: 0;
  background-color: #0085a5;
  @include respond-and(768px) {
    padding: 10px;
  }
}

label,
input,
textarea,
.btn {
  font-size: 16px;
}

.pick-up {
  margin-left: 48px;
}

.btn-success {
  margin: 20px 10px 5px 0;
}
</style>