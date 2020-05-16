<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="admin_layout">
        <div class="admin_layout-box row">
          <div class="navbar col-lg-2 col-12">
            <AdminNavbar />
          </div>

          <div class="order-box col-lg-10 col-12 mt-2 mb-5">
            <div class="col-12 productmodel_orderdetail bg-light">
              <div class="row">
                <!-- 訂單詳情-左側 -->
                <div class="col-md col-12">
                  <AdminOrderInfoEdit :order="order" :orderStatus="orderStatus" />

                  <!-- 訂購人資訊 -->
                  <div class="card order-info my-3">
                    <div class="card-header d-flex justify-content-between">
                      <p class="d-inline" style="color: #0085a5;">訂購人資訊</p>
                    </div>
                    <div id="ordererInfoDetail" class="card-body">
                      <!-- 訂購人 -->
                      <div class="order-info-item my-1">
                        <p class="font-weight-bold">訂購人</p>
                        <p>{{orderer.name}}</p>
                      </div>
                      <!-- 訂單Email -->
                      <div class="order-info-item my-1">
                        <p class="font-weight-bold">訂購人Email</p>
                        <p>{{orderer.email}}</p>
                      </div>
                      <!-- 訂購帳號 -->
                      <div class="order-info-item my-1">
                        <p class="font-weight-bold">訂購地址</p>
                        <p>{{orderer.address}}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 訂單詳情-右側 -->
                <div class="col-md col-12">
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
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.productmodel_orderdetail {
  padding: 0;
}

.card,
button {
  font-size: 16px;
}
</style>
