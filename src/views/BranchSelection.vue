<template>
  <div class="container mb-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="card">
        <div
          class="card-header"
          style="text-align: center; background-color: #0085a5; color: white;"
        >
          <h2>準備為訂單編號({{order.id}})選擇取貨超商門市</h2>
        </div>
        <div class="card-body">
          <!-- 商品詳情 -->
          <h5 class="mt-3 ml-2">商品詳情：</h5>
          <li class="bg-light text-dark list-group-item mt-3 col-md-11">
            <div class="row">
              <div class="col">商品</div>
              <div class="col">數量</div>
              <div class="col">小計</div>
            </div>
          </li>

          <li
            v-for="item in items"
            :key="item.id"
            class="bg-white text-dark list-group-item col-md-11"
          >
            <div class="row">
              <div class="col">{{item.name}}</div>
              <div class="col quantity">{{item.Order_item.quantity}}</div>
              <div class="col">{{item.price}}</div>
            </div>
          </li>

          <div class="row">
            <!-- 付款金額 -->
            <div class="col-md-4">
              <h5 class="mt-5 ml-2">付款金額：</h5>
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

      <form name="Spgateway" :action="pickupInfo.PayGateWay" method="POST">
        <input class="pickup" type="hidden" name="MerchantID" :value="pickupInfo.MerchantID" />
        <input
          class="pickup"
          type="hidden"
          name="MerchantTradeNo"
          :value="pickupInfo.MerchantTradeNo"
        />
        <input class="pickup" type="hidden" name="LogisticsType" :value="pickupInfo.LogisticsType" />
        <input
          class="pickup"
          type="hidden"
          name="LogisticsSubType"
          :value="pickupInfo.LogisticsSubType"
        />
        <input class="pickup" type="hidden" name="IsCollection" value="pickupInfo.IsCollection" />
        <input
          class="pickup"
          type="hidden"
          name="ServerReplyURL"
          :value="pickupInfo.ServerReplyURL"
        />
        <button type="submit" class="btn btn-primary col-12 mt-4">前往選擇門市</button>
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
      pickupInfo: {
        MerchantID: "",
        MerchantTradeNo: "",
        LogisticsType: "",
        LogisticsSubType: "",
        IsCollection: "",
        ServerReplyURL: "",
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

        const { data, statusText } = await orderAPI.getBranchSelection({
          orderId
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.order = data.order;
        this.items = data.order.items;
        this.pickupInfo = {
          MerchantID: data.pickupInfo.MerchantID,
          MerchantTradeNo: data.pickupInfo.MerchantTradeNo,
          LogisticsType: data.pickupInfo.LogisticsType,
          LogisticsSubType: data.pickupInfo.LogisticsSubType,
          IsCollection: data.pickupInfo.IsCollection,
          ServerReplyURL: data.pickupInfo.ServerReplyURL,
          PayGateWay: data.pickupInfo.PayGateWay
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

.btn-primary {
  background-color: #0085a5;
  color: white;
  &:hover {
    background-color: #0c99bd;
  }
}

.card-body {
  background-color: #d2f0f5;
}

h5 {
  color: #0085a5;
  @include respond-between(960px, 1100px, 20px);
  @include respond-between(768px, 960px, 15px);
  @include respond-and(768px, 13px);
}

.list-group-item,
.quantity {
  margin-left: 23px;
  @media screen and (max-width: 768px) {
    margin-left: 0px;
  }
}

h2 {
  @include respond-between(960px, 1100px, 25px);
  @include respond-between(768px, 960px, 20px);
  @include respond-and(768px, 15px);
}

.row,
.btn {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px, 10px);
}

.container {
  @media screen and (max-width: 768px) {
    margin-left: -45px;
  }
}
</style>