<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="container-fluid admin_layout">
        <div class="row">
          <div class="col-2 d-flex flex-column">
            <AdminNavbar />
          </div>

          <div class="col-8 bg-light p-1 ml-5">
            <div class="card my-5">
              <table class="table">
                <thead>
                  <tr style="background-color: #0085a5; color: white;">
                    <th scope="col">#</th>
                    <th scope="col">&nbsp;&nbsp;序號</th>
                    <th scope="col">&nbsp;種類</th>
                    <th scope="col">商城id</th>
                    <th scope="col">&nbsp;&nbsp;描述</th>
                    <th scope="col">折扣</th>
                    <th scope="col">&nbsp;&nbsp;到期日</th>
                    <th scope="col">是否過期</th>
                    <th scope="col">編輯</th>
                  </tr>
                </thead>
                <tbody v-for="coupon in coupons" :key="coupon.id">
                  <tr>
                    <th scope="row">
                      <p class="mt-2">{{coupon.id}}</p>
                    </th>

                    <td>
                      <p class="mt-2">{{coupon.couponCode}}</p>
                    </td>

                    <td>
                      <p class="mt-2">{{coupon.Coupon_type.couponType}}</p>
                    </td>

                    <td>
                      <p class="mt-2 ml-3">{{coupon.StoreId}}</p>
                    </td>

                    <td>
                      <p class="mt-2">{{coupon.description}}</p>
                    </td>

                    <td>
                      <p class="mt-2">{{coupon.discount}}</p>
                    </td>

                    <td>
                      <p class="mt-2">{{coupon.expireDate | date}}</p>
                    </td>

                    <td v-if="coupon.available === false">
                      <p class="mt-2 ml-2">已過期</p>
                    </td>

                    <td v-else>
                      <p class="mt-2 ml-2">未過期</p>
                    </td>

                    <td>
                      <router-link
                        :to="{name: 'AdminCouponEdit', params: { id: coupon.id}}"
                        class="btn btn-link"
                      >
                        <i class="fas fa-edit" style="color: #0085a5;"></i>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import { dateFilter } from "./../utils/mixins";
import AdminAPI from "./../apis/admin";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  mixins: [dateFilter],
  components: {
    AdminNavbar,
    Spinner
  },
  data() {
    return {
      coupons: [],
      expireDate: "",
      isLoading: true
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  created() {
    this.fetchAdminCoupon();
  },
  methods: {
    async fetchAdminCoupon() {
      try {
        const { data, statusText } = await AdminAPI.getCouponManagePage();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.coupons = data.coupons;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得折價券資料，請稍後再試"
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

@media screen and (max-width: 1040px) {
  .card,
  .btn {
    font-size: 15px;
  }

  p {
    font-size: 13px;
  }
}
</style>

