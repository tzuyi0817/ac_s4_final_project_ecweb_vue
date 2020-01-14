<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="container-fluid admin_layout">
        <div class="row">
          <div class="col-md-2 d-flex flex-column">
            <AdminNavbar />
          </div>

          <div class="col-md-10 bg-light p-1">
            <div class="col-md-11 productmodel_orders">
              <div class="card my-5">
                <div class="filiterBar input-group p-3">
                  <!-- 訂單篩選 -->
                  <div class="dropdown">
                    <button
                      class="btn btn-filter dropdown-toggle"
                      href="#"
                      data-toggle="dropdown"
                    >選擇篩選器</button>
                    <div class="dropdown-menu">
                      <a @click.stop.prevent="allOrders()" class="dropdown-item">全部訂單</a>
                      <a @click.stop.prevent="searchOrderer()" class="dropdown-item">訂購人</a>
                      <a @click.stop.prevent="orderstatus()" class="dropdown-item">訂單狀態</a>
                      <a @click.stop.prevent="paymentstatus()" class="dropdown-item">付款狀態</a>
                      <a @click.stop.prevent="shipmentstatus()" class="dropdown-item">送貨狀態</a>
                    </div>
                  </div>

                  <!-- 訂購人-訂單搜尋列 -->
                  <div v-if="isOrderer" class="input-group mt-3">
                    <form @submit.prevent="handleSearch(orderer)" class="w-100">
                      <div class="input-group">
                        <input
                          type="text"
                          name="orderer"
                          v-model="orderer"
                          class="form-control"
                          placeholder="輸入訂購人名字"
                        />
                        <div class="input-group-append">
                          <button class="btn btn-sm btn-sm btn-outline-secondary" type="submit">
                            <i class="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <!-- 訂單狀態 -->
                  <div v-if="isOrderstatus" class="orderStatus ml-4">
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?orderstatusid=1"
                        >排程中</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?orderstatusid=2"
                        >處理中</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?orderstatusid=3"
                        >已完成</router-link>
                      </li>
                    </ul>
                  </div>

                  <!-- 付款狀態 -->
                  <div v-if="isPaymentstatus" class="orderStatus ml-4">
                    <ul class="nav nav-pills nav-fill">
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?paymentstatusid=1"
                        >未付款</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?paymentstatusid=2"
                        >已付款</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?paymentstatusid=3"
                        >退款中</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?paymentstatusid=4"
                        >已退款</router-link>
                      </li>
                    </ul>
                  </div>

                  <!-- 送貨狀態 -->
                  <div v-if="isShipmentstatus" class="orderStatus ml-4">
                    <ul class="nav nav-pills nav-fill">
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?shipmentstatusid=1"
                        >備貨中</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?shipmentstatusid=2"
                        >發貨中</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?shipmentstatusid=3"
                        >已發貨</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?shipmentstatusid=4"
                        >已到達</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?shipmentstatusid=5"
                        >已取貨</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?shipmentstatusid=6"
                        >已退貨</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          to="/admin/productmodel/order_mange?shipmentstatusid=7"
                        >退貨中</router-link>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- 訂單清單 -->
                <div class="orders_table">
                  <table class="table">
                    <thead>
                      <tr style="background-color: #0085a5; color: white;">
                        <th scope="col">#</th>
                        <th scope="col">訂單日期</th>
                        <th scope="col">訂單狀態</th>
                        <th scope="col" class="payment-status">付款狀態</th>
                        <th scope="col" class="shipment-status">送貨狀態</th>
                        <th
                          scope="col"
                          class="orderer"
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;訂購人</th>
                        <th scope="col">合計</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AdminOrderList
                        v-for="order in orders"
                        :key="order.id"
                        :initial-order="order"
                      />
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 分頁標籤 -->
              <!-- <AdminOrdersPagination
                v-if="totalPage > 1"
                :current-page="currentPage"
                :total-page="totalPage"
                :current-order-status-id="currentOrderStatusId"
                :current-payment-Status-id="currentPaymentStatusId"
                :current-shipment-Status-id="currentShipmentStatusId"
              />-->
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import AdminOrderList from "./../components/AdminOrderList";
// import AdminOrdersPagination from "./../components/AdminOrdersPagination";
import AdminAPI from "./../apis/admin";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    AdminNavbar,
    AdminOrderList,
    // AdminOrdersPagination,
    Spinner
  },
  data() {
    return {
      isOrderer: false,
      isOrderstatus: false,
      isPaymentstatus: false,
      isShipmentstatus: false,
      isLoading: true,
      orders: [],
      currentPage: 1,
      totalPage: -1,
      currentOrderStatusId: "",
      currentPaymentStatusId: "",
      currentShipmentStatusId: "",
      orderer: ""
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const {
      page,
      orderstatusid,
      paymentstatusid,
      shipmentstatusid,
      orderer
    } = to.query;
    this.fetchAdminOrders({
      page,
      orderstatusid,
      paymentstatusid,
      shipmentstatusid,
      orderer
    });
    next();
  },
  created() {
    const {
      page,
      orderstatusid,
      paymentstatusid,
      shipmentstatusid,
      orderer
    } = this.$route.query;
    this.fetchAdminOrders({
      page,
      orderstatusid,
      paymentstatusid,
      shipmentstatusid,
      orderer
    });
  },
  methods: {
    allOrders() {
      this.isOrderer = false;
      this.isOrderstatus = false;
      this.isPaymentstatus = false;
      this.isShipmentstatus = false;
      this.$router.push("/admin/productmodel/order_mange");
    },
    searchOrderer() {
      this.isOrderer = true;
      this.isOrderstatus = false;
      this.isPaymentstatus = false;
      this.isShipmentstatus = false;
    },
    orderstatus() {
      this.isOrderer = false;
      this.isOrderstatus = true;
      this.isPaymentstatus = false;
      this.isShipmentstatus = false;
    },
    paymentstatus() {
      this.isOrderer = false;
      this.isOrderstatus = false;
      this.isPaymentstatus = true;
      this.isShipmentstatus = false;
    },
    shipmentstatus() {
      this.isOrderer = false;
      this.isOrderstatus = false;
      this.isPaymentstatus = false;
      this.isShipmentstatus = true;
    },
    handleSearch(orderer) {
      this.$router.push({ name: "AdminOrders", query: { orderer } });
      // 清空搜尋欄位
      this.orderer = "";
    },
    async fetchAdminOrders({
      page = 1,
      orderstatusid = "",
      paymentstatusid = "",
      shipmentstatusid = "",
      orderer = ""
    }) {
      try {
        const { data, statusText } = await AdminAPI.getOrderManagePage({
          page,
          orderstatusid,
          paymentstatusid,
          shipmentstatusid,
          orderer
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.orders = data.orders;
        this.currentPage = data.page;
        this.totalPage = data.totalPage.length;
        this.currentOrderStatusId = this.$route.query.orderstatusid;
        this.currentPaymentStatusId = this.$route.query.paymentstatusid;
        this.currentShipmentStatusId = this.$route.query.shipmentstatusid;
        this.orderer = this.$route.query.orderer;

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
.container-fluid {
  margin-top: -92px;
  margin-left: -89px;
  font-family: "DFKai-sb";
  width: 115%;
}

.btn-filter {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  background-color: #0085a5;
  color: white;
  text-align: center;
  width: 200px;
}

.btn-filter:hover {
  background-color: #0c99bd;
}

.btn-filter:focus {
  background-color: #0085a5;
  color: white;
}

.nav-link {
  color: #0085a5;
}

.nav-link:hover {
  color: white;
  background-color: #0085a5;
}

.nav-link.active {
  color: white;
  background-color: #0085a5;
}

@media screen and (min-width: 960px) and (max-width: 1060px) {
  .btn-select,
  .dropdown-menu,
  .btn,
  .orders_table,
  input,
  li {
    font-size: 14px;
  }
}

@media screen and (min-width: 840px) and (max-width: 960px) {
  .btn-select,
  .dropdown-menu,
  .btn,
  .orders_table,
  input,
  li {
    font-size: 10px;
  }
}

@media screen and (max-width: 840px) {
  .container-fluid {
    margin-top: 0px;
    margin-left: -60px;
    margin-bottom: 150px;
  }

  .productmodel_orders {
    margin-left: -40px;
    width: 370px;
  }

  .btn-select,
  .dropdown-menu,
  .btn,
  .orders_table,
  input,
  li {
    font-size: 10px;
  }

  .payment-status,
  .shipment-status,
  .orderer {
    display: none;
  }
}
</style>