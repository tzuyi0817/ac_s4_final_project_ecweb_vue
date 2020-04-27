<template>
  <div class="container mb-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- 購物車流程 Navbar -->
      <div class="order-box row">
        <div class="row step col-12">
          <div class="col-3 text-center">
            <span class="step-by-step bg-secondary rounded-pill text-dark d-inline-block">Step 1</span>
            <p class="step-text text-dark">確認購物車</p>
          </div>

          <div class="arrow col-1">
            <i class="fas fa-long-arrow-alt-right"></i>
          </div>

          <div class="col-3 text-center step-point-line step-point">
            <span class="step-by-step border bg-dark rounded-pill text-light d-inline-block">Step 2</span>
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

      <!-- 訂單明細 -->
      <div class="orderNav row text-white mt-3 col-12">
        <h3>&nbsp;訂單明細</h3>
      </div>

      <OrderItems v-if="this.items.length > 0" :items="items" />

      <hr />

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
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.order-box {
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

.orderNav {
  border-radius: 10px;
  padding: 20px;
  margin-left: 0;
  background-color: #0085a5;
  @include respond-and(768px) {
    padding: 10px;
  }
}
</style>
