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
            <div class="col-12 productmodel_orders px-5">
              <!-- 貨到通知總覽 -->
              <div class="card my-3">
                <!-- 產品清單 -->
                <div class="orders_table">
                  <table class="table">
                    <!-- 無申請通知 -->
                    <div
                      v-if="deliveryNotices.length === 0"
                      class="alert alert-dark"
                      role="alert"
                    >目前尚無客人申請</div>

                    <!-- 申請通知總覽 -->
                    <template v-else>
                      <thead>
                        <tr style="background-color: #0085a5; color: white;">
                          <th scope="col">#</th>
                          <th scope="col">信箱</th>
                          <th scope="col">產品名稱</th>
                          <th scope="col">庫存數量</th>
                          <th scope="col">刪除</th>
                        </tr>
                      </thead>
                      <tbody v-for="deliveryNotice in deliveryNotices" :key="deliveryNotice.id">
                        <tr>
                          <th scope="row">
                            <p class="mt-2">{{deliveryNotice.id}}</p>
                          </th>

                          <td>
                            <p class="mt-2">{{deliveryNotice.email}}</p>
                          </td>
                          <td>
                            <p class="mt-2">{{deliveryNotice.Product.name}}</p>
                          </td>

                          <td>
                            <p class="ml-2 mt-2">{{deliveryNotice.Product.count}}</p>
                          </td>

                          <td>
                            <form
                              @submit.stop.prevent="handleDelete(deliveryNotice.id)"
                              style="display: inline;"
                            >
                              <button type="submit" class="btn btn-link" :disabled="isProcessing">
                                <i class="fas fa-trash" style="color: #0085a5;"></i>
                              </button>
                            </form>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </table>
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
import AdminAPI from "./../apis/admin";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  inject: ["reload"],
  components: {
    AdminNavbar,
    Spinner
  },
  data() {
    return {
      deliveryNotices: [],
      isLoading: true,
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  created() {
    this.fetchAdminDeliveryNotice();
  },
  methods: {
    async fetchAdminDeliveryNotice() {
      try {
        const { data, statusText } = await AdminAPI.getDeliveryNotice();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.deliveryNotices = data.deliveryNotices;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得客戶申請資料，請稍後再試"
        });
      }
    },
    async handleDelete(deliveryNoticeId) {
      try {
        this.isProcessing = true;

        const { data, statusText } = await AdminAPI.deleteDeliveryNotice({
          deliveryNoticeId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        Toast.fire({
          type: "success",
          title: "申請已成功刪除"
        });

        this.reload();
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "申請無法刪除，請稍後再試"
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

.orders_table,
.btn {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 10px;
  }
}

.card {
  @include respond-and(768px) {
    margin-left: -50px;
  }
}

.navbar {
  @include respond-and(768px) {
    margin-left: 25px;
  }
}
</style>