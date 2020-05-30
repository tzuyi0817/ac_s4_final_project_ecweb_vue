<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="admin_layout">
        <div class="admin_layout-box row">
          <div class="navbar col-lg-2 col-12">
            <AdminNavbar />
          </div>

          <div class="coupon col-lg-10 col-12 mt-4 mb-5">
            <div class="coupon-box bg-light co-12">
              <div class="card my-2">
                <table class="table">
                  <thead>
                    <tr style="background-color: #0085a5; color: white;">
                      <th scope="col">#</th>
                      <th scope="col">序號</th>
                      <th scope="col" class="type">種類</th>
                      <th scope="col" class="store-id">商城id</th>
                      <th scope="col" class="description">描述</th>
                      <th scope="col">折扣</th>
                      <th scope="col">到期日</th>
                      <th scope="col" class="expired">是否過期</th>
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

                      <td class="type">
                        <p class="mt-2">{{coupon.Coupon_type.couponType}}</p>
                      </td>

                      <td class="store-id">
                        <p class="mt-2 ml-3">{{coupon.StoreId}}</p>
                      </td>

                      <td class="description">
                        <p class="mt-2">{{coupon.description}}</p>
                      </td>

                      <td>
                        <p class="mt-2">{{coupon.discount}}</p>
                      </td>

                      <td>
                        <p class="mt-2">{{coupon.expireDate | date}}</p>
                      </td>

                      <td v-if="coupon.available === false" class="expired">
                        <p class="mt-2 ml-2">已過期</p>
                      </td>

                      <td v-else class="expired">
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

<style lang="scss" scoped>
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.coupon {
  @include respond-and(992px) {
    padding: 15px 5px;
  }
}

.coupon-box {
  padding: 15px;
}

.card,
.btn {
  font-size: 16px;
}

.description,
.store-id,
.expired,
.type {
  @include respond-and(768px) {
    display: none;
  }
}
</style>

