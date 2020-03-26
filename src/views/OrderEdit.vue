<template>
  <div class="container mb-4">
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- 購物車流程 Navbar -->
      <div class="row justify-content-center mt-3">
        <div class="col-12 col-md-8">
          <div class="row step">
            <div class="col-3 text-center">
              <span class="step-by-step bg-secondary rounded-pill text-dark d-inline-block">Step 1</span>
              <p class="step-text text-dark">確認購物車</p>
            </div>

            <div class="arrow col-1">
              <i class="fas fa-long-arrow-alt-right"></i>
            </div>

            <div class="col-3 text-center step-point-line step-point">
              <span
                class="step-by-step border bg-dark rounded-pill text-light d-inline-block"
              >Step 2</span>
              <p class="step-text text-dark">付款與運送方式</p>
            </div>

            <div class="arrow col-1" style="color: gray">
              <i class="fas fa-long-arrow-alt-right"></i>
            </div>

            <div class="col-3 text-center">
              <span
                class="step-by-step border bg-secondary rounded-pill text-dark d-inline-block"
              >Step 3</span>
              <p class="step-text text-dark">成立訂單</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 訂單明細 -->
      <div class="orderNav row text-white mt-3 col-12" style="padding: 8px;">
        <h1>&nbsp;訂單明細</h1>
      </div>

      <OrderItems v-if="this.items.length > 0" :items="items" />

      <!-- 訂單總金額 -->
      <CartAmount :total-price="totalPrice" :shipping-fee="shippingFee" :subtotal="subtotal" />

      <!-- 選擇付款與運送方式 -->
      <SelectPaymentTransport
        :user="user"
        :cart="cart"
        :total-price="totalPrice"
        :couponId="couponId"
      />
    </template>
  </div>
</template>

<script>
import OrderItems from "./../components/OrderItems";
import CartAmount from "./../components/CartAmount";
import SelectPaymentTransport from "./../components/SelectPaymentTransport";
import Spinner from "./../components/Spinner";
import orderAPI from "./../apis/orders";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    OrderItems,
    CartAmount,
    SelectPaymentTransport,
    Spinner
  },
  data() {
    return {
      cart: {
        id: -1
      },
      totalPrice: -1,
      shippingFee: -1,
      subtotal: -1,
      items: [],
      user: {},
      couponId: 0,
      isLoading: true
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  created() {
    this.fetchOrder();
  },
  methods: {
    async fetchOrder() {
      try {
        const { data, statusText } = await orderAPI.getOrder();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.cart = data.cart;
        this.items = data.cart.items;
        this.totalPrice = data.totalPrice;
        this.shippingFee = data.shippingFee;
        this.subtotal = data.subtotal;
        this.user = data.user;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得訂單資料，請稍後再試"
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
  }
}

.step-by-step {
  padding: 10px 16px;
  margin-bottom: 18px;
}

.arrow {
  font-size: 40px;
  @include respond-and(768px, 30px);
}

.orderNav {
  border-radius: 10px;
  background-color: #0085a5;
}

hr {
  border: 0;
  border-top: 2px solid rgb(212, 210, 210);
}

h1 {
  @include respond-between(960px, 1100px, 30px);
  @include respond-between(768px, 960px, 25px);
  @include respond-and(768px, 20px);
}

p,
span,
.alert,
.btn {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px, 10px);
}

.step {
  @media screen and (max-width: 768px) {
    margin-top: 50px;
  }
}
</style>
