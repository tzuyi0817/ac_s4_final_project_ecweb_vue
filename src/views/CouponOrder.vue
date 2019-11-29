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
      <div class="orderNav row text-white mt-3" style="padding: 8px;">
        <h1>&nbsp;訂單明細</h1>
      </div>

      <OrderItems v-if="this.items.length > 0" :items="items" />

      <!-- 訂單總金額 -->
      <CartAmount
        :total-price="totalPrice"
        :shipping-fee="shippingFee"
        :subtotal="subtotal"
        :coupon="coupon"
      />

      <!-- 選擇付款與運送方式 -->
      <SelectPaymentTransport
        :user="user"
        :cart="cart"
        :total-price="totalPrice"
        :couponId="coupon.id"
      />
    </template>
  </div>
</template>

<script>
import OrderItems from "./../components/OrderItems";
import CartAmount from "./../components/CartAmount";
import SelectPaymentTransport from "./../components/SelectPaymentTransport";
import Spinner from "./../components/Spinner";
import couponAPI from "./../apis/coupons";
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
      coupon: {},
      isLoading: true
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const { id: couponId } = to.params;
    this.fetchOrder({ couponId });
    next();
  },
  created() {
    const { id: couponId } = this.$route.params;
    this.fetchOrder({ couponId });
  },
  methods: {
    async fetchOrder({ couponId }) {
      try {
        const { data, statusText } = await couponAPI.getCouponOrderEdit({
          couponId
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.cart = data.cart;
        this.items = data.cart.items;
        this.totalPrice = data.totalPrice;
        this.shippingFee = data.shippingFee;
        this.subtotal = data.subtotal;
        this.user = data.user;
        this.coupon = data.coupon;

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

<style scoped>
.container {
  font-family: "DFKai-sb";
}

.step-by-step {
  padding: 10px 16px;
  margin-bottom: 18px;
}

.arrow {
  font-size: 40px;
}

.orderNav {
  border-radius: 10px;
  background-color: #0085a5;
}

hr {
  border: 0;
  border-top: 2px solid rgb(212, 210, 210);
}
</style>