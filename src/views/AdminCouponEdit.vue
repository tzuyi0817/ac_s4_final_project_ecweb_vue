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
            <div class="container my-5">
              <form @submit.stop.prevent="handleSubmit">
                <div class="form-group">
                  <label for="store">修改你的店家id</label>
                  <input
                    type="number"
                    name="StoreId"
                    class="form-control"
                    id="store"
                    v-model="coupon.StoreId"
                  />
                </div>

                <div class="form-group">
                  <label for="couponType">修改你的折價券種類</label>
                  <select
                    name="couponTypeId"
                    id="couponType"
                    class="ml-2"
                    v-model="coupon.CouponTypeId"
                  >
                    <option v-if="coupon.CouponTypeId === 1" selected value="1">會員專屬</option>
                    <option v-else value="1">會員專屬</option>

                    <option v-if="coupon.CouponTypeId === 2" selected value="2">節日促銷</option>
                    <option v-else value="2">節日促銷</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="description">折價券備註</label>
                  <textarea
                    class="form-control"
                    name="CouponDescription"
                    rows="5"
                    id="description"
                    v-model="coupon.description"
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="discount">修改折價券的面額</label>
                  <input
                    type="number"
                    class="form-control"
                    id="discount"
                    name="CouponDiscount"
                    v-model="coupon.discount"
                  />
                </div>

                <div class="form-group">
                  <label for="expiredDate">修改折價券的到期日</label>
                  <input
                    type="date"
                    class="form-control"
                    id="expiredDate"
                    name="expiredDate"
                    v-model="coupon.expireDate"
                  />
                </div>

                <div class="form-group">
                  <label for="available">修改折價券是否有效</label>
                  <select name="available" id="available" class="ml-2" v-model="coupon.available">
                    <option v-if="coupon.available === true" selected value="true">有效</option>
                    <option v-else value="true">有效</option>

                    <option v-if="coupon.available === false" selected value="false">無效</option>
                    <option v-else value="false">無效</option>
                  </select>

                  <div class="form-group">
                    <input type="hidden" name="couponId" :value="coupon.id" />
                    <button
                      class="btn btn-select mt-3 mb-5"
                      type="submit"
                      :disabled="isProcessing"
                    >提交</button>
                  </div>
                </div>
              </form>
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
import moment from "moment";

export default {
  components: {
    AdminNavbar,
    Spinner
  },
  data() {
    return {
      coupon: {
        id: "",
        StoreId: "",
        CouponTypeId: "",
        couponCode: "",
        discount: "",
        description: "",
        available: "",
        expireDate: "",
        Coupon_type: {
          id: "",
          couponType: ""
        }
      },
      isLoading: true,
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const { id: couponId } = to.params;
    this.fetchAdminCouponEdit({ couponId });
    next();
  },
  created() {
    const { id: couponId } = this.$route.params;
    this.fetchAdminCouponEdit({ couponId });
  },
  methods: {
    async fetchAdminCouponEdit({ couponId }) {
      try {
        const { data, statusText } = await AdminAPI.getCouponEditPage({
          couponId
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.coupon = {
          id: data.coupon.id,
          StoreId: data.coupon.StoreId,
          CouponTypeId: data.coupon.CouponTypeId,
          couponCode: data.coupon.couponCode,
          discount: data.coupon.discount,
          description: data.coupon.description,
          available: data.coupon.available,
          expireDate: moment(data.coupon.expireDate).format("YYYY-MM-DD")
        };

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得折價券資料，請稍後再試"
        });
      }
    },
    async handleSubmit() {
      try {
        this.isProcessing = true;

        const { data, statusText } = await AdminAPI.postCouponEdit({
          couponId: this.coupon.id,
          StoreId: this.coupon.StoreId,
          couponTypeId: this.coupon.CouponTypeId,
          CouponDiscount: this.coupon.discount,
          CouponDescription: this.coupon.description,
          available: this.coupon.available,
          expiredDate: this.coupon.expireDate
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.isProcessing = false;
        this.$router.push("/admin/coupon/managePage");

        Toast.fire({
          type: "success",
          title: "折價券已修改成功"
        });
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          type: "error",
          title: "無法修改資料，請稍後再試"
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

.btn-select {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  background-color: #0085a5;
  color: white;
  text-align: center;
  width: 100%;
}

.btn-select:hover {
  background-color: #0c99bd;
}
</style>

