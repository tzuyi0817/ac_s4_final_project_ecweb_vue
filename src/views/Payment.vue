<template>
  <div class="container mb-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="card">
        <div
          class="card-header"
          style="text-align: center; background-color: #0085a5; color: white;"
        >
          <h3>準備為訂單編號({{order.id}})付款</h3>
        </div>
        <div class="card-body">
          <!-- 商品詳情 -->
          <h6 class="mt-3 ml-2">商品詳情：</h6>
          <li class="bg-light text-dark list-group-item mt-3 col-12">
            <div class="row">
              <div class="col-6">商品</div>
              <div class="col-3">數量</div>
              <div class="col-3">小計</div>
            </div>
          </li>

          <li
            v-for="item in items"
            :key="item.id"
            class="bg-white text-dark list-group-item col-12"
          >
            <div class="row">
              <div class="col-6">{{item.name}}</div>
              <div class="col-3 quantity">{{item.Order_item.quantity}}</div>
              <div class="col-3">{{item.price}}</div>
            </div>
          </li>

          <div class="row">
            <!-- 付款金額 -->
            <div class="payment-value-box col-md-6">
              <h6 class="mt-5 ml-2">付款金額：</h6>
              <div class="bg-light text-dark list-group-item mt-3">
                <div class="row">
                  <div class="col">金額總計:</div>
                  <div class="amount" style="color: red;">{{order.amount}} 元</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form name="Spgateway" :action="tradeInfo.PayGateWay" method="POST">
        <!-- MerchantID -->
        <input
          class="form-control mt-2"
          type="hidden"
          name="MerchantID"
          :value="tradeInfo.MerchantID"
        />
        <!-- TradeInfo -->
        <input
          class="form-control mt-2"
          type="hidden"
          name="TradeInfo"
          :value="tradeInfo.TradeInfo"
        />
        <!-- TradeSha -->
        <input class="form-control mt-2" type="hidden" name="TradeSha" :value="tradeInfo.TradeSha" />
        <!-- Version -->
        <input class="form-control mt-2" type="hidden" name="Version" :value="tradeInfo.Version" />
        <button type="submit" class="btn btn-success col-12 mt-4" id="postPayment">前往付款</button>
      </form>
    </template>
  </div>
</template>

<script>
import orderAPI from "./../apis/orders";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    Spinner
  },
  data() {
    return {
      order: {},
      items: [],
      tradeInfo: {
        MerchantID: "",
        TradeInfo: "",
        TradeSha: "",
        Version: "",
        PayGateWay: ""
      },
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

        const { data, statusText } = await orderAPI.getPayment({ orderId });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.order = data.order;
        this.items = data.order.items;
        this.tradeInfo = {
          MerchantID: data.tradeInfo.MerchantID,
          TradeInfo: data.tradeInfo.TradeInfo,
          TradeSha: data.tradeInfo.TradeSha,
          Version: data.tradeInfo.Version,
          PayGateWay: data.tradeInfo.PayGateWay
        };

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
.card-body {
  background-color: #d2f0f5;
}

.payment-value-box {
  padding: 0;
}

h6 {
  color: #0085a5;
}

.row,
.btn {
  font-size: 16px;
}

.list-group-item {
  padding: 15px 10px;
}
</style>