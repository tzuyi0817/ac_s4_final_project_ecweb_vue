<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="container-fluid admin_layout">
        <div class="row">
          <div class="navbar col-md-2 col-10 d-flex flex-column">
            <AdminNavbar />
          </div>

          <div class="col-md-9 col-12 bg-light p-1 mt-4 mb-4">
            <div class="col-12 productmodel_orderdetail px-5">
              <div class="row">
                <!-- 訂單詳情-左側 -->
                <div class="col">
                  <AdminOrderInfoEdit :order="order" :orderStatus="orderStatus" />

                  <!-- 訂購人資訊 -->
                  <div class="card order-info my-3">
                    <div class="card-header d-flex justify-content-between">
                      <p class="d-inline" style="color: #0085a5;">訂購人資訊</p>
                    </div>
                    <div id="ordererInfoDetail" class="card-body">
                      <!-- 訂購人 -->
                      <div class="order-info-item my-1">
                        <h6 class="font-weight-bold">訂購人</h6>
                        <p>{{orderer.name}}</p>
                      </div>
                      <!-- 訂單Email -->
                      <div class="order-info-item my-1">
                        <h6 class="font-weight-bold">訂購人Email</h6>
                        <p>{{orderer.email}}</p>
                      </div>
                      <!-- 訂購帳號 -->
                      <div class="order-info-item my-1">
                        <h6 class="font-weight-bold">訂購地址</h6>
                        <p>{{orderer.address}}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 訂單詳情-右側 -->
                <div class="col">
                  <!-- 付款資料 -->
                  <AdminPaymentInfoEdit :order="order" :payments="payments" />
                  <!-- 送貨資料 -->
                  <AdminShipmentInfoEdit
                    :order="order"
                    :shipments="shipments"
                    :shippingFee="shippingFee"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import AdminOrderInfoEdit from "./../components/AdminOrderInfoEdit";
import AdminPaymentInfoEdit from "./../components/AdminPaymentInfoEdit";
import AdminShipmentInfoEdit from "./../components/AdminShipmentInfoEdit";
import AdminAPI from "./../apis/admin";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    AdminNavbar,
    AdminOrderInfoEdit,
    AdminPaymentInfoEdit,
    AdminShipmentInfoEdit,
    Spinner
  },
  data() {
    return {
      order: {},
      orderer: {},
      payments: {},
      shipments: {},
      orderStatus: "",
      paymentType: "",
      paymentStatus: "",
      shipmentStatus: "",
      shipmentType: "",
      shippingFee: "",
      isLoading: true
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const { id: orderId } = to.params;
    this.fetchAdminOrder({ orderId });
    next();
  },
  created() {
    const { id: orderId } = this.$route.params;
    this.fetchAdminOrder({ orderId });
  },
  methods: {
    async fetchAdminOrder({ orderId }) {
      try {
        const { data, statusText } = await AdminAPI.getOrder({ orderId });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.order = data.order;
        this.orderStatus = data.orderStatus;
        this.orderer = data.orderer;
        this.paymentType = data.paymentType;
        this.paymentStatus = data.paymentStatus;
        this.payments = data.payments;
        this.shipments = data.shipments;
        this.shipmentStatus = data.shipmentStatus;
        this.shipmentType = data.shipmentType;
        this.shippingFee = data.shippingFee;

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

@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.container-fluid {
  margin-top: -92px;
  margin-left: -89px;
  width: 115%;
  @include respond-and(768px) {
    margin-top: 0px;
    margin-left: -60px;
    margin-bottom: 150px;
  }
}

.card,
button,
h6,
p {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 10px;
  }
}

.navbar {
  @include respond-and(768px) {
    margin-left: 25px;
  }
}
</style>
