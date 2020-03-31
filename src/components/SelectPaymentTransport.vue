<template>
  <div class="mt-5">
    <form @submit.stop.prevent="handleSubmit">
      <h1 class="orderNav d-inline text-white mt-3 mb-3">&nbsp;選擇您的付款與運送方式&nbsp;</h1>

      <div class="row">
        <div class="col-md-7">
          <div class="mt-5">
            <h4>購買人資訊：</h4>

            <div class="form_group row mt-5">
              <label class="col-2">名字:</label>
              <div class="col-9">
                <input v-model="user.name" type="text" class="form-control" name="name" required />
              </div>
            </div>

            <div class="form-group row mt-4">
              <label class="col-2">電話:</label>
              <div class="col-9">
                <input v-model="user.phone" type="tel" class="form-control" name="phone" required />
              </div>
            </div>

            <div class="form-group row mt-4">
              <label class="col-2">地址:</label>
              <div class="col-9">
                <textarea
                  v-model="user.address"
                  type="address"
                  class="form-control"
                  name="address"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-5">
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

                <label class="radio-inline ml-5">
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
        <button type="submit" class="btn btn-primary" :disabled="isProcessing">前往結帳</button>
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
@mixin respond-between($lower, $upper, $font-size) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    font-size: $font-size;
  }
}

@mixin respond-and($upper, $font-size) {
  @media screen and (max-width: $upper) {
    font-size: $font-size;
    @content;
  }
}

.orderNav {
  border-radius: 10px;
  background-color: #0085a5;
  padding: 10px;
}

.btn-primary {
  float: right;
  background-color: #0085a5;
  color: white;
  &:hover {
    background-color: #0c99bd;
  }
}

h1 {
  @include respond-between(960px, 1100px, 30px);
  @include respond-between(768px, 960px, 25px);
  @include respond-and(768px, 20px) {
    margin-left: -30px;
  }
}

h4 {
  @include respond-between(960px, 1100px, 20px);
  @include respond-between(768px, 960px, 15px);
  @include respond-and(768px, 15px);
}

label,
input,
textarea,
.btn {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px, 10px);
}

.pick-up {
  @media screen and (max-width: 768px) {
    margin-left: -20px;
  }
}
</style>