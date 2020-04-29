<template>
  <div class="container mb-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- 購物車流程 Navbar -->
      <div class="cart-box row">
        <div class="row step col-12">
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

      <!-- 購物車明細 -->
      <div class="cartNav row text-white col-12 mt-3">
        <h3>&nbsp;購物車明細</h3>
      </div>

      <CartItems v-if="this.items.length > 0" :items="items" />

      <template v-else>
        <div class="alert mt-3 col-12" role="alert">您的購物車是空的!!</div>
        <router-link to="/" class="btn btn-success shopping-btn mt-1 col-12">繼續購物</router-link>
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

          <div @click.prevent.stop="handlePrompt">
            <router-link to="/users/logIn?redirect=cart" class="btn btn-success mt-4">前往選擇付款及運送方式</router-link>
          </div>
        </template>

        <!-- 已登入 -->
        <template v-else>
          <p class="col">&nbsp;</p>

          <!-- 使用折價券 -->
          <router-link
            v-if="coupon"
            class="btn btn-success mt-4"
            :to="{name: 'CouponOrder', params: { id: coupon.id }}"
          >前往選擇付款及運送方式</router-link>

          <!-- 未使用折價券 -->
          <router-link v-else to="/orderEdit" class="btn btn-success mt-4">前往選擇付款及運送方式</router-link>
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
      isLoading: false
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
        this.isLoading = true;

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
    },
    handlePrompt() {
      Toast.fire({
        type: "warning",
        title: "請先登入會員，即可繼續後續購物流程"
      });
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

.cart-box {
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.step-by-step {
  padding: 10px 16px;
  margin-bottom: 18px;
  font-size: 18px;
}

.arrow {
  font-size: 40px;
  @include respond-and(768px) {
    padding: 0;
    margin-left: 5px;
  }
}

.cartNav {
  border-radius: 10px;
  padding: 20px;
  margin-left: 0;
  background-color: #0085a5;
  @include respond-and(768px) {
    padding: 10px;
  }
}

.alert {
  text-align: center;
  font-size: 16px;
  padding: 35px;
  border: 10px solid white;
  background-color: #e5ebec;
  border-radius: 15px;
  margin-bottom: 0px;
}

.btn-success {
  margin: 20px 10px 5px 0;
}

.shopping-btn {
  margin: 0;
  border: 10px solid white;
  border-radius: 15px;
}
</style>