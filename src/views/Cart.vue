<template>
  <div class="container mb-4">
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- 購物車流程 Navbar -->
      <div class="row justify-content-center mt-3">
        <div class="col-12 col-md-8">
          <div class="row step">
            <div class="col-3 text-center step-point-line step-point">
              <span class="step-by-step bg-dark rounded-pill text-light d-inline-block">Step 1</span>
              <p class="step-text text-dark">確認購物車</p>
            </div>

            <div class="arrow col-1">
              <i class="fas fa-long-arrow-alt-right"></i>
            </div>

            <div class="col-3 text-center">
              <span
                class="step-by-step border bg-secondary rounded-pill text-dark d-inline-block"
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

      <!-- 購物車明細 -->
      <div class="cartNav row text-white mt-3" style="padding: 8px;">
        <h1>&nbsp;購物車明細</h1>
      </div>

      <CartItems v-if="this.items.length > 0" :items="items" />

      <template v-else>
        <div class="alert alert-secondary mt-3" role="alert">您的購物車是空的!!</div>
        <div class="row">
          <p class="col">&nbsp;</p>
          <router-link to="/" class="btn btn-primary mt-5">繼續購物</router-link>
        </div>
      </template>

      <!-- 折價券使用 -->
      <UseCoupon v-if="this.items.length > 0" :total-price="totalPrice" />

      <hr v-if="this.items.length > 0" />

      <!-- 購物車總金額 -->
      <CartAmount
        v-if="this.items.length > 0"
        :coupon="coupon"
        :total-price="totalPrice"
        :shipping-fee="shippingFee"
        :subtotal="subtotal"
      />

      <div class="row mb-5" v-if="this.items.length > 0">
        <!-- 未登入 -->
        <template v-if="!isAuthenticated">
          <p class="col">&nbsp;</p>
          <router-link to="/users/logIn?redirect=cart" class="btn btn-select mt-4">前往選擇付款及運送方式</router-link>
        </template>

        <!-- 已登入 -->
        <template v-else>
          <p class="col">&nbsp;</p>

          <!-- 使用折價券 -->
          <router-link
            v-if="coupon"
            class="btn btn-select mt-4"
            :to="{name: 'CouponOrder', params: { id: coupon.id }}"
          >前往選擇付款及運送方式</router-link>

          <!-- 未使用折價券 -->
          <router-link v-else to="/orderEdit" class="btn btn-select mt-4">前往選擇付款及運送方式</router-link>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import CartItems from "./../components/CartItems";
import UseCoupon from "./../components/UseCoupon";
import CartAmount from "./../components/CartAmount";
import cartAPI from "./../apis/cart";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    CartItems,
    UseCoupon,
    CartAmount,
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
      coupon: {},
      isLoading: true
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const { couponId } = to.query;
    this.fetchCart({ couponId });
    next();
  },
  created() {
    const { couponId } = this.$route.query;
    this.fetchCart({ couponId });
  },
  methods: {
    async fetchCart({ couponId }) {
      try {
        const { data, statusText } = await cartAPI.getCart({ couponId });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.cart = data.cart;
        this.items = data.cart.items;
        this.totalPrice = data.totalPrice;
        this.shippingFee = data.shippingFee;
        this.subtotal = data.subtotal;
        this.coupon = data.coupon;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得購物車資料，請稍後再試"
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

.cartNav {
  border-radius: 10px;
  background-color: #0085a5;
}

hr {
  border: 0;
  border-top: 2px solid rgb(212, 210, 210);
}

.btn-primary,
.btn-select {
  float: right;
  background-color: #0085a5;
  color: white;
}

.btn-primary:hover {
  background-color: #0c99bd;
}

.btn-select:hover {
  background-color: #0c99bd;
}
</style>