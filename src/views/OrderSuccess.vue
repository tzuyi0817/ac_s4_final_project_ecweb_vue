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

            <div class="col-3 text-center">
              <span
                class="step-by-step border bg-secondary rounded-pill text-dark d-inline-block"
              >Step 2</span>
              <p class="step-text text-dark">付款與運送方式</p>
            </div>

            <div class="arrow col-1" style="color: gray">
              <i class="fas fa-long-arrow-alt-right"></i>
            </div>

            <div class="col-3 text-center step-point-line step-point">
              <span
                class="step-by-step border bg-dark rounded-pill text-light d-inline-block"
              >Step 3</span>
              <p class="step-text text-dark">成立訂單</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 訂單詳情 -->
      <OrderDetails
        :items="items"
        :origin-amount="originAmount"
        :shipping-fee="shippingFee"
        :subtotal="subtotal"
        :order="order"
        :payment-type="paymentType"
        :payment-status="paymentStatus"
        :shipment-type="shipmentType"
        :shipment-status="shipmentStatus"
        :shipment-convenience-store="shipmentConvenienceStore"
      />

      <router-link to="/" class="btn btn-primary mt-3 col-12">繼續購物</router-link>
    </template>
  </div>
</template>

<script>
import OrderDetails from "./../components/OrderDetails";
import orderAPI from "./../apis/orders";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    OrderDetails,
    Spinner
  },
  data() {
    return {
      order: {},
      items: [],
      paymentType: [],
      paymentStatus: [],
      shipmentType: [],
      shipmentStatus: [],
      shipmentConvenienceStore: [],
      originAmount: -1,
      shippingFee: -1,
      subtotal: -1,
      isLoading: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const { id: orderId } = to.params;
    this.fetchOrder({ orderId });
    next();
  },
  created() {
    const { id: orderId } = this.$route.params;
    this.fetchOrder({ orderId });
  },
  methods: {
    async fetchOrder({ orderId }) {
      try {
        this.isLoading = true;

        const { data, statusText } = await orderAPI.getOrderSuccess({
          orderId
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.order = data.order;
        this.items = data.order.items;
        this.paymentType = data.order.PaymentType;
        this.paymentStatus = data.order.PaymentStatus;
        this.shipmentType = data.order.ShipmentType;
        this.shipmentStatus = data.order.ShipmentStatus;
        this.shipmentConvenienceStore = data.order.ShipmentConvenienceStore;
        this.originAmount = data.originAmount;
        this.shippingFee = data.shippingFee;
        this.subtotal = data.subtotal;

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

.btn-primary {
  background-color: #0085a5;
  color: white;
}

.btn-primary:hover {
  background-color: #0c99bd;
}
</style>