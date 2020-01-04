<template>
  <div>
    <div class="container-fluid admin_layout">
      <div class="row">
        <div class="col-2 d-flex flex-column">
          <AdminNavbar />
        </div>

        <div class="col-8 bg-light p-1 ml-5">
          <div class="container my-5">
            <template v-if="isCoupon">
              <table class="table mt-5">
                <thead style="background-color: #0085a5; color: white;">
                  <tr>
                    <th scope="col">資料</th>
                    <th scope="col">詳情</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">折價券序號:</th>
                    <td>{{coupon.couponCode}}</td>
                  </tr>
                  <tr>
                    <th scope="row">店家Id:</th>
                    <td>{{coupon.StoreId}}</td>
                  </tr>
                  <tr>
                    <th scope="row">折價券種類:</th>
                    <td>{{coupon.Coupon_type.couponType}}</td>
                  </tr>
                  <tr>
                    <th scope="row">描述:</th>
                    <td>{{coupon.description}}</td>
                  </tr>
                  <tr>
                    <th scope="row">有效:</th>
                    <td>{{coupon.available}}</td>
                  </tr>
                  <tr>
                    <th scope="row">折扣面額:</th>
                    <td>{{coupon.discount}}</td>
                  </tr>
                </tbody>
              </table>
            </template>

            <template v-else>
              <form @submit.stop.prevent="handleSubmit">
                <div class="form-group">
                  <label for="store">輸入你的店家id</label>
                  <input
                    type="number"
                    name="storeId"
                    class="form-control"
                    id="store"
                    v-model="storeId"
                  />
                </div>

                <div class="form-group">
                  <label for="couponType">選擇你的折價券種類</label>
                  <select name="couponTypeId" id="couponType" class="ml-2" v-model="couponTypeId">
                    <option value selected disabled>--請選擇--</option>
                    <option value="1">會員專屬</option>
                    <option value="2">節日促銷</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="description">折價券備註</label>
                  <textarea
                    class="form-control"
                    name="CouponDescription"
                    rows="5"
                    id="description"
                    v-model="CouponDescription"
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="discount">輸入折價券的面額</label>
                  <input
                    type="number"
                    class="form-control"
                    id="discount"
                    name="CouponDiscount"
                    v-model="CouponDiscount"
                  />
                </div>

                <div class="form-group">
                  <label for="expiredDate">輸入折價券的到期日</label>
                  <input
                    type="date"
                    class="form-control"
                    id="expiredDate"
                    name="expiredDate"
                    v-model="expiredDate"
                  />
                </div>

                <div class="form-group">
                  <div class="form-group">
                    <button
                      class="btn btn-select mt-3 mb-5"
                      type="submit"
                      :disabled="isProcessing"
                    >提交</button>
                  </div>
                </div>
              </form>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import AdminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    AdminNavbar
  },
  data() {
    return {
      storeId: "",
      couponTypeId: "",
      CouponDiscount: "",
      CouponDescription: "",
      expiredDate: "",
      coupon: {},
      isCoupon: false,
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true;

        const { data, statusText } = await AdminAPI.postCouponMake({
          storeId: this.storeId,
          couponTypeId: this.couponTypeId,
          CouponDiscount: this.CouponDiscount,
          CouponDescription: this.CouponDescription,
          expiredDate: this.expiredDate
        });

        this.coupon = data.coupon;

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.isProcessing = false;
        this.isCoupon = true;

        Toast.fire({
          type: "success",
          title: "已成功新增折價券"
        });
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          type: "error",
          title: "無法新增折價券，請稍後再試"
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

@media screen and (max-width: 1040px) {
  .container,
  .btn,
  input,
  textarea {
    font-size: 15px;
  }
}
</style>